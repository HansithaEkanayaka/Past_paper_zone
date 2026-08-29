// Static O/L & A/L subject metadata shared across pages.
// Names are NOT stored here — they come from the `SubjectCard.subjects.<id>`
// translation key for the active locale (see components/SubjectCard.tsx).

// O/L subjects are grouped for display into the compulsory "main" subjects
// followed by three optional baskets (category1/2/3), in that order.
export type OLCategory = "main" | "category1" | "category2" | "category3";

// A/L subjects are grouped for display by stream, in this order:
// science, tech, art. ("art" here also covers the commerce subjects —
// accounting/business/economics — since this site doesn't have a separate
// arts-stream subject list.)
export type ALStream = "science" | "tech" | "art";

export interface SubjectMeta {
  id: string;
  level: "OL" | "AL";
  code: string;
  mediumCount: number;
  olCategory?: OLCategory;
  alStream?: ALStream;
}

export const OL_SUBJECTS: SubjectMeta[] = [
  { id: "ol-maths", level: "OL", code: "32", mediumCount: 3, olCategory: "main" },
  { id: "ol-science", level: "OL", code: "34", mediumCount: 3, olCategory: "main" },
  { id: "ol-sinhala", level: "OL", code: "21", mediumCount: 3, olCategory: "main" },
  { id: "ol-english", level: "OL", code: "31", mediumCount: 3, olCategory: "main" },
  { id: "ol-history", level: "OL", code: "33", mediumCount: 3, olCategory: "main" },
  { id: "ol-buddhism", level: "OL", code: "11", mediumCount: 3, olCategory: "main" },
  { id: "ol-tamil", level: "OL", code: "22", mediumCount: 3, olCategory: "category1" },
  { id: "ol-geography", level: "OL", code: "61", mediumCount: 3, olCategory: "category1" },
  { id: "ol-civic", level: "OL", code: "62", mediumCount: 3, olCategory: "category1" },
  { id: "ol-music", level: "OL", code: "40", mediumCount: 3, olCategory: "category2" },
  { id: "ol-art", level: "OL", code: "43", mediumCount: 3, olCategory: "category2" },
  { id: "ol-dancing", level: "OL", code: "44", mediumCount: 3, olCategory: "category2" },
  { id: "ol-drama", level: "OL", code: "50", mediumCount: 3, olCategory: "category2" },
  { id: "ol-ict", level: "OL", code: "80", mediumCount: 3, olCategory: "category3" },
  { id: "ol-agriculture", level: "OL", code: "81", mediumCount: 3, olCategory: "category3" },
  { id: "ol-health", level: "OL", code: "86", mediumCount: 3, olCategory: "category3" },
];

export const AL_SUBJECTS: SubjectMeta[] = [
  { id: "al-combined-maths", level: "AL", code: "10", mediumCount: 3, alStream: "science" },
  { id: "al-physics", level: "AL", code: "01", mediumCount: 3, alStream: "science" },
  { id: "al-chemistry", level: "AL", code: "02", mediumCount: 3, alStream: "science" },
  { id: "al-biology", level: "AL", code: "09", mediumCount: 3, alStream: "science" },
  { id: "al-ict", level: "AL", code: "20", mediumCount: 3, alStream: "tech" },
  { id: "al-agro", level: "AL", code: "18", mediumCount: 3, alStream: "tech" },
  { id: "al-et", level: "AL", code: "65", mediumCount: 3, alStream: "tech" },
  { id: "al-bst", level: "AL", code: "66", mediumCount: 3, alStream: "tech" },
  { id: "al-sft", level: "AL", code: "67", mediumCount: 3, alStream: "tech" },
  { id: "al-accounting", level: "AL", code: "33", mediumCount: 3, alStream: "art" },
  { id: "al-business", level: "AL", code: "32", mediumCount: 3, alStream: "art" },
  { id: "al-econ", level: "AL", code: "21", mediumCount: 3, alStream: "art" },
];

export const ALL_SUBJECTS: SubjectMeta[] = [...OL_SUBJECTS, ...AL_SUBJECTS];
