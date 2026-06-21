import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import OracleCloudPage from "./page";

describe("OracleCloudPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, all 6 features, both ctas, and faqs", () => {
    const { unmount } = render(<OracleCloudPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Managed Oracle Cloud services, end to end" })).toBeInTheDocument();
    expect(main.getByText("Oracle Cloud Advisory")).toBeInTheDocument();
    expect(main.getByText("Oracle Engineered Systems")).toBeInTheDocument();
    for (const link of main.getAllByRole("link", { name: "Get Your Free Assessment" })) {
      expect(link).toHaveAttribute("href", "/assessment");
    }
    expect(main.getByRole("link", { name: "Explore Managed Cloud" })).toHaveAttribute("href", "/managed-cloud");
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
    unmount();
  });
});
