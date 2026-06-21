import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CaseStudiesPage from "./page";
import { CASE_STUDIES } from "@/lib/site-content";

describe("CaseStudiesPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero and a card linking to every case study", () => {
    const { unmount } = render(<CaseStudiesPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Real environments, real outcomes" })).toBeInTheDocument();

    for (const c of CASE_STUDIES) {
      const link = main.getByRole("link", { name: new RegExp(c.client) });
      expect(link).toHaveAttribute("href", `/case-studies/${c.slug}`);
    }
    unmount();
  });

  it("flags placeholder case studies with an illustrative-example badge", () => {
    const { unmount } = render(<CaseStudiesPage />);
    const badges = screen.getAllByText("Illustrative example");
    expect(badges.length).toBe(CASE_STUDIES.filter((c) => c.isPlaceholder).length);
    unmount();
  });
});
