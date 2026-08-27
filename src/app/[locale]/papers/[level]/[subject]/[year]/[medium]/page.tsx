import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaperDetailClient from "@/components/PaperDetailClient";

const mediums = new Set(["sinhala", "english", "tamil"]);
const levels = new Set(["ol", "al"]);

type Params = {
  locale: string;
  level: string;
  subject: string;
  year: string;
  medium: string;
};

async function getPageData(params: Params) {
  if (!levels.has(params.level) || !mediums.has(params.medium) || !/^20\d{2}$/.test(params.year)) {
    return null;
  }

  const t = await getTranslations({ locale: params.locale, namespace: "SubjectCard" });

  let subjectName: string;
  try {
    subjectName = t(`subjects.${params.subject}`);
  } catch {
    return null;
  }

  return { ...params, subjectName };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const data = await getPageData(await params);
  if (!data) return {};

  const mediumName = data.medium === "sinhala"
    ? "Sinhala Medium"
    : data.medium === "tamil"
    ? "Tamil Medium"
    : "English Medium";

  const title = `${data.year} ${data.subjectName} Past Paper ${mediumName} | PastPaperZone`;
  const description = `Download and preview the ${data.year} ${data.subjectName} past paper in ${mediumName}. Find the marking scheme and save the paper for later on PastPaperZone.`;
  const url = `https://pastpaperzone.lk/${data.locale}/papers/${data.level}/${data.subject}/${data.year}/${data.medium}`;

  return {
    title,
    description,
    keywords: [
      `${data.year} ${data.subjectName} past paper`,
      `${data.year} ${data.subjectName} ${mediumName}`,
      `${data.subjectName} marking scheme`,
      "Sri Lanka past papers",
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "PastPaperZone",
    },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const data = await getPageData(await params);
  if (!data) notFound();

  const url = `https://pastpaperzone.lk/${data.locale}/papers/${data.level}/${data.subject}/${data.year}/${data.medium}`;
  const mediumName = data.medium === "sinhala"
    ? "Sinhala Medium"
    : data.medium === "tamil"
    ? "Tamil Medium"
    : "English Medium";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${data.year} ${data.subjectName} Past Paper ${mediumName}`,
    description: `Sri Lankan ${data.year} ${data.subjectName} past paper in ${mediumName}.`,
    educationalLevel: data.level.toUpperCase(),
    learningResourceType: "Exam paper",
    inLanguage: data.medium === "sinhala" ? "si" : data.medium === "tamil" ? "ta" : "en",
    url,
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "PastPaperZone",
      url: "https://pastpaperzone.lk",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#171923]">
      <Header />
      <main className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="mb-6">
          <Link href="/#subjects-section"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-bold text-[#1A365D] hover:border-[#DD6B20] hover:text-[#DD6B20] transition-all"
          >
          <span>←</span>
          <span>Back to all subjects</span>
          </Link>
        </div>

        <nav className="text-sm mb-8 opacity-70" aria-label="Breadcrumb">
          <a href={`/${data.locale}`}>Home</a>
          <span className="mx-2">/</span>
          <a href={`/${data.locale}/subject/${data.subject}`}>{data.subjectName}</a>
          <span className="mx-2">/</span>
          <span>{data.year}</span>
        </nav>

        <PaperDetailClient
          subjectId={data.subject}
          subjectName={data.subjectName}
          level={data.level as "ol" | "al"}
          year={data.year}
          medium={data.medium as "sinhala" | "english" | "tamil"}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </div>
  );
}
