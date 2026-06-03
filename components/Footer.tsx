"use client";

import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;

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
              <img src="/logo-tbd.png" alt="TBD Logo" style={{ height: "110px", width: "auto" }} />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">
              {t.navigation}
            </p>
            <ul className="flex flex-col gap-2">
              {t.nav_links.map((link) => (
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
              {t.horaires}
            </p>
            <ul className="flex flex-col gap-1.5">
              {t.horaires_data.map(({ jour, heures }) => (
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
              {t.legal}
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
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="text-white/50 hover:text-white/75 text-xs transition-colors duration-200"
            >
              {t.mentions}
            </Link>
            <span className="text-white/40 text-xs">·</span>
            <Link
              href="/politique-de-confidentialite"
              className="text-white/50 hover:text-white/75 text-xs transition-colors duration-200"
            >
              {t.confidentialite}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
