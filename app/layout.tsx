import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";

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
  title: "TBD – Transport Bogeat Daniel | Spécialiste France-Italie",
  description:
    "Transporteur routier spécialisé France-Italie depuis 1980. 36 ensembles Volvo. Fret complet et groupage. Basé à Voglans, Savoie. Demandez un devis.",
  keywords:
    "transport France Italie, fret routier, transporteur Savoie, groupage France Italie, TBD Voglans",
  openGraph: {
    title: "TBD – Transport Bogeat Daniel",
    description: "Spécialiste du fret routier France-Italie depuis 1980.",
    url: "https://tbd-fret.com",
    siteName: "TBD Fret",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
