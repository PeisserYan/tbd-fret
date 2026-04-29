"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";

const cards = [
  {
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <rect x="6" y="10" width="16" height="22" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="26" y="14" width="16" height="18" rx="2" fill="currentColor" opacity="0.4" />
        <path d="M14 32 L34 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
        <circle cx="14" cy="32" r="3" fill="currentColor" />
        <circle cx="34" cy="20" r="3" fill="currentColor" />
      </svg>
    ),
    title: "44 ans sur la même route",
    text: "Depuis 1980, nous faisons exclusivement la liaison France-Italie. Nous connaissons chaque tunnel, chaque réglementation, chaque partenaire de quai.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <rect x="4" y="22" width="28" height="14" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="10" y="16" width="16" height="10" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="32" y="26" width="12" height="10" rx="2" fill="currentColor" opacity="0.4" />
        <circle cx="12" cy="36" r="4" fill="currentColor" />
        <circle cx="36" cy="36" r="4" fill="currentColor" />
        <circle cx="12" cy="36" r="2" fill="white" />
        <circle cx="36" cy="36" r="2" fill="white" />
      </svg>
    ),
    title: "100% flotte propre",
    text: "Aucun sous-traitant. Tous nos transports sont effectués avec nos 36 ensembles Volvo FH 500. Vous savez toujours qui conduit votre marchandise.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="8" cy="12" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="12" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="8" cy="36" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="40" cy="36" r="3" fill="currentColor" opacity="0.6" />
        <line x1="24" y1="24" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="40" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="8" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="40" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
    title: "Chargement optimisé",
    text: "Notre plateforme de 1 000 m² à Chambéry permet le groupage et le crossdocking. Seulement 8% de km à vide — la norme est à 10%.",
  },
];

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-off-white)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-primary)" }}
            >
              Pourquoi TBD
            </span>
            <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <h2
            className="text-5xl lg:text-6xl"
            style={{ color: "var(--color-text-dark)", fontFamily: "var(--font-bebas-neue)" }}
          >
            NOTRE EXPERTISE
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(27,79,138,0.15)" }}
              className="bg-white rounded-lg p-8 border transition-all duration-300 cursor-default"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div
                className="mb-5"
                style={{ color: "var(--color-primary)" }}
              >
                {card.icon}
              </div>
              <h3
                className="text-2xl mb-3"
                style={{
                  color: "var(--color-text-dark)",
                  fontFamily: "var(--font-bebas-neue)",
                  letterSpacing: "0.02em",
                }}
              >
                {card.title}
              </h3>
              <p
                className="leading-relaxed text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
