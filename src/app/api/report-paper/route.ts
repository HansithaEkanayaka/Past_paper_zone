import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const reasons = new Set([
  "PDF doesn't open",
  "Wrong paper",
  "Missing pages",
  "Wrong marking scheme",
  "Poor quality",
  "Other",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subjectId, year, medium, docType, reason, details } = body;

    if (!subjectId || !year || !medium || !docType || !reasons.has(reason)) {
      return NextResponse.json({ error: "Invalid report" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await createAdminClient().from("paper_reports").insert({
      subject_id: String(subjectId),
      year: String(year),
      medium: String(medium),
      doc_type: String(docType),
      reason: String(reason),
      details: details ? String(details).slice(0, 1000) : null,
      user_id: user?.id || null,
    });

    if (error) {
      console.error("Report insert error:", error);
      return NextResponse.json({ error: "Unable to save report" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report API error:", error);
    return NextResponse.json({ error: "Unable to submit report" }, { status: 500 });
  }
}
