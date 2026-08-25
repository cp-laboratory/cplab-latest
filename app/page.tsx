import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import ResearchAreas from "@/components/home/research-areas";
import Announcements from "@/components/home/announcements";
import ProfessorsSection from "@/components/home/professors-section";
import RecruitmentBanner from "@/components/home/recruitment-banner";
import LatestNews from "@/components/home/latest-news";
import Testimonials from "@/components/home/testimonials";
import FAQSection from "@/components/home/faq-section";
import Newsletter from "@/components/home/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <ResearchAreas />
      <Announcements />
      <ProfessorsSection />
      <RecruitmentBanner />
      <LatestNews />
      <Testimonials />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
