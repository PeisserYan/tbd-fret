import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tbd-fret.com"),
  title: "TBD – Transport Bogeat Daniel | Spécialiste France-Italie",
  description:
    "Transporteur routier spécialisé France-Italie depuis 1980. 36 ensembles Volvo. Fret complet et groupage. Basé à Voglans, Savoie. Demandez un devis.",
  keywords:
    "transport France Italie, fret routier, transporteur Savoie, groupage France Italie, TBD Voglans",
  alternates: {
    canonical: "https://tbd-fret.com/",
  },
  openGraph: {
    title: "TBD – Transport Bogeat Daniel",
    description: "Spécialiste du fret routier France-Italie depuis 1980.",
    url: "https://tbd-fret.com",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Transports Bogeat Daniel",
  "alternateName": "TBD Fret",
  "url": "https://tbd-fret.com",
  "logo": "https://tbd-fret.com/logo-tbd.png",
  "image": "https://tbd-fret.com/camion-tbd.jpg",
  "telephone": "+33479544990",
  "email": "tbd@tbd-fret.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "241 rue des Bouvards",
    "addressLocality": "Voglans",
    "postalCode": "73420",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.6236,
    "longitude": 5.8930
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "06:30",
      "closes": "15:00"
    }
  ],
  "description": "Transporteur routier spécialisé France-Italie depuis 1980. 36 ensembles Volvo FH 500. Basé à Voglans, Savoie.",
  "foundingDate": "1980",
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
