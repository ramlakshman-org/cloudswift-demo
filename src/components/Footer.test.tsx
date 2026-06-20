import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { FOOTER_COLUMNS } from "@/lib/site-content";

describe("Footer", () => {
  it("renders the logo linking home", () => {
    render(<Footer />);
    expect(screen.getByLabelText("CloudSwift home")).toHaveAttribute("href", "/");
  });

  it("renders every footer column heading and link", () => {
    render(<Footer />);
    for (const col of FOOTER_COLUMNS) {
      expect(screen.getByText(col.heading)).toBeInTheDocument();
      for (const link of col.links) {
        expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
      }
    }
  });

  it("renders the current year in the copyright line", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("renders the legal links and the WhatsApp link", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Security" })).toHaveAttribute("href", "/security");
    const whatsapp = screen.getByLabelText("Chat with CloudSwift on WhatsApp");
    expect(whatsapp).toHaveAttribute("href", "https://wa.me/919071416809");
    expect(whatsapp).toHaveAttribute("target", "_blank");
  });
});
