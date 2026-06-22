import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge, SourceBadge } from "./badges";

describe("StatusBadge", () => {
  it("renders the status text for every status", () => {
    for (const status of ["new", "contacted", "qualified", "closed"] as const) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    }
  });
});

describe("SourceBadge", () => {
  it("renders the human label for the contact source", () => {
    render(<SourceBadge source="contact" />);
    expect(screen.getByText("Contact form")).toBeInTheDocument();
  });

  it("renders the human label for the assessment source", () => {
    render(<SourceBadge source="assessment" />);
    expect(screen.getByText("Free assessment")).toBeInTheDocument();
  });
});
