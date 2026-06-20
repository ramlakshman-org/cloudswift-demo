import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHero } from "./PageHero";

describe("PageHero", () => {
  it("renders the title and body always", () => {
    render(<PageHero title="Title" body="Body" />);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("omits the eyebrow when not given", () => {
    render(<PageHero title="T" body="B" />);
    expect(screen.queryByText(/./, { selector: "p.uppercase" })).not.toBeInTheDocument();
  });

  it("renders the eyebrow when given", () => {
    render(<PageHero title="T" body="B" eyebrow="Eyebrow text" />);
    expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
  });

  it("renders no CTA section when neither cta nor ctaSecondary are given", () => {
    render(<PageHero title="T" body="B" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders only the primary cta", () => {
    render(<PageHero title="T" body="B" cta={{ label: "Primary", href: "/p" }} />);
    expect(screen.getByRole("link", { name: "Primary" })).toHaveAttribute("href", "/p");
  });

  it("renders only the secondary cta", () => {
    render(<PageHero title="T" body="B" ctaSecondary={{ label: "Secondary", href: "/s" }} />);
    expect(screen.getByRole("link", { name: "Secondary" })).toHaveAttribute("href", "/s");
  });

  it("renders both ctas together", () => {
    render(
      <PageHero
        title="T"
        body="B"
        cta={{ label: "Primary", href: "/p" }}
        ctaSecondary={{ label: "Secondary", href: "/s" }}
      />
    );
    expect(screen.getByRole("link", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Secondary" })).toBeInTheDocument();
  });

  it("defaults to the cream/ink theme with a rust eyebrow", () => {
    render(<PageHero title="T" body="B" eyebrow="E" />);
    const section = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(section.className).toContain("bg-cream");
    expect(screen.getByText("E").className).toContain("text-rust");
  });

  it("applies the dark theme with a gold eyebrow", () => {
    render(<PageHero title="T" body="B" eyebrow="E" dark />);
    const section = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(section.className).toContain("bg-ink");
    expect(screen.getByText("E").className).toContain("text-gold");
  });

  it("applies the teal theme with a gold eyebrow", () => {
    render(<PageHero title="T" body="B" eyebrow="E" teal />);
    const section = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(section.className).toContain("bg-teal");
    expect(screen.getByText("E").className).toContain("text-gold");
  });

  it("prefers dark over teal when both are set", () => {
    render(<PageHero title="T" body="B" dark teal />);
    const section = screen.getByRole("heading", { level: 1 }).closest("section")!;
    expect(section.className).toContain("bg-ink");
  });
});
