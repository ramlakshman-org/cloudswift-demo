import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  checkAdminPassword,
  createSessionToken,
  verifySessionToken,
  ADMIN_SESSION_COOKIE,
} from "./auth";

describe("auth", () => {
  const originalPassword = process.env.ADMIN_PASSWORD;
  const originalSecret = process.env.ADMIN_SESSION_SECRET;

  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct-password";
    delete process.env.ADMIN_SESSION_SECRET;
  });

  afterEach(() => {
    vi.useRealTimers();
    if (originalPassword === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = originalPassword;
    if (originalSecret === undefined) delete process.env.ADMIN_SESSION_SECRET;
    else process.env.ADMIN_SESSION_SECRET = originalSecret;
  });

  it("exports a cookie name", () => {
    expect(ADMIN_SESSION_COOKIE).toBe("cs_admin_session");
  });

  describe("checkAdminPassword", () => {
    it("returns true for the correct password", () => {
      expect(checkAdminPassword("correct-password")).toBe(true);
    });

    it("returns false for an incorrect password", () => {
      expect(checkAdminPassword("wrong-password")).toBe(false);
    });

    it("returns false for a password of a different length", () => {
      expect(checkAdminPassword("short")).toBe(false);
    });

    it("returns false when ADMIN_PASSWORD is unset", () => {
      delete process.env.ADMIN_PASSWORD;
      expect(checkAdminPassword("anything")).toBe(false);
    });
  });

  describe("createSessionToken / verifySessionToken", () => {
    it("creates a token that verifies successfully", async () => {
      const token = await createSessionToken();
      expect(await verifySessionToken(token)).toBe(true);
    });

    it("rejects an undefined or null token", async () => {
      expect(await verifySessionToken(undefined)).toBe(false);
      expect(await verifySessionToken(null)).toBe(false);
    });

    it("rejects a malformed token missing the signature", async () => {
      expect(await verifySessionToken("12345")).toBe(false);
    });

    it("rejects a token with a non-numeric payload", async () => {
      expect(await verifySessionToken("not-a-number.somesignature")).toBe(false);
    });

    it("rejects a tampered signature", async () => {
      const token = await createSessionToken();
      const [payload] = token.split(".");
      expect(await verifySessionToken(`${payload}.tampered-signature`)).toBe(false);
    });

    it("rejects an expired token", async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
      const token = await createSessionToken();
      vi.setSystemTime(new Date("2026-01-02T00:00:00Z"));
      expect(await verifySessionToken(token)).toBe(false);
    });

    it("uses ADMIN_SESSION_SECRET over ADMIN_PASSWORD when both are set", async () => {
      process.env.ADMIN_SESSION_SECRET = "a-dedicated-secret";
      const token = await createSessionToken();
      expect(await verifySessionToken(token)).toBe(true);

      // Token signed under the dedicated secret must not verify once that
      // secret changes, even though ADMIN_PASSWORD stayed the same.
      process.env.ADMIN_SESSION_SECRET = "a-different-secret";
      expect(await verifySessionToken(token)).toBe(false);
    });

    it("throws when signing without ADMIN_PASSWORD or ADMIN_SESSION_SECRET set", async () => {
      delete process.env.ADMIN_PASSWORD;
      await expect(createSessionToken()).rejects.toThrow(
        "ADMIN_SESSION_SECRET or ADMIN_PASSWORD must be set"
      );
    });
  });
});
