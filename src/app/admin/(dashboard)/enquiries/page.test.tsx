import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/mongodb", () => ({ isMongoConfigured: vi.fn() }));
vi.mock("@/lib/enquiries", async () => {
  const actual = await vi.importActual<typeof import("@/lib/enquiries")>("@/lib/enquiries");
  return { ...actual, listEnquiries: vi.fn() };
});

import AdminEnquiriesPage from "./page";
import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries } from "@/lib/enquiries";
import type { Enquiry } from "@/lib/enquiries";

const isMongoConfiguredMock = vi.mocked(isMongoConfigured);
const listEnquiriesMock = vi.mocked(listEnquiries);

describe("AdminEnquiriesPage", () => {
  beforeEach(() => {
    isMongoConfiguredMock.mockReset();
    listEnquiriesMock.mockReset();
  });

  it("shows a setup notice when MongoDB isn't configured", async () => {
    isMongoConfiguredMock.mockReturnValue(false);
    const ui = await AdminEnquiriesPage();
    render(ui);
    expect(screen.getByText("0 total")).toBeInTheDocument();
    expect(screen.getByText("MONGODB_URI")).toBeInTheDocument();
    expect(listEnquiriesMock).not.toHaveBeenCalled();
  });

  it("renders the data table when MongoDB is configured", async () => {
    isMongoConfiguredMock.mockReturnValue(true);
    const enquiry: Enquiry = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      category: "Other",
      status: "new",
      source: "contact",
      createdAt: new Date("2026-01-01T00:00:00Z"),
    };
    listEnquiriesMock.mockResolvedValue([enquiry]);

    const ui = await AdminEnquiriesPage();
    render(ui);

    expect(screen.getByText("1 total")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });
});
