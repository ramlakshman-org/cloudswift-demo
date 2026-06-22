import { ObjectId } from "mongodb";
import { getDb, isMongoConfigured } from "@/lib/mongodb";
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_STATUSES,
  ENQUIRY_SOURCES,
  type EnquiryCategory,
  type EnquiryStatus,
  type EnquirySource,
  type SerializedEnquiry,
} from "@/lib/enquiry-shared";

export { ENQUIRY_CATEGORIES, ENQUIRY_STATUSES, ENQUIRY_SOURCES };
export type { EnquiryCategory, EnquiryStatus, EnquirySource, SerializedEnquiry };

export interface Enquiry {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  city?: string;
  company?: string;
  category: string;
  message?: string;
  answers?: Record<string, string>;
  status: EnquiryStatus;
  source: EnquirySource;
  createdAt: Date;
}

export interface NewEnquiry {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  city?: string;
  company?: string;
  category?: string;
  message?: string;
  answers?: Record<string, string>;
  source?: EnquirySource;
}

const COLLECTION = "enquiries";

/**
 * No-op (with a console log) when MONGODB_URI isn't set, mirroring the
 * existing RESEND_API_KEY dev fallback in /api/contact — lets the contact
 * form keep working locally before the Atlas cluster is wired up.
 */
export async function insertEnquiry(input: NewEnquiry): Promise<void> {
  if (!isMongoConfigured()) {
    console.log("[enquiries] MONGODB_URI not set, skipping persistence", input);
    return;
  }

  const db = await getDb();
  const enquiry: Enquiry = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone || undefined,
    jobTitle: input.jobTitle || undefined,
    city: input.city || undefined,
    company: input.company || undefined,
    category: input.category || "Other",
    message: input.message || undefined,
    answers: input.answers || undefined,
    status: "new",
    source: input.source || "contact",
    createdAt: new Date(),
  };
  await db.collection<Enquiry>(COLLECTION).insertOne(enquiry);
}

export interface ListEnquiriesFilter {
  category?: string;
  status?: EnquiryStatus;
  search?: string;
}

export async function listEnquiries(filter: ListEnquiriesFilter = {}): Promise<Enquiry[]> {
  const db = await getDb();
  const query: Record<string, unknown> = {};

  if (filter.category) query.category = filter.category;
  if (filter.status) query.status = filter.status;
  if (filter.search) {
    const re = new RegExp(filter.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    query.$or = [{ firstName: re }, { lastName: re }, { email: re }, { company: re }, { phone: re }];
  }

  return db
    .collection<Enquiry>(COLLECTION)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
}

export function serializeEnquiry(e: Enquiry): SerializedEnquiry {
  return {
    id: e._id?.toString() ?? "",
    firstName: e.firstName,
    lastName: e.lastName,
    email: e.email,
    phone: e.phone,
    jobTitle: e.jobTitle,
    city: e.city,
    company: e.company,
    category: e.category,
    message: e.message,
    answers: e.answers,
    status: e.status,
    source: e.source,
    createdAt: e.createdAt.toISOString(),
  };
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;

  const db = await getDb();
  const result = await db
    .collection<Enquiry>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return result.matchedCount > 0;
}
