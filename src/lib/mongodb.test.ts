import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const connectMock = vi.fn();
const dbMock = vi.fn();

vi.mock("mongodb", () => ({
  MongoClient: vi.fn().mockImplementation(function MockMongoClient() {
    return { connect: connectMock };
  }),
}));

describe("mongodb", () => {
  const originalUri = process.env.MONGODB_URI;
  const originalDb = process.env.MONGODB_DB;

  beforeEach(() => {
    vi.resetModules();
    connectMock.mockReset();
    dbMock.mockReset();
    delete global.__mongoClientPromise;
  });

  afterEach(() => {
    if (originalUri === undefined) delete process.env.MONGODB_URI;
    else process.env.MONGODB_URI = originalUri;
    if (originalDb === undefined) delete process.env.MONGODB_DB;
    else process.env.MONGODB_DB = originalDb;
    delete global.__mongoClientPromise;
  });

  it("isMongoConfigured returns false when MONGODB_URI is unset", async () => {
    delete process.env.MONGODB_URI;
    const { isMongoConfigured } = await import("./mongodb");
    expect(isMongoConfigured()).toBe(false);
  });

  it("isMongoConfigured returns true when MONGODB_URI is set", async () => {
    process.env.MONGODB_URI = "mongodb://test";
    const { isMongoConfigured } = await import("./mongodb");
    expect(isMongoConfigured()).toBe(true);
  });

  it("getDb throws when MONGODB_URI is unset", async () => {
    delete process.env.MONGODB_URI;
    const { getDb } = await import("./mongodb");
    await expect(getDb()).rejects.toThrow("MONGODB_URI is not set");
  });

  it("getDb connects once and reuses the cached client on subsequent calls", async () => {
    process.env.MONGODB_URI = "mongodb://test";
    process.env.MONGODB_DB = "testdb";
    const client = { db: dbMock };
    connectMock.mockResolvedValue(client);
    dbMock.mockReturnValue({ name: "testdb" });

    const { getDb } = await import("./mongodb");
    await getDb();
    await getDb();

    expect(connectMock).toHaveBeenCalledTimes(1);
    expect(dbMock).toHaveBeenCalledWith("testdb");
  });

  it("getDb falls back to the default db name when MONGODB_DB is unset", async () => {
    process.env.MONGODB_URI = "mongodb://test";
    delete process.env.MONGODB_DB;
    const client = { db: dbMock };
    connectMock.mockResolvedValue(client);
    dbMock.mockReturnValue({ name: "cloudswift" });

    const { getDb } = await import("./mongodb");
    await getDb();

    expect(dbMock).toHaveBeenCalledWith("cloudswift");
  });
});
