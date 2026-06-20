import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IntegrationsSection } from "./IntegrationsSection";
import { INTEGRATIONS, INTEGRATION_LOGOS } from "@/lib/site-content";

describe("IntegrationsSection", () => {
  it("renders the heading, body, and every CTA with the right variant", () => {
    render(<IntegrationsSection />);
    expect(screen.getByText(INTEGRATIONS.heading)).toBeInTheDocument();
    expect(screen.getByText(INTEGRATIONS.body)).toBeInTheDocument();
    for (const c of INTEGRATIONS.ctas) {
      expect(screen.getByRole("link", { name: c.label })).toHaveAttribute("href", c.href);
    }
  });

  it("renders every integration logo with descriptive alt text", () => {
    render(<IntegrationsSection />);
    for (const logo of INTEGRATION_LOGOS) {
      expect(screen.getByAltText(logo.name)).toBeInTheDocument();
    }
  });
});
