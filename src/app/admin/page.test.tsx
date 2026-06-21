import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/mongodb", () => ({ isMongoConfigured: vi.fn() }));
vi.mock("@/lib/enquiries", async () => {
  const actual = await vi.importActual<typeof import("@/lib/enquiries")>("@/lib/enquiries");
  return { ...actual, listEnquiries: vi.fn(), serializeEnquiry: vi.fn() };
});
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }) }));

import AdminPage from "./page";
import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries, serializeEnquiry } from "@/lib/enquiries";

const isMongoConfiguredMock = vi.mocked(isMongoConfigured);
const listEnquiriesMock = vi.mocked(listEnquiries);
const serializeEnquiryMock = vi.mocked(serializeEnquiry);

describe("AdminPage", () => {
  beforeEach(() => {
    isMongoConfiguredMock.mockReset();
    listEnquiriesMock.mockReset();
    serializeEnquiryMock.mockReset();
  });

  it("shows a setup notice when MongoDB isn't configured", async () => {
    isMongoConfiguredMock.mockReturnValue(false);

    const ui = await AdminPage();
    render(ui);

    expect(screen.getByText("0 total")).toBeInTheDocument();
    expect(screen.getByText("MONGODB_URI")).toBeInTheDocument();
    expect(listEnquiriesMock).not.toHaveBeenCalled();
  });

  it("renders the enquiries table when MongoDB is configured", async () => {
    isMongoConfiguredMock.mockReturnValue(true);
    listEnquiriesMock.mockResolvedValue([{ id: "1" } as never]);
    serializeEnquiryMock.mockReturnValue({
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      category: "Other",
      status: "new",
      source: "contact",
      createdAt: "2026-01-01T00:00:00.000Z",
    });

    const ui = await AdminPage();
    render(ui);

    expect(screen.getByText("1 total")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
