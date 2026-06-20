import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MigrationSection } from "./MigrationSection";
import { MIGRATION } from "@/lib/site-content";

describe("MigrationSection", () => {
  it("renders the title, body, and CTA pointing to /about", () => {
    render(<MigrationSection />);
    expect(screen.getByRole("heading", { name: MIGRATION.title })).toBeInTheDocument();
    expect(screen.getByText(MIGRATION.body)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: MIGRATION.cta })).toHaveAttribute("href", "/about");
  });
});
