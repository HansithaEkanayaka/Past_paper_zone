// Shared G.C.E. O/L & A/L 2026 exam dates.
// Used by both the homepage countdown (ExamCountdown) and the timetable
// download section (ExamTimetable) so the dates only need updating in one
// place each year.

export type ExamLevel = "ol" | "al";

export interface ExamDefinition {
  level: ExamLevel;
  label: string;
  fullName: string;
  year: number;
  start: Date;
  end: Date;
  dateRangeLabel: string;
  // Where students can verify/download the official timetable PDF.
  // Point this at the direct PDF link once you have one (e.g. hosted on
  // R2 or in /public) - until then it links to the Department of
  // Examinations' own site.
  officialSource: string;
  downloadUrl: string;
}

export const EXAMS: Record<ExamLevel, ExamDefinition> = {
  ol: {
    level: "ol",
    label: "O/L",
    fullName: "G.C.E. Ordinary Level (O/L)",
    year: 2026,
    start: new Date("2026-12-08T00:00:00+05:30"),
    end: new Date("2026-12-17T00:00:00+05:30"),
    dateRangeLabel: "8 – 17 December 2026",
    officialSource: "https://doenets.lk/",
    downloadUrl: "https://doenets.lk/",
  },
  al: {
    level: "al",
    label: "A/L",
    fullName: "G.C.E. Advanced Level (A/L)",
    year: 2026,
    start: new Date("2026-08-10T00:00:00+05:30"),
    end: new Date("2026-09-05T00:00:00+05:30"),
    dateRangeLabel: "10 August – 5 September 2026",
    officialSource: "https://doenets.lk/",
    downloadUrl: "https://doenets.lk/",
  },
};
