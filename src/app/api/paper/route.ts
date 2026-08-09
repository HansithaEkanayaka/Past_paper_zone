import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import { createClient } from "@/lib/supabase/server";

// Serves past-paper PDFs from Cloudflare R2 through our own domain instead of
// exposing the raw R2 public URL. Also enforces login: a signed-out visitor
// gets a 401 instead of the file, whether they're trying to preview or
// download it.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const year = searchParams.get("year");
  const medium = searchParams.get("medium");
  const type = searchParams.get("type"); // "paper" | "marking"
  const action = searchParams.get("action") === "download" ? "download" : "view";

  if (!subject || !year || !medium || !type) {
    return NextResponse.json({ error: "Missing subject/year/medium/type" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Please log in to view or download this paper." },
      { status: 401 }
    );
  }

  const key = `papers/${subject}/${year}/${medium}/${type}.pdf`;

  try {
    const data = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      })
    );

    if (!data.Body) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const bytes = await data.Body.transformToByteArray();
    const filename = `${subject}-${year}-${medium}-${type}.pdf`;

    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${action === "download" ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "private, max-age=0, no-store",
      },
    });
  } catch (error) {
    console.error("Paper fetch error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
