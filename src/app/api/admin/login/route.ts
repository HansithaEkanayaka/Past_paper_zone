import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE_SECONDS,
  createAdminToken,
  isCorrectAdminPassword,
} from "@/lib/adminAuth";

// This route did not exist before, even though AdminLoginClient.tsx has
// always posted to it - so every login attempt (even with the correct
// password) hit a 404, whose non-JSON body made res.json() fail and fall
// back to the generic "Incorrect password." message. That's why the
// password field looked broken. This route checks the password against
// ADMIN_PASSWORD and, if correct, sets the signed session cookie that
// verifyAdminToken() (used by /api/admin/upload, /api/admin/delete, and the
// dashboard's middleware guard) expects.
export async function POST(request: Request) {
  let password: string | undefined;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    console.error(
      "[admin/login] ADMIN_PASSWORD env var is not set - every login attempt will fail."
    );
    return NextResponse.json(
      { error: "Admin login is not configured on the server." },
      { status: 500 }
    );
  }

  if (typeof password !== "string" || !isCorrectAdminPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createAdminToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ success: true });
}
