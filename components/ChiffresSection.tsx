"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/variants";

function useCounter(target: number, duration = 1800, active: boolean) {
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

function StatCard({
  value,
  numericValue,
  suffix,
  label,
  active,
  isPlaceholder,
}: {
  value?: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  active: boolean;
  isPlaceholder?: boolean;
}) {
  const count = useCounter(numericValue ?? 0, 1800, active && !isPlaceholder);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center text-center px-4 py-8"
    >
      <div
        className="text-5xl lg:text-6xl font-bold mb-3"
        style={{
          fontFamily: "var(--font-bebas-neue)",
          letterSpacing: "0.02em",
          color: "var(--color-primary)",
        }}
      >
        {isPlaceholder ? (
          <span className="opacity-40">{value}</span>
        ) : (
          <>
            {count.toLocaleString("fr-FR")}
            {suffix}
          </>
        )}
      </div>
      <div
        className="text-sm font-semibold uppercase tracking-widest"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </div>
      {isPlaceholder && (
        <div className="mt-1 text-xs text-orange-400 opacity-70">À confirmer</div>
      )}
    </motion.div>
  );
}

// TODO: mettre à jour avec données 2025 fournies par Daniel
const stats = [
  {
    value: "X XXX XXX €",
    label: "CA annuel",
    isPlaceholder: true,
  },
  {
    numericValue: 36,
    suffix: "",
    label: "Ensembles Volvo actifs",
    isPlaceholder: false,
  },
  {
    value: "X XXX XXX km",
    label: "Km parcourus / an",
    isPlaceholder: true,
  },
  {
    numericValue: 4300,
    suffix: "",
    label: "Passages aux tunnels transalpins",
    isPlaceholder: false,
  },
  {
    value: "XX",
    label: "Collaborateurs",
    isPlaceholder: true,
  },
];

export default function ChiffresSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="chiffres"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
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
              style={{ color: "var(--color-primary)" }}
            >
              En quelques chiffres
            </span>
            <div
              className="w-8 h-0.5"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </div>
          <h2
            className="text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              color: "var(--color-text-dark)",
            }}
          >
            TBD EN CHIFFRES
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y md:divide-y-0"
          style={{ borderColor: "var(--color-border)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={stat.label}
              active={inView}
              isPlaceholder={stat.isPlaceholder}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
