"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import Lightbox from "@/components/Lightbox";

const cards = [
  {
    image: "/expertise/Expertise1.jpg",
    title: "46 ans sur la même route",
    text: "Depuis 1980, nous transportons des marchandises entre la France et l'Italie à l'aller et au retour. Nous sommes à proximité des tunnels du Mont-Blanc et du Fréjus, où nous sommes abonnés.",
  },
  {
    image: "/expertise/Expertise2.jpg",
    title: "100% flotte en propriété",
    text: "Tous nos transports sont effectués avec nos 36 ensembles Volvo FH 500, 40 semi-remorques Krone Taut Liner et 37 chauffeurs grand routiers.",
  },
  {
    image: "/expertise/Expertise3.jpg",
    title: "Chargement optimisé",
    text: "Notre plateforme de 1 000 m² à Chambéry permet le groupage et le dégroupage (crossdocking). Seulement 8% de km à vide — la norme est à 10%.",
  },
];

const lightboxImages = cards.map((c) => ({ src: c.image, alt: c.title }));

export default function ExpertiseSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
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
            <div className="inline-flex items-center gap-2 mb-4">
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
                className="bg-white rounded-lg border overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: "var(--color-border)",
                  transition: "box-shadow 0.15s ease, transform 0.15s ease",
                }}
              >
                {/* Photo cliquable */}
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative block w-full h-[200px] overflow-hidden cursor-zoom-in group"
                  aria-label={`Voir ${card.title} en grand`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </button>

                {/* Texte */}
                <div className="p-8">
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
