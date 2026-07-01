import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TurinContent from "./TurinContent";

export const metadata: Metadata = {
  title: "Transport Savoie–Turin | TBD Fret, transporteur France-Italie",
  description:
    "Transport routier Savoie-Turin depuis Voglans. Transporteur Chambéry-Turin : marchandises générales, ADR, alimentaire sec, produits industriels. Devis rapide.",
  keywords:
    "transport Savoie Turin, transport routier Chambéry Turin, transporteur Voglans Italie, fret Piémont France, transport Savoie Turin ADR",
  openGraph: {
    title: "Transport Savoie–Turin | TBD Fret",
    description:
      "Transporteur routier Savoie-Turin depuis Voglans, vers Turin et le Piémont. Marchandises générales, ADR, alimentaire sec, produits industriels.",
    url: "https://tbd-fret.com/transport-turin",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://tbd-fret.com/transport-turin",
  },
};

export default function TransportTurinPage() {
  return (
    <>
      <Navbar />
      <main>
        <TurinContent />
      </main>
      <Footer />
    </>
  );
}
