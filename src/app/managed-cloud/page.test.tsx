import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ManagedCloudPage from "./page";

// Footer's "Solutions" column now also links to "Oracle Cloud"; scope to
// <main> to avoid ambiguous multi-match errors.
describe("ManagedCloudPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 platform tiers, all 3 pricing plans, and FAQs", () => {
    const { unmount } = render(<ManagedCloudPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Your cloud, expertly managed" })).toBeInTheDocument();
    for (const tier of ["Public Cloud", "Private Cloud", "Hybrid Cloud", "Cloud Security", "Managed Data Centre", "Oracle Cloud"]) {
      expect(main.getByText(tier)).toBeInTheDocument();
    }
    for (const plan of ["Silver", "Gold", "Platinum"]) {
      expect(main.getByText(plan)).toBeInTheDocument();
    }
    expect(document.getElementById("security")).toBeInTheDocument();
    const bookButtons = screen.getAllByRole("link", { name: "Book Your Free Assessment" });
    expect(bookButtons.length).toBeGreaterThanOrEqual(3);
    unmount();
  });
});
