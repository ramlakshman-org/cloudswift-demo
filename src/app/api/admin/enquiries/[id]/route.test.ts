import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/enquiries", async () => {
  const actual = await vi.importActual<typeof import("@/lib/enquiries")>("@/lib/enquiries");
  return { ...actual, updateEnquiryStatus: vi.fn() };
});

import { PATCH } from "./route";
import { updateEnquiryStatus } from "@/lib/enquiries";

const updateEnquiryStatusMock = vi.mocked(updateEnquiryStatus);

function makeRequest(body: Record<string, unknown>) {
  return { json: async () => body } as Request;
}

function makeParams(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("PATCH /api/admin/enquiries/[id]", () => {
  beforeEach(() => {
    updateEnquiryStatusMock.mockReset();
  });

  it("rejects an invalid status value", async () => {
    const res = await PATCH(makeRequest({ status: "bogus" }), makeParams("abc"));
    expect(res.status).toBe(400);
    expect(updateEnquiryStatusMock).not.toHaveBeenCalled();
  });

  it("returns 404 when no enquiry was matched", async () => {
    updateEnquiryStatusMock.mockResolvedValue(false);
    const res = await PATCH(makeRequest({ status: "closed" }), makeParams("abc"));
    expect(res.status).toBe(404);
  });

  it("updates the status and returns ok:true on success", async () => {
    updateEnquiryStatusMock.mockResolvedValue(true);
    const res = await PATCH(makeRequest({ status: "contacted" }), makeParams("abc"));
    expect(await res.json()).toEqual({ ok: true });
    expect(updateEnquiryStatusMock).toHaveBeenCalledWith("abc", "contacted");
  });
});
