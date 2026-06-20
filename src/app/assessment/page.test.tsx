import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AssessmentPage from "./page";

describe("AssessmentPage", () => {
  it("renders the hero, all 4 breakdown cards, trust line, and the embed", () => {
    render(<AssessmentPage />);
    expect(
      screen.getByRole("heading", { name: "Find Out If Your Cloud Migration Is About to Go Over Budget — Before It Does" })
    ).toBeInTheDocument();
    expect(screen.getByText("Current environment")).toBeInTheDocument();
    expect(screen.getByText("Budget risk areas")).toBeInTheDocument();
    expect(screen.getByText("Security exposure")).toBeInTheDocument();
    expect(screen.getByText("Realistic timeline")).toBeInTheDocument();
    expect(screen.getByText(/ISO 9001-2015 Certified/)).toBeInTheDocument();
    expect(document.querySelectorAll('script[type="application/ld+json"]').length).toBeGreaterThan(0);
  });
});
