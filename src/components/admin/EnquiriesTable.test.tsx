import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { EnquiriesTable } from "./EnquiriesTable";
import type { SerializedEnquiry } from "@/lib/enquiry-shared";

const baseEnquiries: SerializedEnquiry[] = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    company: "Acme",
    category: "Cloud Security",
    message: "Need a security review",
    status: "new",
    source: "contact",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    firstName: "Raj",
    lastName: "Kumar",
    email: "raj@example.com",
    category: "Cloud Migration",
    status: "contacted",
    source: "assessment",
    answers: { source: "On-premise", target: "Azure" },
    createdAt: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    firstName: "Lee",
    lastName: "Chen",
    email: "lee@example.com",
    category: "Other",
    status: "new",
    source: "contact",
    createdAt: "2026-01-03T00:00:00.000Z",
  },
];

describe("EnquiriesTable", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("renders an empty state when there are no enquiries", () => {
    render(<EnquiriesTable initialEnquiries={[]} />);
    expect(screen.getByText("No enquiries match these filters.")).toBeInTheDocument();
  });

  it("formats the received date with a fixed locale, independent of runtime locale", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    // en-GB + UTC, pinned explicitly so server and client render the same
    // string regardless of the host's default locale/timezone.
    expect(screen.getByText("01/01/2026")).toBeInTheDocument();
  });

  it("renders all enquiries with their contact details", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
    expect(screen.getByText("Need a security review")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument(); // Lee has neither message nor answers
  });

  it("shows where each enquiry came from", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    expect(screen.getAllByText("Contact form").length).toBe(2);
    expect(screen.getByText("Free assessment")).toBeInTheDocument();
  });

  it("expands and collapses structured answers with their question labels", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    const rajRow = screen.getByText("Raj Kumar").closest("tr")!;

    expect(screen.queryByText("What are you migrating from?")).not.toBeInTheDocument();
    fireEvent.click(within(rajRow).getByRole("button", { name: "View details" }));

    expect(screen.getByText("What are you migrating from?")).toBeInTheDocument();
    expect(screen.getByText("On-premise")).toBeInTheDocument();
    expect(screen.getByText("What are you migrating to?")).toBeInTheDocument();
    expect(screen.getByText("Azure")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide details" }));
    expect(screen.queryByText("What are you migrating from?")).not.toBeInTheDocument();
  });

  it("falls back to the raw answer key when it doesn't match a known question id", () => {
    render(
      <EnquiriesTable
        initialEnquiries={[
          {
            id: "4",
            firstName: "Sam",
            lastName: "Lee",
            email: "sam@example.com",
            category: "Cloud Migration",
            status: "new",
            source: "assessment",
            answers: { unknownQuestionId: "some value" },
            createdAt: "2026-01-04T00:00:00.000Z",
          },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "View details" }));
    expect(screen.getByText("unknownQuestionId")).toBeInTheDocument();
  });

  it("filters by search term across name, email, and company", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByPlaceholderText("Search name, email, company…"), {
      target: { value: "raj" },
    });
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
  });

  it("filters by category", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByDisplayValue("All categories"), {
      target: { value: "Cloud Migration" },
    });
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
  });

  it("filters by status", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByDisplayValue("All statuses"), {
      target: { value: "new" },
    });
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.queryByText("Raj Kumar")).not.toBeInTheDocument();
  });

  it("shows the empty state when filters match nothing", () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByPlaceholderText("Search name, email, company…"), {
      target: { value: "nobody-matches-this" },
    });
    expect(screen.getByText("No enquiries match these filters.")).toBeInTheDocument();
  });

  it("updates status via PATCH and reflects it optimistically on success", async () => {
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    const janeRow = screen.getByText("Jane Doe").closest("tr")!;
    const select = within(janeRow).getByDisplayValue("new");

    fireEvent.change(select, { target: { value: "qualified" } });

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/admin/enquiries/1",
        expect.objectContaining({ method: "PATCH" })
      )
    );
    await waitFor(() => expect(within(janeRow).getByDisplayValue("qualified")).toBeInTheDocument());
  });

  it("leaves the status unchanged when the PATCH request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    render(<EnquiriesTable initialEnquiries={baseEnquiries} />);
    const janeRow = screen.getByText("Jane Doe").closest("tr")!;
    const select = within(janeRow).getByDisplayValue("new");

    fireEvent.change(select, { target: { value: "qualified" } });

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(within(janeRow).getByDisplayValue("new")).toBeInTheDocument();
  });
});
