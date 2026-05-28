import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranceItalieContent from "./FranceItalieContent";

export const metadata: Metadata = {
  title: "Transport France Italie — TBD Fret | Transporteur Franco-Italien depuis 1980",
  description:
    "Spécialiste du transport routier France Italie depuis 1980. Fret routier franco-italien avec notre propre flotte de 36 ensembles Volvo. Charges complètes, groupage, ADR. Devis sous 24h.",
  keywords:
    "transport France Italie, fret routier France Italie, transporteur franco-italien, transport routier France Italie, transporteur France Italie, fret France Italie, transport franco-italien, TBD Fret",
  openGraph: {
    title: "Transport France Italie — TBD Fret",
    description:
      "Spécialiste du fret routier franco-italien depuis 1980. 36 ensembles Volvo, passages quotidiens au tunnel du Fréjus. Devis sous 24h.",
    url: "https://www.tbd-fret.com/france-italie",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tbd-fret.com/france-italie",
  },
};

export default function FranceItaliePage() {
  return (
    <>
      <Navbar />
      <main>
        <FranceItalieContent />
      </main>
      <Footer />
    </>
  );
}
