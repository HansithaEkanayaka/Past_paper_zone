import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function GET() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: "papers/",
    });

    const data = await r2.send(command);
    const contents = data.Contents || [];

    // 1. මුළු Papers ගණන
    const totalPapers = contents.length;

    // 2. R2 file paths වලින් Unique Subjects (Subject IDs) ගණන auto හඳුනාගැනීම
    // File Path Format: papers/{subjectId}/{year}/{medium}/{docType}.pdf
    const uniqueSubjects = new Set<string>();

    contents.forEach((item) => {
      if (item.Key) {
        const parts = item.Key.split("/");
        if (parts.length > 1 && parts[1]) {
          uniqueSubjects.add(parts[1]); // e.g. "ol-maths" එකතු කරයි
        }
      }
    });

    return NextResponse.json({
      success: true,
      papersCount: totalPapers,
      subjectsCount: uniqueSubjects.size, // R2 හි ඇති එකිනෙකට වෙනස් Subjects ගණන
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({
      success: false,
      papersCount: 0,
      subjectsCount: 0,
    });
  }
}