import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getR2Bucket } from "@/lib/r2";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/adminAuth";

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const isAuthed = await verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!isAuthed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { fileKey } = await request.json();
    if (!fileKey || typeof fileKey !== "string") {
      return NextResponse.json({ error: "File Key required" }, { status: 400 });
    }

    await (await getR2Bucket()).delete(fileKey);
    return NextResponse.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
