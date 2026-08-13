import { NextResponse } from "next/server";
import { getR2Bucket } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const bucket = await getR2Bucket();
    const uniqueSubjects = new Set<string>();
    let totalPapers = 0;
    let cursor: string | undefined;

    do {
      const page = await bucket.list({ prefix: "papers/", cursor });
      for (const item of page.objects) {
        totalPapers += 1;
        const parts = item.key.split("/");
        if (parts[1]) uniqueSubjects.add(parts[1]);
      }
      cursor = page.truncated ? page.cursor : undefined;
    } while (cursor);

    return NextResponse.json(
      { success: true, papersCount: totalPapers, subjectsCount: uniqueSubjects.size },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json(
      { success: false, papersCount: 0, subjectsCount: 0, error: "Unable to read R2 statistics" },
      { status: 500, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
