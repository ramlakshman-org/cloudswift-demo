import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LogoutButton } from "./LogoutButton";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("calls the logout endpoint and redirects to the login page", async () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/admin/login"));
    expect(fetch).toHaveBeenCalledWith("/api/admin/logout", { method: "POST" });
    expect(refreshMock).toHaveBeenCalled();
  });
});
