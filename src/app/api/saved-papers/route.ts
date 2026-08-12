import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const validMediums = new Set(["sinhala", "english", "tamil"]);
const validDocTypes = new Set(["paper", "marking"]);

function validatePaper(input: Record<string, unknown>) {
  const subjectId = String(input.subjectId || "").trim();
  const year = String(input.year || "").trim();
  const medium = String(input.medium || "").trim();
  const docType = String(input.docType || "").trim();

  if (!subjectId || !year || !validMediums.has(medium) || !validDocTypes.has(docType)) {
    return null;
  }

  return { subjectId, year, medium, docType };
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "login_required" }, { status: 401 });
    }

    const { data, error } = await createAdminClient()
      .from("saved_papers")
      .select("id, subject_id, year, medium, doc_type, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Saved papers fetch error:", error);
      return NextResponse.json({ error: "Unable to load saved papers" }, { status: 500 });
    }

    return NextResponse.json({ success: true, papers: data || [] });
  } catch (error) {
    console.error("Saved papers GET error:", error);
    return NextResponse.json({ error: "Unable to load saved papers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "login_required" }, { status: 401 });
    }

    const paper = validatePaper(await request.json());
    if (!paper) {
      return NextResponse.json({ error: "Invalid paper" }, { status: 400 });
    }

    const { data, error } = await createAdminClient()
      .from("saved_papers")
      .upsert(
        {
          user_id: user.id,
          subject_id: paper.subjectId,
          year: paper.year,
          medium: paper.medium,
          doc_type: paper.docType,
        },
        { onConflict: "user_id,subject_id,year,medium,doc_type" }
      )
      .select("id, subject_id, year, medium, doc_type, created_at")
      .single();

    if (error) {
      console.error("Saved paper insert error:", error);
      return NextResponse.json({ error: "Unable to save paper" }, { status: 500 });
    }

    return NextResponse.json({ success: true, paper: data });
  } catch (error) {
    console.error("Saved papers POST error:", error);
    return NextResponse.json({ error: "Unable to save paper" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "login_required" }, { status: 401 });
    }

    const paper = validatePaper(await request.json());
    if (!paper) {
      return NextResponse.json({ error: "Invalid paper" }, { status: 400 });
    }

    const { error } = await createAdminClient()
      .from("saved_papers")
      .delete()
      .eq("user_id", user.id)
      .eq("subject_id", paper.subjectId)
      .eq("year", paper.year)
      .eq("medium", paper.medium)
      .eq("doc_type", paper.docType);

    if (error) {
      console.error("Saved paper delete error:", error);
      return NextResponse.json({ error: "Unable to remove saved paper" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Saved papers DELETE error:", error);
    return NextResponse.json({ error: "Unable to remove saved paper" }, { status: 500 });
  }
}
