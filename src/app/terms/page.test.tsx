import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("renders the heading and every section", () => {
    render(<TermsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Terms of Use" })).toBeInTheDocument();
    for (const heading of [
      "Acceptance of terms",
      "Use of the website",
      "Intellectual property",
      "Service descriptions",
      "Limitation of liability",
      "Third-party links",
      "Governing law",
      "Changes to these terms",
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Contact page" })).toHaveAttribute("href", "/contact");
  });
});
