import { MongoClient, type Db } from "mongodb";

// Cache the client across invocations — without this, every serverless
// cold start (and every HMR reload in dev) would open a fresh connection
// instead of reusing the pool.
declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!global.__mongoClientPromise) {
    global.__mongoClientPromise = new MongoClient(uri).connect();
  }
  return global.__mongoClientPromise;
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "cloudswift");
}
