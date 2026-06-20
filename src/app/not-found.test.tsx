import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import NotFound from "./not-found";

// Navbar/Footer are siblings of <main>, not descendants, and share some
// link text/hrefs with this page's own content (e.g. "About Us"). Scope
// queries to <main> to avoid ambiguous multi-match errors.
describe("NotFound page", () => {
  it("renders the 404 message and primary actions", () => {
    render(<NotFound />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(main.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(main.getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/contact");
  });

  it("renders quick links to other key pages", () => {
    render(<NotFound />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("link", { name: "Our Services" })).toHaveAttribute("href", "/services");
    expect(main.getByRole("link", { name: "Microsoft Azure" })).toHaveAttribute("href", "/solutions/azure");
    expect(main.getByRole("link", { name: "Managed Cloud" })).toHaveAttribute("href", "/managed-cloud");
    expect(main.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
  });
});
