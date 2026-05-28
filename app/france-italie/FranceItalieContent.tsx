"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";

const avantages = [
  {
    titre: "Flotte 100% propriétaire",
    detail:
      "36 ensembles Volvo FH 500 I-Save en propre. Aucune sous-traitance : votre marchandise reste sous notre responsabilité de départ à destination.",
  },
  {
    titre: "40 ans sur cette route",
    detail:
      "Depuis 1980, nous empruntons quotidiennement les axes franco-italiens. Tunnel du Fréjus, col du Mont-Blanc, A43 : nous connaissons chaque contrainte.",
  },
  {
    titre: "Géolocalisation en temps réel",
    detail:
      "Système Eliot 100% intégré. Localisation de chaque ensemble à tout moment, optimisation des itinéraires, alertes délais proactives.",
  },
  {
    titre: "Expertise douanière",
    detail:
      "Maîtrise complète des formalités franco-italiennes et des documents de transport (CMR, DAE, ADR). Aucun blocage en frontière.",
  },
  {
    titre: "Chauffeurs bilingues expérimentés",
    detail:
      "Nos chauffeurs connaissent les spécificités italiennes : ZTL, horaires de circulation, règlements locaux. Aucune mauvaise surprise à destination.",
  },
  {
    titre: "Réponse sous 24h",
    detail:
      "Devis personnalisé en moins de 24 heures. Interlocuteur dédié pour chaque expédition. Disponibilité du lundi au samedi.",
  },
];

const services = [
  {
    label: "Charge complète (FTL)",
    description:
      "De 1 palette à 33 palettes, jusqu'à 28 tonnes. Votre camion, votre planning.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="1" y="8" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M19 11h2.5l1.5 3v2H19V11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.5" cy="18.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Groupage franco-italien",
    description:
      "À partir d'une palette. Regroupement optimisé avec des expéditions régulières toute la semaine.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="3" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="2" y="14" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="14" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Transport ADR",
    description:
      "Matières dangereuses classes 2 à 9. Chauffeurs certifiés ADR, véhicules homologués.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 19h20L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 9v5M12 16v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Alimentaire sec",
    description:
      "Transport conforme aux normes HACCP pour produits alimentaires non-réfrigérés.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const franceZone = ["Paris", "Orléans", "Reims", "Troyes", "Dijon", "Lyon", "Grenoble", "Annecy", "Annemasse", "Chambéry", "Valence", "Clermont-Ferrand"];
const italieZone = ["Torino", "Milano", "Piacenza", "Bologna", "Padova", "Venezia", "Firenze", "Ancona", "Genova"];

export default function FranceItalieContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D2E52] via-[#0D2E52]/90 to-[#1B4F8A]/50 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Spécialiste depuis 1980
              </span>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>

            <h1
              className="text-white leading-none mb-6"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "clamp(52px, 8vw, 96px)",
                letterSpacing: "0.02em",
              }}
            >
              TRANSPORT
              <br />
              <span style={{ color: "var(--color-accent)" }}>FRANCE ITALIE</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl">
              Transporteur franco-italien basé en Savoie. 36 ensembles Volvo,
              passages quotidiens par le tunnel du Fréjus, fret complet et
              groupage vers toute l&apos;Italie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#devis"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-sm text-base transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Demander un devis →
              </Link>
              <a
                href="tel:+33479544990"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-sm text-base border border-white/30 hover:border-white/60 transition-all duration-200"
              >
                04 79 54 49 90
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F7FA] to-transparent z-10" />
      </section>

      {/* ─── CHIFFRES CLÉS ─── */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--color-off-white)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { value: "45", unit: "ans", label: "d'expérience France-Italie" },
              { value: "5 000+", unit: "", label: "passages/an au Fréjus" },
              { value: "36", unit: "", label: "ensembles Volvo en propre" },
              { value: "24h", unit: "", label: "délai de réponse devis" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="bg-white rounded-lg p-6 border text-center"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div
                  className="text-4xl lg:text-5xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-bebas-neue)",
                    color: "var(--color-primary)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.value}
                  {stat.unit && (
                    <span className="text-2xl lg:text-3xl ml-1" style={{ color: "var(--color-accent)" }}>
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-primary)" }}
              >
                Fret routier France Italie
              </span>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>
            <h2
              className="text-5xl lg:text-6xl mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                color: "var(--color-text-dark)",
              }}
            >
              NOS PRESTATIONS FRANCO-ITALIENNES
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-muted)" }}>
              Du colis à la pleine charge, en régulier ou à la demande.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {services.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="p-6 rounded-lg border flex flex-col gap-4"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-off-white)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(27,79,138,0.1)",
                    color: "var(--color-primary)",
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <h3
                    className="text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-bebas-neue)",
                      letterSpacing: "0.03em",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {s.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Zone de desserte */}
          <motion.div
            className="mt-16 rounded-lg p-8 border"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-off-white)",
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h3
              className="text-2xl mb-8 text-center"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.03em",
                color: "var(--color-text-dark)",
              }}
            >
              ZONE DE DESSERTE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🇫🇷</span>
                  <span className="font-semibold" style={{ color: "var(--color-text-dark)" }}>
                    France
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    — Île-de-France et Grand Est
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {franceZone.map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1 text-sm rounded-full border"
                      style={{
                        borderColor: "var(--color-border)",
                        color: "var(--color-text-muted)",
                        backgroundColor: "white",
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🇮🇹</span>
                  <span className="font-semibold" style={{ color: "var(--color-text-dark)" }}>
                    Italie
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    — Nord et Centre
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {italieZone.map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1 text-sm rounded-full border"
                      style={{
                        borderColor: "rgba(0,191,255,0.4)",
                        color: "var(--color-primary)",
                        backgroundColor: "rgba(0,191,255,0.06)",
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── POURQUOI TBD ─── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Transporteur Franco-Italien
              </span>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>
            <h2
              className="text-5xl lg:text-6xl text-white mb-4"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              POURQUOI CHOISIR TBD
              <br />
              POUR CETTE ROUTE ?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Le transport France-Italie est notre cœur de métier depuis 45 ans.
              Pas une activité parmi d&apos;autres.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {avantages.map((a) => (
              <motion.div
                key={a.titre}
                variants={fadeInUp}
                className="rounded-lg p-6 border border-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <h3
                  className="text-xl text-white mb-3"
                  style={{
                    fontFamily: "var(--font-bebas-neue)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {a.titre}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {a.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA DEVIS ─── */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                Réponse sous 24h
              </span>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>

            <h2
              className="text-5xl lg:text-6xl text-white mb-6"
              style={{ fontFamily: "var(--font-bebas-neue)" }}
            >
              OBTENEZ VOTRE DEVIS
              <br />
              FRANCO-ITALIEN
            </h2>

            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Indiquez-nous votre expédition : type de marchandise, poids, villes
              de départ et d&apos;arrivée. Daniel vous répond personnellement sous 24h.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#devis"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 font-semibold text-white rounded-sm text-base transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Remplir le formulaire devis →
              </Link>
              <a
                href="tel:+33479544990"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 font-semibold text-white rounded-sm text-base border border-white/30 hover:border-white/60 transition-all duration-200"
              >
                04 79 54 49 90
              </a>
            </div>

            <p className="mt-8 text-white/40 text-sm">
              Lun–Ven 8h–18h · Sam 6h30–15h
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
