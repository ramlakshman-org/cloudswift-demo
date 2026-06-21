import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/enquiries", async () => {
  const actual = await vi.importActual<typeof import("@/lib/enquiries")>("@/lib/enquiries");
  return { ...actual, listEnquiries: vi.fn() };
});

import { GET } from "./route";
import { listEnquiries } from "@/lib/enquiries";

const listEnquiriesMock = vi.mocked(listEnquiries);

function makeRequest(query = "") {
  return new Request(`https://oncloudswift.com/api/admin/enquiries${query}`);
}

describe("GET /api/admin/enquiries", () => {
  beforeEach(() => {
    listEnquiriesMock.mockReset();
  });

  it("returns serialized enquiries with no filters by default", async () => {
    const createdAt = new Date("2026-01-01T00:00:00Z");
    listEnquiriesMock.mockResolvedValue([
      {
        _id: { toString: () => "abc123" } as never,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        company: "Acme",
        category: "Cloud Security",
        message: "Help",
        status: "new",
        source: "contact",
        createdAt,
      },
    ]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(listEnquiriesMock).toHaveBeenCalledWith({
      category: undefined,
      status: undefined,
      search: undefined,
    });
    expect(body).toEqual({
      ok: true,
      enquiries: [
        {
          id: "abc123",
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          company: "Acme",
          category: "Cloud Security",
          message: "Help",
          status: "new",
          source: "contact",
          createdAt: createdAt.toISOString(),
        },
      ],
    });
  });

  it("forwards category, status, and search query params", async () => {
    listEnquiriesMock.mockResolvedValue([]);

    await GET(makeRequest("?category=Cloud+Security&status=contacted&search=jane"));

    expect(listEnquiriesMock).toHaveBeenCalledWith({
      category: "Cloud Security",
      status: "contacted",
      search: "jane",
    });
  });
});
