import Link from "next/link";

const quickLinks = [
  { label: "L'entreprise", href: "/#expertise" },
  { label: "Prestations", href: "/#prestations" },
  { label: "Devis", href: "/#devis" },
  { label: "Recrutement", href: "/recrutement" },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo + description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img src="/logo-tbd.png" alt="TBD Logo" style={{ height: "48px", width: "auto" }} />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Spécialiste du transport routier de fret France-Italie depuis 1980.
              Basé à Voglans, Savoie.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
              Informations légales
            </p>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-white/40 text-sm">
                  SIRET : à compléter
                </span>
              </li>
              <li>
                <span className="text-white/40 text-sm">
                  241 rue des Bouvards, 73420 Voglans
                </span>
              </li>
              <li>
                <a
                  href="tel:+33479544990"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  04 79 54 49 90
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-white/30 text-xs">
            © 2026 TBD – Transports Bogeat Daniel. Tous droits réservés.
          </p>
          <p className="text-white/20 text-xs">
            Site réalisé pour un usage professionnel B2B
          </p>
        </div>
      </div>
    </footer>
  );
}
