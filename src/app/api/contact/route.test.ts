import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

function makeRequest(body: Record<string, unknown>) {
  return { json: async () => body } as Request;
}

describe("POST /api/contact", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  });

  it("logs and returns ok:true when RESEND_API_KEY is not set", async () => {
    delete process.env.RESEND_API_KEY;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const fetchSpy = vi.spyOn(global, "fetch");

    const res = await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        company: "Acme",
        usecase: "Migration",
        message: "Hello",
      })
    );

    expect(await res.json()).toEqual({ ok: true });
    expect(logSpy).toHaveBeenCalledWith(
      "[contact form]",
      expect.objectContaining({ firstName: "Jane", email: "jane@example.com" })
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends via Resend and returns ok:true when the key is set and Resend succeeds", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        company: "Acme",
        usecase: "Migration",
        message: "Hello",
      })
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
      })
    );
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.subject).toBe("New enquiry from Jane Doe — Migration");
    expect(sentBody.html).toContain("Jane Doe");
    expect(await res.json()).toEqual({ ok: true });
  });

  it("falls back to defaults for missing optional fields in the email body", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);

    await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
      })
    );

    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.subject).toBe("New enquiry from Jane Doe — General");
    expect(sentBody.html).toContain("—");
  });

  it("returns ok:false with 500 when Resend responds with an error", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, text: async () => "bad request" });
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(makeRequest({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" }));

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: "Failed to send" });
    expect(errorSpy).toHaveBeenCalledWith("[contact] Resend error:", "bad request");
  });
});
