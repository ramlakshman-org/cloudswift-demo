import { describe, it, expect } from "vitest";
import { POST } from "./route";

describe("POST /api/admin/logout", () => {
  it("clears the session cookie and returns ok:true", async () => {
    const res = await POST();
    expect(await res.json()).toEqual({ ok: true });
    const cookie = res.cookies.get("cs_admin_session");
    expect(cookie?.value).toBe("");
  });
});
