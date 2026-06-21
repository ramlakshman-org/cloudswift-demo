// Browser-safe constants/types shared between the server-only data layer
// (enquiries.ts, which imports the mongodb driver) and client components
// like EnquiriesTable. Keep this file free of any mongodb import — pulling
// the driver into a client bundle breaks the build (it depends on Node
// built-ins like "tls" and "timers/promises" that don't exist in the browser).

export const ENQUIRY_CATEGORIES = [
  "Microsoft Azure",
  "Dynamics 365 (ERP/CRM)",
  "Microsoft 365 / Modern Workplace",
  "Power BI & Analytics",
  "Managed Cloud Services",
  "Cloud Migration",
  "Cloud Security",
  "Other",
] as const;

export type EnquiryCategory = (typeof ENQUIRY_CATEGORIES)[number];

export const ENQUIRY_STATUSES = ["new", "contacted", "qualified", "closed"] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const ENQUIRY_SOURCES = ["contact", "assessment"] as const;

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export interface SerializedEnquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  category: string;
  message?: string;
  answers?: Record<string, string>;
  status: EnquiryStatus;
  source: EnquirySource;
  createdAt: string;
}
