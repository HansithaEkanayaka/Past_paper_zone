import { NextResponse } from "next/server";
import { getR2Bucket } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const level = new URL(request.url).searchParams.get("level");
  if (level !== "ol" && level !== "al") {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  const prefixes = [`timetables/${level}/`, `past-papers/timetables/${level}/`];

  try {
    const bucket = await getR2Bucket();
    let targetKey: string | undefined;

    for (const prefix of prefixes) {
      let cursor: string | undefined;
      let newest: { key: string; uploaded?: Date } | undefined;
      do {
        const page = await bucket.list({ prefix, cursor });
        for (const item of page.objects) {
          if (item.key.endsWith("/") || item.size <= 0) continue;
          if (!newest || (item.uploaded?.getTime() ?? 0) > (newest.uploaded?.getTime() ?? 0)) {
            newest = item;
          }
        }
        cursor = page.truncated ? page.cursor : undefined;
      } while (cursor);

      if (newest) {
        targetKey = newest.key;
        break;
      }
    }

    if (!targetKey) {
      return NextResponse.json(
        { error: "not_released", message: `${level.toUpperCase()} timetable hasn't been released yet.` },
        { status: 404 }
      );
    }

    const object = await bucket.get(targetKey);
    if (!object?.body) return NextResponse.json({ error: "not_released" }, { status: 404 });

    const filename = targetKey.split("/").pop() || `${level}-timetable.pdf`;
    return new Response(object.body, {
      status: 200,
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error(`Timetable fetch error for level "${level}":`, error);
    return NextResponse.json(
      { error: "not_released", message: `${level.toUpperCase()} timetable hasn't been released yet.` },
      { status: 404 }
    );
  }
}
