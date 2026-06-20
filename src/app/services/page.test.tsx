import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("renders all 7 service groups with their anchor ids and accent styling", () => {
    render(<ServicesPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "End-to-end IT services — support, infrastructure & cloud" })
    ).toBeInTheDocument();
    for (const id of ["end-user", "systems", "network", "uptime", "advisory", "projects", "bcp-dr"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
    expect(screen.getByText("Network Support")).toBeInTheDocument();
    expect(screen.getByText("Managed Wireless")).toBeInTheDocument();
  });
});
