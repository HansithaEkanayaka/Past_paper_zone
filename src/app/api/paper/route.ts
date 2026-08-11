import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getR2Bucket, getR2BucketName, getR2S3Client } from "@/lib/r2";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const year = searchParams.get("year");
  const medium = searchParams.get("medium");
  const type = searchParams.get("type");
  const action = searchParams.get("action") === "download" ? "download" : "view";

  if (!subject || !year || !medium || !type) {
    return NextResponse.json({ error: "Missing subject/year/medium/type" }, { status: 400 });
  }

  // Server-side protection: preview and download both require a real Supabase session.
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json(
      { error: "login_required", message: "Please log in to view or download this paper." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  const key = `papers/${subject}/${year}/${medium}/${type}.pdf`;

  try {
    const bucket = await getR2Bucket();
    let body: ReadableStream | null = null;
    let contentType = "application/pdf";

    if (bucket) {
      const object = await bucket.get(key);
      if (!object?.body) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
      body = object.body;
      contentType = object.httpMetadata?.contentType || contentType;
    } else {
      const data = await getR2S3Client().send(
        new GetObjectCommand({ Bucket: getR2BucketName(), Key: key })
      );
      if (!data.Body) return NextResponse.json({ error: "File not found" }, { status: 404 });
      body = data.Body.transformToWebStream();
      contentType = data.ContentType || contentType;
    }

    // Record paper demand after the file has been found successfully.
    try {
      const { data: { user } } = await supabase.auth.getUser();
      await createAdminClient().from("paper_activity").insert({
        action: action === "download" ? "download" : "view",
        subject_id: subject,
        year,
        medium,
        doc_type: type,
        user_id: user?.id || null,
        visitor_id: request.headers.get("x-visitor-id") || null,
      });
    } catch (activityError) {
      // Analytics must never prevent a valid paper from being served.
      console.error("Paper activity log error:", activityError);
    }

    const filename = `${subject}-${year}-${medium}-${type}.pdf`;
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `${action === "download" ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(`Paper fetch error for key "${key}":`, error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
