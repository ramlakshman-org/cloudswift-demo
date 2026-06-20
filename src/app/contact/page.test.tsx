import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import ContactPage from "./page";

// Footer also lists the same phone numbers/email; scope to <main> to avoid
// ambiguous multi-match errors.
describe("ContactPage", () => {
  it("renders contact details, both offices, and the booking form with assessment link", () => {
    render(<ContactPage />);
    const main = within(screen.getByRole("main"));
    expect(main.getByRole("heading", { name: "Let's talk cloud" })).toBeInTheDocument();
    expect(main.getByText("+91-9606246099")).toBeInTheDocument();
    expect(main.getByText("+91-9071416809")).toBeInTheDocument();
    expect(main.getByText("support@oncloudswift.com")).toBeInTheDocument();
    expect(main.getAllByText("Bengaluru", { exact: false }).length).toBeGreaterThan(0);
    expect(main.getAllByText("Mumbai", { exact: false }).length).toBeGreaterThan(0);
    expect(main.getByRole("link", { name: "Book a Free Assessment" })).toHaveAttribute("href", "/assessment");
    expect(main.getByRole("button", { name: "Book my consultation" })).toBeInTheDocument();
  });
});
