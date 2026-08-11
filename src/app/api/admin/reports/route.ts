import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status } = await request.json();
    if (!id || !["pending", "resolved", "dismissed"].includes(status)) {
      return NextResponse.json({ error: "Invalid report" }, { status: 400 });
    }

    const { error } = await createAdminClient()
      .from("paper_reports")
      .update({ status })
      .eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report update error:", error);
    return NextResponse.json({ error: "Unable to update report" }, { status: 500 });
  }
}
