import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import PrestationsSection from "@/components/PrestationsSection";
import ChiffresSection from "@/components/ChiffresSection";
import EngagementSection from "@/components/EngagementSection";
import DevisSection from "@/components/DevisSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TBD – Transporteur France-Italie | Voglans, Savoie",
  description:
    "Transporteur routier spécialisé France-Italie depuis 1980. Flotte de 36 Volvo en propre. Fret complet et groupage. Basé à Voglans (73). Devis sous 24h.",
  alternates: {
    canonical: "https://tbd-fret.com/",
  },
  openGraph: {
    title: "TBD – Transporteur France-Italie depuis 1980",
    description:
      "Spécialiste du fret routier France-Italie. 36 Volvo en propre. Basé à Voglans, Savoie.",
    url: "https://tbd-fret.com/",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
};

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
