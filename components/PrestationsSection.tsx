"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

function useCounter(target: number, duration = 1500, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function CapaciteCard({
  value,
  label,
  tooltip,
  active,
}: {
  value: string;
  label: string;
  tooltip: string;
  active: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const visible = isHovered || isOpen;

  return (
    <motion.div
      variants={fadeInUp}
      className="relative flex flex-col items-center text-center p-8 rounded-lg border border-white/10 cursor-pointer overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsOpen(false); }}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div
        className="text-3xl lg:text-4xl font-bold mb-2"
        style={{
          color: "var(--color-accent)",
          fontFamily: "var(--font-bebas-neue)",
          letterSpacing: "0.02em",
        }}
      >
        {active ? value : "—"}
      </div>
      <div className="text-white/60 text-sm font-medium uppercase tracking-wide">
        {label}
      </div>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center p-6 rounded-lg"
            style={{ backgroundColor: "rgba(13, 46, 82, 0.95)" }}
          >
            <p className="text-white/90 text-sm leading-relaxed">
              {tooltip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const franceVilles = [
  "Orléans",
  "Paris",
  "Reims",
  "Troyes",
  "Dijon",
  "Clermont-Ferrand",
  "St-Étienne",
  "Valence",
  "Lyon",
  "Grenoble",
  "Annecy",
  "Annemasse",
];

const italieVilles = [
  "Torino",
  "Milano",
  "Piacenza",
  "Padova",
  "Bologna",
  "Firenze",
  "Ancona",
];

export default function PrestationsSection() {
  const { lang } = useLang();
  const t = translations[lang].prestations;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="prestations"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="w-8 h-0.5"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            <span
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              {t.surtitre}
            </span>
            <div
              className="w-8 h-0.5"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </div>
          <h2
            className="text-5xl lg:text-6xl text-white mb-4"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            {t.titre}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.sous_titre}
          </p>
        </motion.div>

        {/* Capacités grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <CapaciteCard value={t.capacites[0].value} label={t.capacites[0].label} tooltip={t.capacites[0].tooltip} active={inView} />
          <CapaciteCard value={t.capacites[1].value} label={t.capacites[1].label} tooltip={t.capacites[1].tooltip} active={inView} />
          <CapaciteCard value={t.capacites[2].value} label={t.capacites[2].label} tooltip={t.capacites[2].tooltip} active={inView} />
          <CapaciteCard value={t.capacites[3].value} label={t.capacites[3].label} tooltip={t.capacites[3].tooltip} active={inView} />
        </motion.div>

        {/* Marchandises */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h3
            className="text-2xl text-white mb-6 text-center"
            style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.02em" }}
          >
            {t.marchandises_titre}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {t.marchandises.map((m, i) => (
              <span key={m}>
                <span className="text-white font-medium text-sm">{m}</span>
                {i < t.marchandises.length - 1 && (
                  <span
                    className="ml-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Zone de desserte */}
        <motion.div
          className="rounded-lg p-8 border border-white/10"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h3
            className="text-2xl text-white mb-8 text-center"
            style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.02em" }}
          >
            {t.desserte_titre}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-white font-semibold">{t.france_label}</span>
                <span className="text-white/40 text-sm">{t.france_sub}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {franceVilles.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 text-sm rounded-full text-white/80 border border-white/20"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🇮🇹</span>
                <span className="text-white font-semibold">{t.italie_label}</span>
                <span className="text-white/40 text-sm">{t.italie_sub}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {italieVilles.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 text-sm rounded-full text-white/80 border border-white/20"
                    style={{ borderColor: "rgba(0,191,255,0.3)" }}
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
  );
}
