import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogosSection } from "./LogosSection";
import { LOGOS_HEADING, CUSTOMER_LOGOS } from "@/lib/site-content";

describe("LogosSection", () => {
  it("renders the heading and every customer logo (duplicated per marquee row)", () => {
    render(<LogosSection />);
    expect(screen.getByText(LOGOS_HEADING)).toBeInTheDocument();
    for (const logo of CUSTOMER_LOGOS) {
      expect(screen.getAllByAltText(logo.name).length).toBeGreaterThan(0);
    }
  });

  it("marks the second marquee row as reversed and the first as not", () => {
    const { container } = render(<LogosSection />);
    const tracks = container.querySelectorAll(".marquee-track");
    expect(tracks).toHaveLength(2);
    expect(tracks[0]).not.toHaveClass("is-reverse");
    expect(tracks[1]).toHaveClass("is-reverse");
  });
});
