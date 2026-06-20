import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the hero, stats, values, and offices", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { name: "Your trusted partner for cloud-first transformation" })).toBeInTheDocument();
    expect(screen.getByText("Cloud Managed Services")).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Innovation")).toBeInTheDocument();
    expect(screen.getByText("Collaboration")).toBeInTheDocument();
    expect(screen.getByText("Headquarters — Bengaluru")).toBeInTheDocument();
    expect(screen.getByText("Branch — Mumbai")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ISO 9001-2015" })).toHaveAttribute(
      "href",
      "https://www.iso.org/iso-9001-quality-management.html"
    );
    expect(document.querySelector('script[type="application/ld+json"]')).toBeInTheDocument();
  });
});
