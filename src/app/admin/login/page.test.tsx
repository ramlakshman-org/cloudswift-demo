import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLoginPage from "./page";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

function fillCredentials(username: string, password: string) {
  fireEvent.change(screen.getByLabelText("Username"), { target: { value: username } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: password } });
}

describe("AdminLoginPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
    vi.restoreAllMocks();
  });

  it("shows the CloudSwift logo", () => {
    render(<AdminLoginPage />);
    expect(screen.getByAltText("CloudSwift")).toBeInTheDocument();
  });

  it("redirects to /admin on a successful login", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);

    render(<AdminLoginPage />);
    fillCredentials("admin", "correct");
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/admin"));
    expect(refreshMock).toHaveBeenCalled();
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody).toEqual({ username: "admin", password: "correct" });
  });

  it("shows an error message on incorrect credentials", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ ok: false }) })
    );

    render(<AdminLoginPage />);
    fillCredentials("admin", "wrong");
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    expect(await screen.findByText("Incorrect username or password. Please try again.")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows an error message when the request itself fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    render(<AdminLoginPage />);
    fillCredentials("admin", "correct");
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    expect(await screen.findByText("Incorrect username or password. Please try again.")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<AdminLoginPage />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows a loading spinner while submitting", async () => {
    let resolveFetch: (v: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise((resolve) => { resolveFetch = resolve; }))
    );

    render(<AdminLoginPage />);
    fillCredentials("admin", "correct");
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    expect(screen.getByRole("button", { name: /Signing in/ })).toBeDisabled();
    resolveFetch!({ json: async () => ({ ok: true }) });
    await waitFor(() => expect(pushMock).toHaveBeenCalled());
  });
});
