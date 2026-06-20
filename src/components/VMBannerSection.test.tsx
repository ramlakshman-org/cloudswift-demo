import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VMBannerSection } from "./VMBannerSection";
import { VM_BANNER } from "@/lib/site-content";

describe("VMBannerSection", () => {
  it("renders the title, body, and CTA pointing to /assessment", () => {
    render(<VMBannerSection />);
    expect(screen.getByRole("heading", { name: VM_BANNER.title })).toBeInTheDocument();
    expect(screen.getByText(VM_BANNER.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: VM_BANNER.cta })).toHaveAttribute("href", "/assessment");
  });
});
