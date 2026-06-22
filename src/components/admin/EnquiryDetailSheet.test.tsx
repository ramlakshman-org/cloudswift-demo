import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnquiryDetailSheet } from "./EnquiryDetailSheet";
import type { SerializedEnquiry } from "@/lib/enquiry-shared";

const baseEnquiry: SerializedEnquiry = {
  id: "1",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@example.com",
  phone: "+91 98765 43210",
  jobTitle: "IT Manager",
  city: "Bengaluru",
  company: "Acme",
  category: "Cloud Migration",
  status: "new",
  source: "assessment",
  answers: { source: "On-premise", target: "Azure" },
  message: "We have a hard deadline next quarter.",
  createdAt: "2026-01-01T00:00:00.000Z",
};

describe("EnquiryDetailSheet", () => {
  it("renders nothing meaningful when closed with no enquiry", () => {
    render(
      <EnquiryDetailSheet
        enquiry={null}
        open={false}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={false}
      />
    );
    expect(screen.queryByText("jane@example.com")).not.toBeInTheDocument();
  });

  it("renders full contact info, answers, and message when open", () => {
    render(
      <EnquiryDetailSheet
        enquiry={baseEnquiry}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={false}
      />
    );

    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("+91 98765 43210")).toBeInTheDocument();
    expect(screen.getByText("IT Manager")).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Bengaluru")).toBeInTheDocument();
    expect(screen.getByText("Cloud Migration")).toBeInTheDocument();
    expect(screen.getByText("What are you migrating from?")).toBeInTheDocument();
    expect(screen.getByText("On-premise")).toBeInTheDocument();
    expect(screen.getByText("We have a hard deadline next quarter.")).toBeInTheDocument();
  });

  it("falls back to em dashes for missing optional fields and omits answers/message sections", () => {
    render(
      <EnquiryDetailSheet
        enquiry={{
          id: "2",
          firstName: "Lee",
          lastName: "Chen",
          email: "lee@example.com",
          category: "Other",
          status: "new",
          source: "contact",
          createdAt: "2026-01-02T00:00:00.000Z",
        }}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={false}
      />
    );

    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
    expect(screen.queryByText("Assessment answers")).not.toBeInTheDocument();
  });

  it("falls back to the raw answer key when it doesn't match a known question id", () => {
    render(
      <EnquiryDetailSheet
        enquiry={{ ...baseEnquiry, answers: { unknownQuestionId: "some value" } }}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={false}
      />
    );

    expect(screen.getByText("unknownQuestionId")).toBeInTheDocument();
  });

  it("shows the current status in the select", () => {
    render(
      <EnquiryDetailSheet
        enquiry={baseEnquiry}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={false}
      />
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("new");
  });

  it("calls onStatusChange with the enquiry id and selected status when a new option is picked", async () => {
    const onStatusChange = vi.fn();
    render(
      <EnquiryDetailSheet
        enquiry={baseEnquiry}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={onStatusChange}
        updating={false}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));
    const option = await screen.findByRole("option", { name: "qualified" });
    fireEvent.mouseMove(option);
    fireEvent.click(option);

    expect(onStatusChange).toHaveBeenCalledWith("1", "qualified");
  });

  it("disables the status select while updating", () => {
    render(
      <EnquiryDetailSheet
        enquiry={baseEnquiry}
        open={true}
        onOpenChange={vi.fn()}
        onStatusChange={vi.fn()}
        updating={true}
      />
    );

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
