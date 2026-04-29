import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import PrestationsSection from "@/components/PrestationsSection";
import ChiffresSection from "@/components/ChiffresSection";
import EngagementSection from "@/components/EngagementSection";
import DevisSection from "@/components/DevisSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ExpertiseSection />
        <PrestationsSection />
        <ChiffresSection />
        <EngagementSection />
        <DevisSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
