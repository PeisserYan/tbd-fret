import Link from "next/link";

const quickLinks = [
  { label: "L'entreprise", href: "/#expertise" },
  { label: "Prestations", href: "/#prestations" },
  { label: "Devis", href: "/#devis" },
  { label: "Recrutement", href: "/recrutement" },
];

const horaires = [
  { jour: "Lundi", heures: "08:00–12:30 / 14:00–18:00" },
  { jour: "Mardi", heures: "08:00–12:30 / 14:00–18:00" },
  { jour: "Mercredi", heures: "08:00–12:30 / 14:00–18:00" },
  { jour: "Jeudi", heures: "08:00–12:30 / 14:00–18:00" },
  { jour: "Vendredi", heures: "08:00–12:30 / 14:00–18:00" },
  { jour: "Samedi", heures: "06:30–15:00" },
  { jour: "Dimanche", heures: "Fermé" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-footer-bg)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo + description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img src="/logo-tbd.png" alt="TBD Logo" style={{ height: "150px", width: "auto" }} />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Spécialiste du transport routier de fret France-Italie depuis 1980.
              Basé à Voglans, Savoie.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div className="pr-4 lg:pr-16">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Horaires d&apos;ouverture
            </p>
            <ul className="flex flex-col gap-1.5">
              {horaires.map(({ jour, heures }) => (
                <li key={jour} className="flex justify-between gap-2 text-xs">
                  <span className="text-white/70 shrink-0">{jour}</span>
                  <span className="text-white/75 text-right">{heures}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
              Informations légales
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-white/60 text-sm">
                  SIRET : 320 029 887 00041
                </span>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/TBD+Transports+Bogeat+Daniel/@45.6236458,5.8929696,16z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/85 text-sm transition-colors duration-200"
                >
                  241 rue des Bouvards, 73420 Voglans
                </a>
              </li>
              <li>
                <a
                  href="tel:+33479544990"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  04 79 54 49 90
                </a>
              </li>
              <li>
                <a
                  href="mailto:tbd@tbd-fret.com"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  tbd@tbd-fret.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/50 text-xs">
            © 2026 TBD – Transports Bogeat Daniel. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="text-white/50 hover:text-white/75 text-xs transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <span className="text-white/40 text-xs">·</span>
            <Link
              href="/politique-de-confidentialite"
              className="text-white/50 hover:text-white/75 text-xs transition-colors duration-200"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
