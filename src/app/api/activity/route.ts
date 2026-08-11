import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const allowedActions = new Set(["visit", "view", "download", "signup"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = String(body.action || "");

    if (!allowedActions.has(action)) {
      return NextResponse.json({ error: "Invalid activity" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const visitorId = request.headers.get("x-visitor-id") || null;
    const admin = createAdminClient();

    const { error } = await admin.from("paper_activity").insert({
      action,
      subject_id: body.subjectId ? String(body.subjectId) : null,
      year: body.year ? String(body.year) : null,
      medium: body.medium ? String(body.medium) : null,
      doc_type: body.docType ? String(body.docType) : null,
      user_id: user?.id || null,
      visitor_id: visitorId,
    });

    if (error) {
      console.error("Activity insert error:", error);
      return NextResponse.json({ error: "Unable to record activity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Activity API error:", error);
    return NextResponse.json({ error: "Unable to record activity" }, { status: 500 });
  }
}
