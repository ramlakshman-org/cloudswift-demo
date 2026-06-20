import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import SecurityPage from "./page";

// Navbar's "Our Solutions" dropdown also links to "Microsoft Azure"; scope
// to <main> to avoid ambiguous multi-match errors.
describe("SecurityPage", () => {
  it("renders all 6 practices, internal links, and the report-a-concern CTA", () => {
    render(<SecurityPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { level: 1, name: "Security at CloudSwift" })).toBeInTheDocument();
    for (const heading of [
      "ISO 9001-2015 certified",
      "Data encryption",
      "Access control",
      "Infrastructure security",
      "Compliance & auditing",
      "Incident response",
    ]) {
      expect(main.getByText(heading)).toBeInTheDocument();
    }
    expect(main.getByRole("link", { name: "about CloudSwift" })).toHaveAttribute("href", "/about");
    expect(main.getByRole("link", { name: "Microsoft Azure" })).toHaveAttribute("href", "/solutions/azure");
    expect(main.getByRole("link", { name: "Report to support@oncloudswift.com" })).toHaveAttribute(
      "href",
      "mailto:support@oncloudswift.com"
    );
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
  });
});
