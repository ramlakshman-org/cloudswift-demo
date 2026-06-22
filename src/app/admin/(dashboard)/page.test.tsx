import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/mongodb", () => ({ isMongoConfigured: vi.fn() }));
vi.mock("@/lib/enquiries", async () => {
  const actual = await vi.importActual<typeof import("@/lib/enquiries")>("@/lib/enquiries");
  return { ...actual, listEnquiries: vi.fn() };
});

import AdminDashboardPage from "./page";
import { isMongoConfigured } from "@/lib/mongodb";
import { listEnquiries } from "@/lib/enquiries";
import type { Enquiry } from "@/lib/enquiries";

const isMongoConfiguredMock = vi.mocked(isMongoConfigured);
const listEnquiriesMock = vi.mocked(listEnquiries);

function makeEnquiry(overrides: Partial<Enquiry>): Enquiry {
  return {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    category: "Other",
    status: "new",
    source: "contact",
    createdAt: new Date("2026-01-01T00:00:00Z"),
    ...overrides,
  };
}

describe("AdminDashboardPage", () => {
  beforeEach(() => {
    isMongoConfiguredMock.mockReset();
    listEnquiriesMock.mockReset();
  });

  it("shows a setup notice when MongoDB isn't configured", async () => {
    isMongoConfiguredMock.mockReturnValue(false);
    const ui = await AdminDashboardPage();
    render(ui);
    expect(screen.getByText("MONGODB_URI")).toBeInTheDocument();
    expect(listEnquiriesMock).not.toHaveBeenCalled();
  });

  it("renders stat cards and a recent enquiries list when configured", async () => {
    isMongoConfiguredMock.mockReturnValue(true);
    listEnquiriesMock.mockResolvedValue([
      makeEnquiry({ status: "new", source: "contact", firstName: "Jane", lastName: "Doe" }),
      makeEnquiry({ status: "contacted", source: "assessment", firstName: "Raj", lastName: "Kumar" }),
      makeEnquiry({ status: "qualified", source: "assessment", firstName: "Lee", lastName: "Chen" }),
      makeEnquiry({ status: "closed", source: "contact", firstName: "Sam", lastName: "Patel" }),
    ]);

    const ui = await AdminDashboardPage();
    render(ui);

    expect(screen.getByText("4")).toBeInTheDocument(); // total
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("Raj Kumar")).toBeInTheDocument();
    expect(screen.getByText("2 via contact form, 2 via free assessment")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View all enquiries/ })).toHaveAttribute("href", "/admin/enquiries");
  });

  it("shows an empty state when there are no enquiries", async () => {
    isMongoConfiguredMock.mockReturnValue(true);
    listEnquiriesMock.mockResolvedValue([]);

    const ui = await AdminDashboardPage();
    render(ui);

    expect(screen.getByText("No enquiries yet.")).toBeInTheDocument();
  });
});
