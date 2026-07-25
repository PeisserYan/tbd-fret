import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FranceItalieContent from "./FranceItalieContent";

export const metadata: Metadata = {
  title: "Transport France-Italie | TBD Fret depuis 1980",
  description:
    "Spécialiste du transport France-Italie depuis 1980. Flotte de 36 Volvo en propre. Fret complet et groupage, ADR. Basé à Voglans, Savoie. Devis sous 24h.",
  keywords:
    "transport France Italie, fret routier France Italie, transporteur franco-italien, transport routier France Italie, transporteur France Italie, fret France Italie, transport franco-italien, TBD Fret",
  openGraph: {
    title: "Transport France Italie — TBD Fret",
    description:
      "Spécialiste du fret routier franco-italien depuis 1980. 36 ensembles Volvo, passages quotidiens au tunnel du Fréjus. Devis sous 24h.",
    url: "https://tbd-fret.com/france-italie",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://tbd-fret.com/france-italie",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://tbd-fret.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Transport France-Italie",
      "item": "https://tbd-fret.com/france-italie"
    }
  ]
};

export default function FranceItaliePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <FranceItalieContent />
      </main>
      <Footer />
    </>
  );
}
