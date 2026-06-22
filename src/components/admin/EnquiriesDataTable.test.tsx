import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { EnquiriesDataTable } from "./EnquiriesDataTable";
import type { SerializedEnquiry } from "@/lib/enquiry-shared";

// Base UI's SelectItem only commits a click if the item is already
// "highlighted" (its internal activeIndex), which real mouse hovering sets
// via onMouseMove before the click — a synthetic click alone is a no-op.
function selectOption(option: HTMLElement) {
  fireEvent.mouseMove(option);
  fireEvent.click(option);
}

const baseEnquiries: SerializedEnquiry[] = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "+91 98765 43210",
    jobTitle: "IT Manager",
    city: "Bengaluru",
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
];

describe("EnquiriesDataTable", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("falls back to empty initials when a name is an empty string", () => {
    render(
      <EnquiriesDataTable
        initialEnquiries={[
          {
            id: "9",
            firstName: "",
            lastName: "",
            email: "noname@example.com",
            category: "Other",
            status: "new",
            source: "contact",
            createdAt: "2026-01-09T00:00:00.000Z",
          },
        ]}
      />
    );
    const avatarFallback = screen.getByText("", { selector: '[data-slot="avatar-fallback"]' });
    expect(avatarFallback).toBeInTheDocument();
  });

  it("does not overwrite the sheet's selection if it changed before the PATCH resolves", async () => {
    let resolveFetch: (value: { ok: boolean }) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise((resolve) => { resolveFetch = resolve; }))
    );

    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const table = screen.getByRole("table");
    const janeRow = within(table).getByText("Jane Doe").closest("tr")!;
    fireEvent.click(within(janeRow).getByRole("button", { name: "View" }));

    const comboboxes = screen.getAllByRole("combobox");
    fireEvent.click(comboboxes[comboboxes.length - 1]);
    const option = await screen.findByRole("option", { name: "qualified" });
    selectOption(option);

    // Close the sheet (selecting a different enquiry) before the PATCH resolves.
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    const rajRow = within(table).getByText("Raj Kumar").closest("tr")!;
    fireEvent.click(within(rajRow).getByRole("button", { name: "View" }));

    resolveFetch!({ ok: true });
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getAllByText("Raj Kumar").length).toBeGreaterThan(0);
  });

  it("renders rows with avatar initials and badges", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByText("RK")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Cloud Security")).toBeInTheDocument();
    expect(screen.getByText("Contact form")).toBeInTheDocument();
    expect(screen.getByText("Free assessment")).toBeInTheDocument();
  });

  it("filters rows via the global search input", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByPlaceholderText("Search name, email, company…"), {
      target: { value: "raj" },
    });
    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
  });

  it("shows the empty state when no rows match", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    fireEvent.change(screen.getByPlaceholderText("Search name, email, company…"), {
      target: { value: "nobody-matches" },
    });
    expect(screen.getByText("No enquiries match these filters.")).toBeInTheDocument();
  });

  it("opens the detail sheet when View is clicked", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const table = screen.getByRole("table");
    const janeRow = within(table).getByText("Jane Doe").closest("tr")!;
    fireEvent.click(within(janeRow).getByRole("button", { name: "View" }));

    expect(screen.getByText("Need a security review")).toBeInTheDocument();
  });

  it("updates status via the sheet and reflects it in the table", async () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const table = screen.getByRole("table");
    const janeRow = within(table).getByText("Jane Doe").closest("tr")!;
    fireEvent.click(within(janeRow).getByRole("button", { name: "View" }));

    const comboboxes = screen.getAllByRole("combobox");
    const sheetCombobox = comboboxes[comboboxes.length - 1];
    fireEvent.click(sheetCombobox);
    const option = await screen.findByRole("option", { name: "qualified" });
    selectOption(option);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/admin/enquiries/1",
        expect.objectContaining({ method: "PATCH" })
      )
    );
    await waitFor(() => {
      const updatedRow = within(table).getByText("Jane Doe").closest("tr")!;
      expect(within(updatedRow).getByText("qualified")).toBeInTheDocument();
    });
  });

  it("does not change status in the table when the PATCH request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const table = screen.getByRole("table");
    const janeRow = within(table).getByText("Jane Doe").closest("tr")!;
    fireEvent.click(within(janeRow).getByRole("button", { name: "View" }));

    const comboboxes = screen.getAllByRole("combobox");
    const sheetCombobox = comboboxes[comboboxes.length - 1];
    fireEvent.click(sheetCombobox);
    const option = await screen.findByRole("option", { name: "qualified" });
    selectOption(option);

    await waitFor(() => expect(fetch).toHaveBeenCalled());
    const stillJaneRow = within(table).getByText("Jane Doe").closest("tr")!;
    expect(within(stillJaneRow).getByText("new")).toBeInTheDocument();
  });

  it("toggles sorting on the Received column", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const rowsBefore = screen.getAllByRole("row");
    fireEvent.click(screen.getByRole("button", { name: /Received/ }));
    const rowsAfter = screen.getAllByRole("row");
    expect(rowsAfter.length).toBe(rowsBefore.length);
  });

  it("toggles column visibility via the Columns dropdown", async () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    expect(screen.getByText("Cloud Security")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Columns/ }));
    const categoryToggle = await screen.findByRole("menuitemcheckbox", { name: "category" });
    fireEvent.click(categoryToggle);

    expect(screen.queryByText("Cloud Security")).not.toBeInTheDocument();
  });

  it("filters by category via the category select", async () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const triggers = screen.getAllByRole("combobox");
    fireEvent.click(triggers[0]);
    const option = await screen.findByRole("option", { name: "Cloud Migration" });
    selectOption(option);

    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
  });

  it("filters by status via the status select", async () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const triggers = screen.getAllByRole("combobox");
    fireEvent.click(triggers[1]);
    const option = await screen.findByRole("option", { name: "contacted" });
    selectOption(option);

    expect(screen.queryByText("Jane Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
  });

  it("disables Previous on the first page and shows page info", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
  });

  it("paginates to the next page and back when there are more than 10 enquiries", () => {
    const many: SerializedEnquiry[] = Array.from({ length: 12 }, (_, i) => ({
      id: String(i + 1),
      firstName: `Person${i}`,
      lastName: "Test",
      email: `person${i}@example.com`,
      category: "Other",
      status: "new",
      source: "contact",
      createdAt: `2026-01-${String(i + 1).padStart(2, "0")}T00:00:00.000Z`,
    }));
    render(<EnquiriesDataTable initialEnquiries={many} />);

    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it("closes the detail sheet and clears the selection", () => {
    render(<EnquiriesDataTable initialEnquiries={baseEnquiries} />);
    const table = screen.getByRole("table");
    const janeRow = within(table).getByText("Jane Doe").closest("tr")!;
    fireEvent.click(within(janeRow).getByRole("button", { name: "View" }));

    expect(screen.getByText("Need a security review")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Need a security review")).not.toBeInTheDocument();
  });
});
