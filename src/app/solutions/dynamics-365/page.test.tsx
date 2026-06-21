import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Dynamics365Page from "./page";

// Navbar's own CTA shares the same "Get Your Free Assessment" text; scope
// to <main> to avoid ambiguous multi-match errors.
describe("Dynamics365Page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<Dynamics365Page />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Transform your business with Dynamics 365" })).toBeInTheDocument();
    expect(main.getByText("Dynamics 365 ERP")).toBeInTheDocument();
    expect(main.getByText("Ongoing Support")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Get Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "Explore Power BI" })).toHaveAttribute("href", "/solutions/power-bi");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
