import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhyChooseSection } from "./WhyChooseSection";

describe("WhyChooseSection", () => {
  it("renders the heading and all six differentiators", () => {
    render(<WhyChooseSection />);
    expect(screen.getByRole("heading", { name: /What makes us different/ })).toBeInTheDocument();
    expect(screen.getByText("ISO 9001-2015 Certified")).toBeInTheDocument();
    expect(screen.getByText("Microsoft Azure Partner")).toBeInTheDocument();
    expect(screen.getByText("24/7 NOC Monitoring")).toBeInTheDocument();
    expect(screen.getByText("India-Headquartered")).toBeInTheDocument();
    expect(screen.getByText("Multi-cloud, Vendor-neutral")).toBeInTheDocument();
    expect(screen.getByText("End-to-End Ownership")).toBeInTheDocument();
  });
});
