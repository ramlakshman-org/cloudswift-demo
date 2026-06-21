import { NextResponse } from "next/server";
import { ENQUIRY_STATUSES, updateEnquiryStatus, type EnquiryStatus } from "@/lib/enquiries";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await req.json();

  if (!ENQUIRY_STATUSES.includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateEnquiryStatus(id, status as EnquiryStatus);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Enquiry not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
