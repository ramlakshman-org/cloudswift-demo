import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

const usePathnameMock = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

function renderSidebar() {
  return render(
    <SidebarProvider>
      <AdminSidebar />
    </SidebarProvider>
  );
}

describe("AdminSidebar", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/admin");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("renders the brand, nav items, and sign out button", () => {
    renderSidebar();
    expect(screen.getByText("CloudSwift")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dashboard/ })).toHaveAttribute("href", "/admin");
    expect(screen.getByRole("link", { name: /Enquiries/ })).toHaveAttribute("href", "/admin/enquiries");
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });

  it("marks the Dashboard nav item active when on /admin", () => {
    usePathnameMock.mockReturnValue("/admin");
    renderSidebar();
    expect(screen.getByRole("link", { name: /Dashboard/ })).toHaveAttribute("data-active");
    expect(screen.getByRole("link", { name: /Enquiries/ })).not.toHaveAttribute("data-active");
  });

  it("marks the Enquiries nav item active when on /admin/enquiries", () => {
    usePathnameMock.mockReturnValue("/admin/enquiries");
    renderSidebar();
    expect(screen.getByRole("link", { name: /Enquiries/ })).toHaveAttribute("data-active");
    expect(screen.getByRole("link", { name: /Dashboard/ })).not.toHaveAttribute("data-active");
  });
});
