import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// List the current user's saved papers (used by the profile page).
export async function GET() {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await createAdminClient()
    .from("saved_papers")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Saved papers list error:", error);
    return NextResponse.json({ error: "Unable to load saved papers" }, { status: 500 });
  }

  return NextResponse.json({ success: true, saved: data || [] });
}

// Save a paper (bookmark button on the subject page).
export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { subjectId, year, medium, docType } = await request.json();
    if (!subjectId || !year || !medium || !docType) {
      return NextResponse.json({ error: "Missing paper details" }, { status: 400 });
    }

    const { error } = await createAdminClient().from("saved_papers").upsert(
      {
        user_id: user.id,
        subject_id: String(subjectId),
        year: String(year),
        medium: String(medium),
        doc_type: String(docType),
      },
      { onConflict: "user_id,subject_id,year,medium,doc_type", ignoreDuplicates: true }
    );

    if (error) {
      console.error("Save paper error:", error);
      return NextResponse.json({ error: "Unable to save paper" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save paper API error:", error);
    return NextResponse.json({ error: "Unable to save paper" }, { status: 500 });
  }
}

// Remove a saved paper (unsave button on subject page or profile list).
export async function DELETE(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { subjectId, year, medium, docType } = await request.json();
    if (!subjectId || !year || !medium || !docType) {
      return NextResponse.json({ error: "Missing paper details" }, { status: 400 });
    }

    const { error } = await createAdminClient()
      .from("saved_papers")
      .delete()
      .eq("user_id", user.id)
      .eq("subject_id", String(subjectId))
      .eq("year", String(year))
      .eq("medium", String(medium))
      .eq("doc_type", String(docType));

    if (error) {
      console.error("Unsave paper error:", error);
      return NextResponse.json({ error: "Unable to remove saved paper" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsave paper API error:", error);
    return NextResponse.json({ error: "Unable to remove saved paper" }, { status: 500 });
  }
}
