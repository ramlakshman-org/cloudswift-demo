import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/enquiries", () => ({ insertEnquiry: vi.fn().mockResolvedValue(undefined) }));

import { POST } from "./route";
import { insertEnquiry } from "@/lib/enquiries";

const insertEnquiryMock = vi.mocked(insertEnquiry);

function makeRequest(body: Record<string, unknown>) {
  return { json: async () => body } as Request;
}

describe("POST /api/assessment", () => {
  const originalKey = process.env.RESEND_API_KEY;

  beforeEach(() => {
    vi.restoreAllMocks();
    insertEnquiryMock.mockClear();
    insertEnquiryMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
  });

  it("rejects an invalid category", async () => {
    const res = await POST(
      makeRequest({ firstName: "Jane", lastName: "Doe", email: "jane@example.com", category: "Bogus" })
    );
    expect(res.status).toBe(400);
    expect(insertEnquiryMock).not.toHaveBeenCalled();
  });

  it("rejects a missing category", async () => {
    const res = await POST(makeRequest({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" }));
    expect(res.status).toBe(400);
  });

  it("rejects missing required contact fields", async () => {
    const res = await POST(makeRequest({ category: "Microsoft Azure" }));
    expect(res.status).toBe(400);
    expect(insertEnquiryMock).not.toHaveBeenCalled();
  });

  it("logs and returns ok:true when RESEND_API_KEY is not set", async () => {
    delete process.env.RESEND_API_KEY;
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const res = await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        company: "Acme",
        category: "Microsoft Azure",
        answers: { driver: "Cost reduction" },
      })
    );

    expect(await res.json()).toEqual({ ok: true });
    expect(logSpy).toHaveBeenCalledWith(
      "[assessment]",
      expect.objectContaining({ firstName: "Jane", category: "Microsoft Azure" })
    );
    expect(insertEnquiryMock).toHaveBeenCalledWith({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      company: "Acme",
      category: "Microsoft Azure",
      answers: { driver: "Cost reduction" },
      source: "assessment",
    });
  });

  it("defaults answers to an empty object when omitted or malformed", async () => {
    delete process.env.RESEND_API_KEY;

    await POST(
      makeRequest({ firstName: "Jane", lastName: "Doe", email: "jane@example.com", category: "Other" })
    );

    expect(insertEnquiryMock).toHaveBeenCalledWith(expect.objectContaining({ answers: {} }));
  });

  it("sends an email with answer labels resolved from the question config when Resend is configured", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, text: async () => "" });
    vi.stubGlobal("fetch", fetchMock);

    await POST(
      makeRequest({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        category: "Microsoft Azure",
        answers: { driver: "Cost reduction", unknownId: "some value" },
      })
    );

    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody.subject).toBe("New free assessment request from Jane Doe — Microsoft Azure");
    expect(sentBody.html).toContain("What's driving this?:</strong> Cost reduction");
    expect(sentBody.html).toContain("unknownId:</strong> some value");
  });

  it("returns ok:false with 500 when Resend responds with an error", async () => {
    process.env.RESEND_API_KEY = "test-key";
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, text: async () => "bad request" });
    vi.stubGlobal("fetch", fetchMock);

    const res = await POST(
      makeRequest({ firstName: "Jane", lastName: "Doe", email: "jane@example.com", category: "Other" })
    );

    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: "Failed to send" });
    expect(errorSpy).toHaveBeenCalledWith("[assessment] Resend error:", "bad request");
  });
});
