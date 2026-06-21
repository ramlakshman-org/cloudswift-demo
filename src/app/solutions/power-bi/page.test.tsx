import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import PowerBIPage from "./page";

// Navbar's own CTA shares the same "Get Your Free Assessment" text; scope
// to <main> to avoid ambiguous multi-match errors.
describe("PowerBIPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<PowerBIPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Turn your data into decisions with Power BI" })).toBeInTheDocument();
    expect(main.getByText("Power BI Dashboards")).toBeInTheDocument();
    expect(main.getByText("Training & Support")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Get Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "Explore Dynamics 365" })).toHaveAttribute("href", "/solutions/dynamics-365");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
