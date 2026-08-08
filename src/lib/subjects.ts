// Static O/L & A/L subject metadata shared across pages.
// Names are NOT stored here — they come from the `SubjectCard.subjects.<id>`
// translation key for the active locale (see components/SubjectCard.tsx).

export interface SubjectMeta {
  id: string;
  level: "OL" | "AL";
  code: string;
  mediumCount: number;
}

export const OL_SUBJECTS: SubjectMeta[] = [
  { id: "ol-maths", level: "OL", code: "32", mediumCount: 3 },
  { id: "ol-science", level: "OL", code: "34", mediumCount: 3 },
  { id: "ol-sinhala", level: "OL", code: "21", mediumCount: 3 },
  { id: "ol-english", level: "OL", code: "31", mediumCount: 3 },
  { id: "ol-history", level: "OL", code: "33", mediumCount: 3 },
  { id: "ol-buddhism", level: "OL", code: "11", mediumCount: 3 },
  { id: "ol-tamil", level: "OL", code: "22", mediumCount: 3 },
  { id: "ol-geography", level: "OL", code: "61", mediumCount: 3 },
  { id: "ol-civic", level: "OL", code: "62", mediumCount: 3 },
  { id: "ol-music", level: "OL", code: "40", mediumCount: 3 },
  { id: "ol-art", level: "OL", code: "43", mediumCount: 3 },
  { id: "ol-dancing", level: "OL", code: "44", mediumCount: 3 },
  { id: "ol-drama", level: "OL", code: "50", mediumCount: 3 },
  { id: "ol-ict", level: "OL", code: "80", mediumCount: 3 },
  { id: "ol-agriculture", level: "OL", code: "81", mediumCount: 3 },
  { id: "ol-health", level: "OL", code: "86", mediumCount: 3 },
];

export const AL_SUBJECTS: SubjectMeta[] = [
  { id: "al-combined-maths", level: "AL", code: "10", mediumCount: 3 },
  { id: "al-physics", level: "AL", code: "01", mediumCount: 3 },
  { id: "al-chemistry", level: "AL", code: "02", mediumCount: 3 },
  { id: "al-biology", level: "AL", code: "09", mediumCount: 3 },
  { id: "al-ict", level: "AL", code: "20", mediumCount: 3 },
  { id: "al-accounting", level: "AL", code: "33", mediumCount: 3 },
  { id: "al-business", level: "AL", code: "32", mediumCount: 3 },
  { id: "al-econ", level: "AL", code: "21", mediumCount: 3 },
  { id: "al-agro", level: "AL", code: "18", mediumCount: 3 },
  { id: "al-et", level: "AL", code: "65", mediumCount: 3 },
  { id: "al-bst", level: "AL", code: "66", mediumCount: 3 },
  { id: "al-sft", level: "AL", code: "67", mediumCount: 3 },
];

export const ALL_SUBJECTS: SubjectMeta[] = [...OL_SUBJECTS, ...AL_SUBJECTS];
