import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/auth", () => ({
  ADMIN_SESSION_COOKIE: "cs_admin_session",
  verifySessionToken: vi.fn(),
}));

import { proxy } from "./proxy";
import { verifySessionToken } from "@/lib/auth";

const verifySessionTokenMock = vi.mocked(verifySessionToken);

function makeRequest(path: string, cookie?: string) {
  const headers = new Headers();
  if (cookie) headers.set("cookie", `cs_admin_session=${cookie}`);
  return new NextRequest(new Request(`https://oncloudswift.com${path}`, { headers }));
}

describe("proxy", () => {
  beforeEach(() => {
    verifySessionTokenMock.mockReset();
  });

  it("allows /admin/login through without a session", async () => {
    const res = await proxy(makeRequest("/admin/login"));
    expect(res.status).toBe(200);
    expect(verifySessionTokenMock).not.toHaveBeenCalled();
  });

  it("allows /api/admin/login through without a session", async () => {
    const res = await proxy(makeRequest("/api/admin/login"));
    expect(res.status).toBe(200);
    expect(verifySessionTokenMock).not.toHaveBeenCalled();
  });

  it("passes through /admin with a valid session cookie", async () => {
    verifySessionTokenMock.mockResolvedValue(true);
    const res = await proxy(makeRequest("/admin", "valid-token"));
    expect(res.status).toBe(200);
  });

  it("redirects /admin to /admin/login when the session is invalid", async () => {
    verifySessionTokenMock.mockResolvedValue(false);
    const res = await proxy(makeRequest("/admin", "bad-token"));
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toBe("https://oncloudswift.com/admin/login");
  });

  it("redirects /admin to /admin/login when there is no session cookie at all", async () => {
    verifySessionTokenMock.mockResolvedValue(false);
    const res = await proxy(makeRequest("/admin"));
    expect(res.status).toBe(307);
  });

  it("returns 401 JSON for protected /api/admin routes with an invalid session", async () => {
    verifySessionTokenMock.mockResolvedValue(false);
    const res = await proxy(makeRequest("/api/admin/enquiries", "bad-token"));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ ok: false, error: "Unauthorized" });
  });

  it("passes through /api/admin routes with a valid session", async () => {
    verifySessionTokenMock.mockResolvedValue(true);
    const res = await proxy(makeRequest("/api/admin/enquiries", "valid-token"));
    expect(res.status).toBe(200);
  });
});
