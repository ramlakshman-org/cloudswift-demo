import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/auth", () => ({
  ADMIN_SESSION_COOKIE: "cs_admin_session",
  checkAdminCredentials: vi.fn(),
  createSessionToken: vi.fn(),
}));

import { POST } from "./route";
import { checkAdminCredentials, createSessionToken } from "@/lib/auth";

const checkAdminCredentialsMock = vi.mocked(checkAdminCredentials);
const createSessionTokenMock = vi.mocked(createSessionToken);

function makeRequest(body: Record<string, unknown>) {
  return { json: async () => body } as Request;
}

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    checkAdminCredentialsMock.mockReset();
    createSessionTokenMock.mockReset();
  });

  it("rejects a non-string username", async () => {
    const res = await POST(makeRequest({ username: 123, password: "correct" }));
    expect(res.status).toBe(401);
    expect(checkAdminCredentialsMock).not.toHaveBeenCalled();
  });

  it("rejects a non-string password", async () => {
    const res = await POST(makeRequest({ username: "admin", password: 12345 }));
    expect(res.status).toBe(401);
    expect(checkAdminCredentialsMock).not.toHaveBeenCalled();
  });

  it("rejects incorrect credentials", async () => {
    checkAdminCredentialsMock.mockReturnValue(false);
    const res = await POST(makeRequest({ username: "admin", password: "wrong" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ ok: false, error: "Incorrect username or password" });
  });

  it("sets a session cookie and returns ok:true for correct credentials", async () => {
    checkAdminCredentialsMock.mockReturnValue(true);
    createSessionTokenMock.mockResolvedValue("signed-token");

    const res = await POST(makeRequest({ username: "admin", password: "correct" }));

    expect(checkAdminCredentialsMock).toHaveBeenCalledWith("admin", "correct");
    expect(await res.json()).toEqual({ ok: true });
    const cookie = res.cookies.get("cs_admin_session");
    expect(cookie?.value).toBe("signed-token");
    expect(cookie?.httpOnly).toBe(true);
  });
});
