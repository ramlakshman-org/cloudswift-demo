import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, checkAdminPassword, createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (typeof password !== "string" || !checkAdminPassword(password)) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
