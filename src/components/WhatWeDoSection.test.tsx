import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatWeDoSection } from "./WhatWeDoSection";
import { WHAT_WE_DO } from "@/lib/site-content";

describe("WhatWeDoSection", () => {
  it("renders the heading and every paragraph", () => {
    render(<WhatWeDoSection />);
    expect(screen.getByText(WHAT_WE_DO.heading)).toBeInTheDocument();
    for (const p of WHAT_WE_DO.paragraphs) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });
});
