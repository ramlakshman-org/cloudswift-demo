import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainCtaSection } from "./MainCtaSection";
import { MAIN_CTA } from "@/lib/site-content";

describe("MainCtaSection", () => {
  it("renders the heading, body, and CTA pointing to /assessment", () => {
    render(<MainCtaSection />);
    expect(screen.getByRole("heading", { name: MAIN_CTA.heading })).toBeInTheDocument();
    expect(screen.getByText(MAIN_CTA.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: MAIN_CTA.cta })).toHaveAttribute("href", "/assessment");
  });
});
