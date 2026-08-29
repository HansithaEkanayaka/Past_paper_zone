import { NextResponse } from "next/server";
import { getR2Bucket } from "@/lib/r2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Lightweight existence check (no file content, no login required) so the
// UI can decide what to show — a single "full paper" view, a Part 1 / Part 2
// picker, or a clean "not available yet" message — before trying to open
// or download anything.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");
  const year = searchParams.get("year");
  const medium = searchParams.get("medium");
  const type = searchParams.get("type");

  if (!subject || !year || !medium || !type) {
    return NextResponse.json({ error: "Missing subject/year/medium/type" }, { status: 400 });
  }

  const isALQuestionPaper = subject.startsWith("al-") && type === "paper";
  const base = `papers/${subject}/${year}/${medium}`;

  try {
    const bucket = await getR2Bucket();

    const [full, part1, part2] = await Promise.all([
      bucket.head(`${base}/${type}.pdf`),
      isALQuestionPaper ? bucket.head(`${base}/${type}-part1.pdf`) : Promise.resolve(null),
      isALQuestionPaper ? bucket.head(`${base}/${type}-part2.pdf`) : Promise.resolve(null),
    ]);

    return NextResponse.json({
      success: true,
      full: Boolean(full),
      part1: Boolean(part1),
      part2: Boolean(part2),
    });
  } catch (error) {
    console.error("Paper availability check error:", error);
    return NextResponse.json({ error: "Unable to check availability" }, { status: 500 });
  }
}
