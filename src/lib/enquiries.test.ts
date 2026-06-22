import { describe, it, expect, vi, beforeEach } from "vitest";
import { ObjectId } from "mongodb";

vi.mock("@/lib/mongodb", () => ({
  isMongoConfigured: vi.fn(),
  getDb: vi.fn(),
}));

import { insertEnquiry, listEnquiries, updateEnquiryStatus, serializeEnquiry } from "./enquiries";
import { isMongoConfigured, getDb } from "@/lib/mongodb";

const isMongoConfiguredMock = vi.mocked(isMongoConfigured);
const getDbMock = vi.mocked(getDb);

describe("enquiries", () => {
  beforeEach(() => {
    isMongoConfiguredMock.mockReset();
    getDbMock.mockReset();
  });

  describe("insertEnquiry", () => {
    it("logs and skips persistence when Mongo isn't configured", async () => {
      isMongoConfiguredMock.mockReturnValue(false);
      const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      await insertEnquiry({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" });

      expect(logSpy).toHaveBeenCalledWith(
        "[enquiries] MONGODB_URI not set, skipping persistence",
        expect.objectContaining({ firstName: "Jane" })
      );
      expect(getDbMock).not.toHaveBeenCalled();
    });

    it("inserts a normalized enquiry document when Mongo is configured", async () => {
      isMongoConfiguredMock.mockReturnValue(true);
      const insertOne = vi.fn().mockResolvedValue({ insertedId: "1" });
      const collection = vi.fn().mockReturnValue({ insertOne });
      getDbMock.mockResolvedValue({ collection } as never);

      await insertEnquiry({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "+91-9876543210",
        jobTitle: "IT Manager",
        city: "Bengaluru",
        company: "Acme",
        category: "Cloud Migration",
        message: "Help us migrate",
      });

      expect(collection).toHaveBeenCalledWith("enquiries");
      expect(insertOne).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Jane",
          lastName: "Doe",
          email: "jane@example.com",
          phone: "+91-9876543210",
          jobTitle: "IT Manager",
          city: "Bengaluru",
          company: "Acme",
          category: "Cloud Migration",
          message: "Help us migrate",
          status: "new",
          source: "contact",
          createdAt: expect.any(Date),
        })
      );
    });

    it("uses the provided source instead of the contact default", async () => {
      isMongoConfiguredMock.mockReturnValue(true);
      const insertOne = vi.fn().mockResolvedValue({ insertedId: "1" });
      const collection = vi.fn().mockReturnValue({ insertOne });
      getDbMock.mockResolvedValue({ collection } as never);

      await insertEnquiry({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        source: "assessment",
      });

      expect(insertOne).toHaveBeenCalledWith(expect.objectContaining({ source: "assessment" }));
    });

    it("defaults category to Other and omits empty optional fields", async () => {
      isMongoConfiguredMock.mockReturnValue(true);
      const insertOne = vi.fn().mockResolvedValue({ insertedId: "1" });
      const collection = vi.fn().mockReturnValue({ insertOne });
      getDbMock.mockResolvedValue({ collection } as never);

      await insertEnquiry({ firstName: "Jane", lastName: "Doe", email: "jane@example.com" });

      expect(insertOne).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "Other",
          company: undefined,
          message: undefined,
          phone: undefined,
          jobTitle: undefined,
          city: undefined,
        })
      );
    });
  });

  describe("listEnquiries", () => {
    it("queries with no filters by default, sorted newest first", async () => {
      const toArray = vi.fn().mockResolvedValue([]);
      const sort = vi.fn().mockReturnValue({ toArray });
      const find = vi.fn().mockReturnValue({ sort });
      const collection = vi.fn().mockReturnValue({ find });
      getDbMock.mockResolvedValue({ collection } as never);

      await listEnquiries();

      expect(find).toHaveBeenCalledWith({});
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    it("filters by category, status, and search across name/email/company", async () => {
      const toArray = vi.fn().mockResolvedValue([]);
      const sort = vi.fn().mockReturnValue({ toArray });
      const find = vi.fn().mockReturnValue({ sort });
      const collection = vi.fn().mockReturnValue({ find });
      getDbMock.mockResolvedValue({ collection } as never);

      await listEnquiries({ category: "Cloud Security", status: "new", search: "jane" });

      expect(find).toHaveBeenCalledWith({
        category: "Cloud Security",
        status: "new",
        $or: [
          { firstName: expect.any(RegExp) },
          { lastName: expect.any(RegExp) },
          { email: expect.any(RegExp) },
          { company: expect.any(RegExp) },
          { phone: expect.any(RegExp) },
        ],
      });
    });

    it("escapes regex special characters in the search term", async () => {
      const toArray = vi.fn().mockResolvedValue([]);
      const sort = vi.fn().mockReturnValue({ toArray });
      const find = vi.fn().mockReturnValue({ sort });
      const collection = vi.fn().mockReturnValue({ find });
      getDbMock.mockResolvedValue({ collection } as never);

      await listEnquiries({ search: "a.b*c" });

      const calledQuery = find.mock.calls[0][0];
      expect(calledQuery.$or[0].firstName.source).toBe("a\\.b\\*c");
    });
  });

  describe("serializeEnquiry", () => {
    it("falls back to an empty id string when _id is missing", () => {
      const result = serializeEnquiry({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        category: "Other",
        status: "new",
        source: "contact",
        createdAt: new Date("2026-01-01T00:00:00Z"),
      });

      expect(result.id).toBe("");
    });

    it("passes through phone, jobTitle, and city", () => {
      const result = serializeEnquiry({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        phone: "+91-9876543210",
        jobTitle: "IT Manager",
        city: "Bengaluru",
        category: "Other",
        status: "new",
        source: "contact",
        createdAt: new Date("2026-01-01T00:00:00Z"),
      });

      expect(result.phone).toBe("+91-9876543210");
      expect(result.jobTitle).toBe("IT Manager");
      expect(result.city).toBe("Bengaluru");
    });
  });

  describe("updateEnquiryStatus", () => {
    it("returns true when a document was matched", async () => {
      const updateOne = vi.fn().mockResolvedValue({ matchedCount: 1 });
      const collection = vi.fn().mockReturnValue({ updateOne });
      getDbMock.mockResolvedValue({ collection } as never);

      const id = new ObjectId().toHexString();
      const result = await updateEnquiryStatus(id, "contacted");

      expect(result).toBe(true);
      expect(updateOne).toHaveBeenCalledWith(
        { _id: expect.any(ObjectId) },
        { $set: { status: "contacted" } }
      );
    });

    it("returns false when no document was matched", async () => {
      const updateOne = vi.fn().mockResolvedValue({ matchedCount: 0 });
      const collection = vi.fn().mockReturnValue({ updateOne });
      getDbMock.mockResolvedValue({ collection } as never);

      const result = await updateEnquiryStatus(new ObjectId().toHexString(), "closed");

      expect(result).toBe(false);
    });

    it("returns false without touching the db for a malformed id", async () => {
      const result = await updateEnquiryStatus("not-a-valid-id", "closed");

      expect(result).toBe(false);
      expect(getDbMock).not.toHaveBeenCalled();
    });
  });
});
