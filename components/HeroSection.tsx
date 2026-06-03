"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function heroItem(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  };
}

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const { scrollY } = useScroll();
  const truckX = useTransform(scrollY, [0, 600], [0, -1000]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      {/* Gradient bleu → transparent, fond à transparent exactement à 50% */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #0D2E52 0%, #0D2E52 30%, transparent 50%)",
        }}
      />

      {/* Camion — démarre exactement à 50%, z-0 */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full z-0 pointer-events-none"
        style={{ x: truckX }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
        >
          <img
            src="/camion-tbd.jpg"
            alt="Volvo FH 500 TBD Fret"
            className="absolute inset-0 w-full h-full object-cover object-left-top"
          />
          {/* Fondus sur les 4 bords */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t  from-[#0D2E52] to-transparent" />
          <div className="absolute top-0    left-0 right-0 h-32 bg-gradient-to-b  from-[#0D2E52] to-transparent" />
          <div className="absolute left-0  top-0 bottom-0 w-24 bg-gradient-to-r  from-[#0D2E52] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l  from-[#0D2E52] to-transparent" />
        </motion.div>
      </motion.div>

      {/* Texte — centré dans la moitié gauche */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 z-20 flex items-center justify-center py-32 md:py-0 px-8 lg:px-12">
        <div className="w-full max-w-md">
          {/* Tag */}
          <motion.div
            {...heroItem(0.2)}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              {t.tag}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...heroItem(0.35)}
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              fontSize: "clamp(56px, 9vw, 96px)",
              letterSpacing: "0.02em",
            }}
          >
            {t.h1_line1}
            <br />{t.h1_line2}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            {...heroItem(0.5)}
            className="text-white/75 text-lg leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...heroItem(0.65)}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-sm text-base transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {t.cta_devis}
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById("expertise");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white rounded-sm text-base border border-white/30 hover:border-white/60 transition-all duration-200"
            >
              {t.cta_decouvrir}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Gradient bas de section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D2E52] to-transparent z-20" />
    </section>
  );
}
