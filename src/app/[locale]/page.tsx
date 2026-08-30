import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ExamCountdown from "@/components/ExamCountdown";
import ExamTimetable from "@/components/ExamTimetable";
import TrendingPapers from "@/components/TrendingPapers";
import SubjectCard from "@/components/SubjectCard";
import StudyTipCard from "@/components/StudyTIpCard";
import PomodoroTimer from "@/components/PomodoroTimer";
import About from "@/components/About";
import FeedbackForm from "@/components/FeedbackForm";
import Footer from "@/components/Footer";
import SocialChannelButtons from "@/components/SocialChannelButtons";

const siteUrl = "https://pastpaperzone.lk";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Past Paper Zone",
    alternateName: [
      "PastPaperZone",
      "Past Paper Zone Sri Lanka",
      "pastpaperzone.lk",
    ],
    description:
      "Free G.C.E. O/L and A/L past papers and marking schemes for Sri Lankan students.",
    inLanguage: ["en", "si", "ta"],
  };

  return (
    <main>
      <Header />

      <Hero />

      <ExamTimetable />

      <ExamCountdown />

      <TrendingPapers />

      <SubjectCard />

      <StudyTipCard />

      <PomodoroTimer />

      <About />

      <FeedbackForm />

      <Footer />

      <SocialChannelButtons />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </main>
  );
}