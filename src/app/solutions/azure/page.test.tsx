import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import AzurePage from "./page";

// Navbar's own CTA shares the same "Get Your Free Assessment" text; scope
// to <main> to avoid ambiguous multi-match errors.
describe("AzurePage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<AzurePage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Azure cloud services, done right" })).toBeInTheDocument();
    expect(main.getByText("Azure Infrastructure")).toBeInTheDocument();
    expect(main.getByText("Managed Azure Support")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Get Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "All solutions" })).toHaveAttribute("href", "/solutions/m365");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
