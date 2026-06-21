import { NextResponse } from "next/server";
import { listEnquiries, serializeEnquiry, type EnquiryStatus } from "@/lib/enquiries";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const status = (searchParams.get("status") as EnquiryStatus | null) || undefined;
  const search = searchParams.get("search") || undefined;

  const enquiries = await listEnquiries({ category, status, search });

  return NextResponse.json({ ok: true, enquiries: enquiries.map(serializeEnquiry) });
}
