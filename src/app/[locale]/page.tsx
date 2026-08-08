

    //   {/* Subjects */}
    //   <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
    //     <SectionHeading
    //       eyebrow="EXAM PAPERS"
    //       title="G.C.E. Ordinary Level (O/L) & Advanced Level (A/L)"
    //     />
    //   </section>


import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
      <SubjectCard />
      <StudyTipCard />
      <PomodoroTimer />
      <About />
      <FeedbackForm />
      <Footer />
    </main>
  );
}
























// import Link from "next/link";
// import HeroLocaleText from "@/components/HeroLocaleText";
// import SectionHeading from "@/components/SectionHeading";
// import SubjectCard from "@/components/SubjectCard";
// import StudyTipCard from "@/components/StudyTipCard";
// import QuickFeedbackForm from "@/components/QuickFeedbackForm";
// import { subjects, studyTips, getYears, mediums } from "@/lib/data";


// export default function Home() {
//   const previewSubjects = subjects.slice(0, 10);
//   const totalPapers = subjects.reduce(
//     (sum, s) => sum + s.mediums.length * getYears(s).length,
//     0
//   );


//   return (
//     <>
//       {/* Hero */}
//       {/* Subjects */}
//       <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
//         <SectionHeading
//           eyebrow="EXAM PAPERS"
//           title="Select The Subject"
//         />

//         <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//           {previewSubjects.map((s) => (
//             <SubjectCard key={s.slug} subject={s} />
//           ))}
//         </div>

//         <div className="mt-10 flex justify-center">
//           <Link
//             href="/subject"
//             className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-paper hover:bg-maroon-dark transition-colors"
//           >
//             View all subjects
//             <span aria-hidden="true">→</span>
//           </Link>
//         </div>
//       </section>

//       {/* Study tips */}    
//       <section className="border-y border-line bg-paper-raised/60">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
//           <SectionHeading eyebrow="STUDY SMART" title="Top Study Tips" />
//           <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {studyTips.map((tip, i) => (
//               <StudyTipCard key={tip.title} index={i + 1} title={tip.title} body={tip.body} />
//             ))}
//           </div>
//         </div>
//       </section>
      
//       {/* About */}
//       <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
//         <SectionHeading eyebrow="WHO WE ARE" title="About Paperbank" />
//         <div className="mt-12 grid sm:grid-cols-2 gap-5">
//           <AboutCard
//             title="Our mission"
//             body="Every student should be able to practise with the real exam format, in the medium they were taught in, without paying for it or hunting across a dozen sites."
//           />
//           <AboutCard
//             title="What we offer"
//             body="Question papers and marking schemes for every subject on the syllabus, sorted by medium and year, downloadable as clean PDFs."
//           />
//           <AboutCard
//             title="Content policy"
//             body="Papers are sourced from publicly released exam material. If something's mislabelled or missing, tell us on the feedback page and we'll correct it."
//           />
//           <AboutCard
//             title="How we stay free"
//             body="Paperbank is run as a volunteer project with light, non-intrusive support from readers. No paywalls, no locked papers."
//           />
//         </div>
//       </section>

//       {/* Feedback */}
//       <section id="feedback" className="border-t border-line bg-paper-raised/60">
//         <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
//           <SectionHeading
//             eyebrow="Tell us"
//             title="Feedback"
//             body="Found a missing paper, a wrong scan, or something confusing? Let us know and we'll fix it."
//           />
//           <div className="mt-10">
//             <QuickFeedbackForm />
//           </div>
//         </div>
//       </section>
//     </>  
//   );
// }

// function AboutCard({ title, body }: { title: string; body: string }) {
//   return (
//     <div className="rounded-md border border-line bg-paper-raised p-6">
//       <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
//       <p className="mt-2 text-sm text-ink-soft leading-relaxed">{body}</p>
//     </div>
//   );
// }