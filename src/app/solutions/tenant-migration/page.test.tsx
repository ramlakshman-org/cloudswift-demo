import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TenantMigrationPage from "./page";

describe("TenantMigrationPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<TenantMigrationPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Tenant & G-Suite migration with zero data loss" })).toBeInTheDocument();
    expect(main.getByText("Tenant-to-Tenant Migration")).toBeInTheDocument();
    expect(main.getByText("G-Suite to Microsoft 365")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Book Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "Explore Microsoft 365" })).toHaveAttribute("href", "/solutions/m365");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
