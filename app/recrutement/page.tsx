"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/variants";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

type FormData = {
  nom: string;
  email: string;
  telephone: string;
  poste: string;
  message: string;
};

const initialForm: FormData = {
  nom: "",
  email: "",
  telephone: "",
  poste: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function RecrutementPage() {
  const { lang } = useLang();
  const t = translations[lang].recrutement;

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const newErrors: Partial<FormData> = {};
    if (!form.nom.trim()) newErrors.nom = t.requis;
    if (!form.email.trim()) newErrors.email = t.requis;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t.email_invalide;
    if (!form.poste) newErrors.poste = t.poste_requis;
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-sm border text-sm transition-all duration-200 outline-none focus:ring-2 bg-white";
  const inputStyle = {
    borderColor: "var(--color-border)",
    color: "var(--color-text-dark)",
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero réduit */}
        <section
          className="relative flex items-center justify-center"
          style={{
            minHeight: "50vh",
            backgroundColor: "var(--color-primary-dark)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D2E52]/60" />
          <div className="relative z-10 text-center px-4 py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  {t.tag}
                </span>
                <div
                  className="w-8 h-0.5"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </div>
              <h1
                className="text-white mb-4"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  fontSize: "clamp(48px, 8vw, 80px)",
                  letterSpacing: "0.02em",
                }}
              >
                {t.h1}
              </h1>
              <p className="text-white/70 text-lg max-w-lg mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Postes ouverts */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <h2
                className="text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                }}
              >
                {t.postes_titre}
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-8 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <div
                  className="rounded-lg p-8 border"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-off-white)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3
                      className="text-2xl"
                      style={{
                        fontFamily: "var(--font-bebas-neue)",
                        letterSpacing: "0.02em",
                        color: "var(--color-text-dark)",
                      }}
                    >
                      {t.poste_title}
                    </h3>
                    <span
                      className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(0,191,255,0.12)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {t.poste_tag}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2 mb-6">
                    {(t.poste_details as readonly string[]).map((d, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className="shrink-0 mt-0.5"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="7" cy="7" r="7" fill="#1B4F8A" opacity="0.15" />
                          <path
                            d="M4.5 7L6.5 9L9.5 5"
                            stroke="#1B4F8A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-2">
                    <a
                      href="tel:0607324861"
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
                      </svg>
                      06 07 32 48 61
                    </a>
                    <a
                      href="tel:+33479544990"
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
                      </svg>
                      04 79 54 49 90
                    </a>
                  </div>
                </div>
                <p
                  className="mt-3 text-sm text-center"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t.leboncoin}{" "}
                  <a
                    href="https://www.leboncoin.fr/ad/offres_d_emploi/3187751144"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Le Bon Coin
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Formulaire candidature */}
        <section
          className="py-24"
          style={{ backgroundColor: "var(--color-primary-dark)" }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <h2
                className="text-4xl lg:text-5xl text-white mb-3"
                style={{ fontFamily: "var(--font-bebas-neue)" }}
              >
                {t.candidature_titre}
              </h2>
              <p className="text-white/60">
                {t.candidature_subtitle}
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg p-8 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {t.nom} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className={inputClass}
                    style={inputStyle}
                  />
                  {errors.nom && (
                    <p className="mt-1 text-xs text-red-500">{errors.nom}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--color-text-dark)" }}
                  >
                    {t.telephone}
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {t.email} <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean.dupont@email.fr"
                  className={inputClass}
                  style={inputStyle}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="poste"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {t.poste_label} <span className="text-red-500">*</span>
                </label>
                <select
                  id="poste"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">{t.poste_placeholder}</option>
                  {(t.poste_options as readonly string[]).map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                {errors.poste && (
                  <p className="mt-1 text-xs text-red-500">{errors.poste}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t.message_placeholder}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 font-semibold text-white rounded-sm text-base transition-all duration-200 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                {status === "loading" ? t.envoi_cours : t.envoyer}
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-sm p-3">
                  {t.succes}
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-sm p-3">
                  {t.erreur}{" "}
                  <a href="tel:0607324861" className="underline">
                    06 07 32 48 61
                  </a>
                  .
                </p>
              )}
            </motion.form>

            <motion.div
              className="mt-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              <Link
                href="/"
                className="text-white/50 hover:text-white text-sm transition-colors"
              >
                {t.retour}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
