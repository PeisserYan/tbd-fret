import type { Metadata } from "next";
import RecrutementClient from "./RecrutementClient";

export const metadata: Metadata = {
  title: "Recrutement Chauffeur SPL — TBD Fret, Voglans (73)",
  description:
    "TBD recrute des chauffeurs SPL grand routier pour la liaison France-Italie. Basé à Voglans, Savoie. Postulez en ligne ou appelez le 04 79 54 49 90.",
  alternates: {
    canonical: "https://tbd-fret.com/recrutement",
  },
  openGraph: {
    title: "Recrutement Chauffeur SPL — TBD Fret",
    description:
      "TBD recrute des chauffeurs SPL pour la France-Italie. Poste basé à Voglans, Savoie.",
    url: "https://tbd-fret.com/recrutement",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
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
      "name": "Recrutement",
      "item": "https://tbd-fret.com/recrutement"
    }
  ]
};

export default function RecrutementPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RecrutementClient />
    </>
  );
}
