"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import Lightbox from "@/components/Lightbox";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

export default function ExpertiseSection() {
  const { lang } = useLang();
  const t = translations[lang].expertise;
  const cards = t.cards;
  const lightboxImages = cards.map((c, i) => ({ src: `/expertise/Expertise${i + 1}.jpg`, alt: c.title }));
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
                {t.surtitre}
              </span>
              <div className="w-8 h-0.5" style={{ backgroundColor: "var(--color-accent)" }} />
            </div>
            <h2
              className="text-5xl lg:text-6xl"
              style={{ color: "var(--color-text-dark)", fontFamily: "var(--font-bebas-neue)" }}
            >
              {t.titre}
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
                    src={`/expertise/Expertise${i + 1}.jpg`}
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
