import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

// Also did not exist before - the dashboard's "Logout" button posted here
// and silently got a 404, so the session cookie was never actually cleared.
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
