import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getR2Bucket } from "@/lib/r2";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";
import { notifyChannelNewPaper } from "@/lib/telegramChannelPost";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value
  );

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const subjectId = String(formData.get("subjectId") || "");
    const year = String(formData.get("year") || "");
    const medium = String(formData.get("medium") || "");
    const docType = String(formData.get("docType") || "");
    const telegramGraphic = formData.get("telegramGraphic");

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    if (!subjectId || !year || !medium || !docType) {
      return NextResponse.json(
        { error: "subjectId, year, medium and docType are required" },
        { status: 400 }
      );
    }

    // Watermarking is deliberately done in the admin browser.
    // Keeping pdf-lib out of this Worker is what allows the main Worker
    // bundle to stay within Cloudflare Workers Free's 3 MiB script limit.
    const bytes = await file.arrayBuffer();
    const key = `papers/${subjectId}/${year}/${medium}/${docType}.pdf`;
    const bucket = await getR2Bucket();

    await bucket.put(key, bytes, {
      httpMetadata: { contentType: "application/pdf" },
    });

    // Auto-post a channel announcement for the new upload.
    // Wrapped so a Telegram failure never breaks the upload itself.
    try {
      await notifyChannelNewPaper({
        subjectId,
        year,
        medium: medium as "sinhala" | "english" | "tamil",
        docType: docType as "paper" | "marking",
        graphic: telegramGraphic instanceof File ? telegramGraphic : null,
      });
    } catch (notifyError) {
      console.error("Telegram channel notify failed:", notifyError);
    }

    return NextResponse.json({ success: true, key });
  } catch (error: unknown) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
