import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IndustriesSection } from "./IndustriesSection";

describe("IndustriesSection", () => {
  it("renders all four industries with their tags and a link each", () => {
    render(<IndustriesSection />);
    for (const name of ["Financial Services", "Healthcare", "Manufacturing", "Retail & E-commerce"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getByText("Azure Security")).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: "Talk to an expert →" });
    expect(links).toHaveLength(4);
    for (const link of links) expect(link).toHaveAttribute("href", "/contact");
  });
});
