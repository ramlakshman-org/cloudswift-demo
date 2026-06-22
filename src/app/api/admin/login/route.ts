import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, checkAdminCredentials, createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !checkAdminCredentials(username, password)
  ) {
    return NextResponse.json({ ok: false, error: "Incorrect username or password" }, { status: 401 });
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
