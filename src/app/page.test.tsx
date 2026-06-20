import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";
import { HERO } from "@/lib/site-content";

describe("Home page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the hero, FAQ schema, and main CTA without crashing", () => {
    const { unmount } = render(<Home />);
    expect(screen.getByText(HERO.eyebrow)).toBeInTheDocument();
    expect(document.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frequently asked questions about CloudSwift" })).toBeInTheDocument();
    unmount();
  });
});
