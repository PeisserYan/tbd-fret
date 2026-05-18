"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";

const engagements = [
  "Flotte 100% Volvo I-Save 500 Euro 6 — camions à conduite prédictive",
  "Vitesse bridée à 82 km/h — réduction de 10% de la consommation",
  "Pneumatiques 100% Michelin X Line Energy — recreusage + 2 rechapage et permutation systématique",
  "Géolocalisation 100% Eliot — optimisation des itinéraires en temps réel",
  "Formation éco-conduite pour tous les chauffeurs",
];

export default function EngagementSection() {
  return (
    <section
      id="engagement"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — big stat */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div
              className="font-bold leading-none mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "clamp(80px, 12vw, 140px)",
                color: "var(--color-accent)",
                letterSpacing: "0.02em",
              }}
            >
              -20%
            </div>
            <div
              className="text-2xl lg:text-3xl text-white font-bold mb-4 uppercase"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.02em",
              }}
            >
              DE REJETS DE GAZ À EFFET DE SERRE
            </div>
            <p className="text-white/60 text-base leading-relaxed">
              comparé à un camion standard de référence
            </p>
          </motion.div>

          {/* Right — checklist */}
          <motion.ul
            className="flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {engagements.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: "rgba(0,191,255,0.2)" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="#00BFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-white/80 text-sm leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
