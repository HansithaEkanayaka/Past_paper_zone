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

export default function Home() {
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
    </main>
  );
}