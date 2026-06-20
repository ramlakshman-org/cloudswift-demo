import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";
import { HERO } from "@/lib/site-content";

describe("HeroSection", () => {
  it("renders the eyebrow, all title lines, body, and CTA", () => {
    render(<HeroSection />);
    expect(screen.getByText(HERO.eyebrow)).toBeInTheDocument();
    for (const line of HERO.title) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
    expect(screen.getByText(HERO.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: HERO.cta })).toHaveAttribute("href", "/assessment");
  });

  it("renders the hero illustration with descriptive alt text", () => {
    render(<HeroSection />);
    expect(screen.getByAltText("AI infrastructure stack illustration")).toBeInTheDocument();
  });
});
