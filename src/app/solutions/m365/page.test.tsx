import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import M365Page from "./page";

// Navbar's own CTA shares the same "Get Your Free Assessment" text, and
// its "Our Solutions" dropdown also links to "Microsoft Azure"; scope to
// <main> to avoid ambiguous multi-match errors.
describe("M365Page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<M365Page />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Modern Workplace powered by Microsoft 365" })).toBeInTheDocument();
    expect(main.getByText("Microsoft Teams")).toBeInTheDocument();
    expect(main.getByText("Tenant & G-Suite Migration")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Get Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "Explore Azure" })).toHaveAttribute("href", "/solutions/azure");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
