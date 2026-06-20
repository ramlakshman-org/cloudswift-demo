import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./page";

describe("PrivacyPage", () => {
  it("renders the heading and every section", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeInTheDocument();
    for (const heading of [
      "Information we collect",
      "How we use your information",
      "Data storage and security",
      "Cookies",
      "Third-party services",
      "Your rights",
      "Changes to this policy",
    ]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Contact page" })).toHaveAttribute("href", "/contact");
  });
});
