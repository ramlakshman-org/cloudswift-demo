import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/auth", () => ({
  ADMIN_SESSION_COOKIE: "cs_admin_session",
  checkAdminPassword: vi.fn(),
  createSessionToken: vi.fn(),
}));

import { POST } from "./route";
import { checkAdminPassword, createSessionToken } from "@/lib/auth";

const checkAdminPasswordMock = vi.mocked(checkAdminPassword);
const createSessionTokenMock = vi.mocked(createSessionToken);

function makeRequest(body: Record<string, unknown>) {
  return { json: async () => body } as Request;
}

describe("POST /api/admin/login", () => {
  beforeEach(() => {
    checkAdminPasswordMock.mockReset();
    createSessionTokenMock.mockReset();
  });

  it("rejects a non-string password", async () => {
    const res = await POST(makeRequest({ password: 12345 }));
    expect(res.status).toBe(401);
    expect(checkAdminPasswordMock).not.toHaveBeenCalled();
  });

  it("rejects an incorrect password", async () => {
    checkAdminPasswordMock.mockReturnValue(false);
    const res = await POST(makeRequest({ password: "wrong" }));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ ok: false, error: "Incorrect password" });
  });

  it("sets a session cookie and returns ok:true for a correct password", async () => {
    checkAdminPasswordMock.mockReturnValue(true);
    createSessionTokenMock.mockResolvedValue("signed-token");

    const res = await POST(makeRequest({ password: "correct" }));

    expect(await res.json()).toEqual({ ok: true });
    const cookie = res.cookies.get("cs_admin_session");
    expect(cookie?.value).toBe("signed-token");
    expect(cookie?.httpOnly).toBe(true);
  });
});
