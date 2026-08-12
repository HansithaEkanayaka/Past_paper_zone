"use client";

import { useEffect, useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useTranslations } from "next-intl";

type SavedPaper = {
  id: number;
  subject_id: string;
  year: string;
  medium: string;
  doc_type: string;
};

export default function SavedPapers() {
  const { isDarkMode } = useTheme();
  const t = useTranslations("SubjectCard");
  const [papers, setPapers] = useState<SavedPaper[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/saved-papers", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPapers(data.papers || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (paper: SavedPaper) => {
    const res = await fetch("/api/saved-papers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectId: paper.subject_id,
        year: paper.year,
        medium: paper.medium,
        docType: paper.doc_type,
      }),
    });
    if (res.ok) setPapers((current) => current.filter((item) => item.id !== paper.id));
  };

  const subjectName = (id: string) => {
    try { return t(`subjects.${id}`); } catch { return id; }
  };

  if (loading) return <p className="text-sm opacity-70">Loading saved papers...</p>;

  return (
    <section className={`mt-8 rounded-2xl border p-6 ${isDarkMode ? "bg-[#2D3748] border-gray-700" : "bg-white border-gray-200"}`}>
      <div className="flex items-center gap-2 mb-5">
        <Bookmark size={19} className="text-[#DD6B20]" />
        <div>
          <h2 className="text-xl font-extrabold">Saved Papers</h2>
          <p className="text-sm opacity-70">Your bookmarked papers in one place.</p>
        </div>
      </div>

      {!papers.length ? (
        <div className="text-sm opacity-70 py-6 text-center">You have not saved any papers yet.</div>
      ) : (
        <div className="grid gap-3">
          {papers.map((paper) => {
            const level = paper.subject_id.startsWith("al") ? "al" : "ol";
            return (
              <div key={paper.id} className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <Link href={`/papers/${level}/${paper.subject_id}/${paper.year}/${paper.medium}`} className="min-w-0 hover:text-[#DD6B20]">
                  <strong className="block truncate">{subjectName(paper.subject_id)}</strong>
                  <span className="text-xs opacity-70">{paper.year} • {paper.medium} • {paper.doc_type}</span>
                </Link>
                <button onClick={() => remove(paper)} className="shrink-0 p-2 rounded-lg hover:bg-red-500/10 text-red-500" title="Remove saved paper">
                  <Trash2 size={17} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
