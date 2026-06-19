import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { firstName, lastName, email, company, usecase, message } =
    await req.json();

  const apiKey = process.env.RESEND_API_KEY;

  // In dev without a key: log and return success so form is testable
  if (!apiKey) {
    console.log("[contact form]", { firstName, lastName, email, company, usecase, message });
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
      subject: `New enquiry from ${firstName} ${lastName} — ${usecase || "General"}`,
      html: `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "—"}</p>
        <p><strong>Use case:</strong> ${usecase || "—"}</p>
        <p><strong>Message:</strong><br/>${message || "—"}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[contact] Resend error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
