import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminDashboardLayout from "./layout";

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin",
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

describe("AdminDashboardLayout", () => {
  it("renders the sidebar, topbar, and children content", () => {
    render(
      <AdminDashboardLayout>
        <p>Page content</p>
      </AdminDashboardLayout>
    );

    expect(screen.getByText("CloudSwift Admin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dashboard/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Enquiries/ })).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});
