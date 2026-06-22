import { NextResponse } from "next/server";
import { insertEnquiry } from "@/lib/enquiries";
import { ENQUIRY_CATEGORIES, type EnquiryCategory } from "@/lib/enquiry-shared";
import { ASSESSMENT_QUESTIONS } from "@/lib/assessment-questions";

function isEnquiryCategory(value: unknown): value is EnquiryCategory {
  return typeof value === "string" && (ENQUIRY_CATEGORIES as readonly string[]).includes(value);
}

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, jobTitle, city, company, category, answers, message } =
    await req.json();

  if (!isEnquiryCategory(category)) {
    return NextResponse.json({ ok: false, error: "Invalid category" }, { status: 400 });
  }
  if (typeof firstName !== "string" || typeof lastName !== "string" || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const safeAnswers: Record<string, string> =
    answers && typeof answers === "object" ? answers : {};

  await insertEnquiry({
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    city,
    company,
    category,
    answers: safeAnswers,
    message,
    source: "assessment",
  });

  const questionLabels = new Map(ASSESSMENT_QUESTIONS[category].map((q) => [q.id, q.question]));
  const answersHtml = Object.entries(safeAnswers)
    .map(([id, value]) => `<p><strong>${questionLabels.get(id) || id}:</strong> ${value}</p>`)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[assessment]", { firstName, lastName, email, phone, jobTitle, city, company, category, answers: safeAnswers, message });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "CloudSwift Website <onboarding@resend.dev>",
      to: ["support@oncloudswift.com"],
      reply_to: email,
      subject: `New free assessment request from ${firstName} ${lastName} — ${category}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Job title:</strong> ${jobTitle || "—"}</p>
        <p><strong>City:</strong> ${city || "—"}</p>
        <p><strong>Company:</strong> ${company || "—"}</p>
        <p><strong>Category:</strong> ${category}</p>
        ${answersHtml}
        <p><strong>Anything else:</strong><br/>${message || "—"}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[assessment] Resend error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
