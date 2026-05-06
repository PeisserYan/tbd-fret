"use client";

import { motion } from "framer-motion";
import { Route, Truck, Warehouse } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/variants";

const cards = [
  {
    icon: <Route className="w-10 h-10" aria-hidden="true" />,
    title: "46 ans sur la même route",
    text: "Depuis 1980, nous transportons des marchandises entre la France et l'Italie à l'aller et au retour. Nous sommes à proximité des tunnels du Mont-Blanc et du Fréjus, où nous sommes abonnés.",
  },
  {
    icon: <Truck className="w-10 h-10" aria-hidden="true" />,
    title: "100% flotte en propriété",
    text: "Tous nos transports sont effectués avec nos 36 ensembles Volvo FH 500, 40 semi-remorques Krone Taut Liner et 37 chauffeurs grand routiers.",
  },
  {
    icon: <Warehouse className="w-10 h-10" aria-hidden="true" />,
    title: "Chargement optimisé",
    text: "Notre plateforme de 1 000 m² à Chambéry permet le groupage et le dégroupage (crossdocking). Seulement 8% de km à vide — la norme est à 10%.",
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
              className="bg-white rounded-lg p-8 border cursor-default hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: "var(--color-border)",
                transition: "box-shadow 0.15s ease, transform 0.15s ease",
              }}
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
