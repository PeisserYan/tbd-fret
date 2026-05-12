"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/variants";

const arguments_ = [
  {
    icon: "🚛",
    title: "Flotte récente",
    text: "36 Volvo FH 500, renouvelés en 2022. Vous conduisez du matériel fiable, entretenu sur place à Voglans.",
  },
  {
    icon: "🗺",
    title: "Trajets réguliers",
    text: "France-Italie en aller-retour. Des routes connues, des partenaires stables, des habitudes qui comptent.",
  },
  {
    icon: "🤝",
    title: "Entreprise familiale",
    text: "Fondée en 1980. Ici on se connaît, on se respecte. Pas de turn-over tous les six mois.",
  },
];

const postes = [
  {
    title: "Chauffeur SPL grand routier",
    tag: "Temps plein",
    details: [
      "Départs à la semaine, France-Italie",
      "Domicile 50 km max autour de Chambéry",
      "Permis CE + FIMO/FCO requis",
      "ADR souhaité",
    ],
    contact: "06 07 32 48 61",
    leboncoin: true,
  },
];

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
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const newErrors: Partial<FormData> = {};
    if (!form.nom.trim()) newErrors.nom = "Ce champ est requis";
    if (!form.email.trim()) newErrors.email = "Ce champ est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email invalide";
    if (!form.poste) newErrors.poste = "Veuillez choisir un poste";
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
                  On recrute
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
                REJOIGNEZ TBD
              </h1>
              <p className="text-white/70 text-lg max-w-lg mx-auto">
                Une entreprise familiale de 40 ans. Une flotte neuve. Un travail sérieux.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pourquoi TBD */}
        <section
          className="py-24"
          style={{ backgroundColor: "var(--color-off-white)" }}
        >
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
                POURQUOI TBD ?
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {arguments_.map((arg, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-lg border"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="text-4xl mb-4">{arg.icon}</div>
                  <h3
                    className="text-xl mb-3"
                    style={{
                      fontFamily: "var(--font-bebas-neue)",
                      letterSpacing: "0.02em",
                      color: "var(--color-text-dark)",
                    }}
                  >
                    {arg.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {arg.text}
                  </p>
                </motion.div>
              ))}
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
                POSTES OUVERTS
              </h2>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-8 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {postes.map((poste, i) => (
                <motion.div key={i} variants={fadeInUp}>
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
                        {poste.title}
                      </h3>
                      <span
                        className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(0,191,255,0.12)",
                          color: "var(--color-primary)",
                        }}
                      >
                        {poste.tag}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2 mb-6">
                      {poste.details.map((d, j) => (
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
                    <a
                      href={`tel:${poste.contact.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                          fill="currentColor"
                        />
                      </svg>
                      {poste.contact}
                    </a>
                  </div>
                  {poste.leboncoin && (
                    <p
                      className="mt-3 text-sm text-center"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Retrouvez nos annonces sur{" "}
                      <a
                        href="https://www.leboncoin.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Le Bon Coin
                      </a>
                    </p>
                  )}
                </motion.div>
              ))}
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
                ENVOYER MA CANDIDATURE
              </h2>
              <p className="text-white/60">
                Nous prenons le temps de lire chaque candidature.
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
                    Nom et prénom <span className="text-red-500">*</span>
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
                    Téléphone
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
                  Email <span className="text-red-500">*</span>
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
                  Poste souhaité <span className="text-red-500">*</span>
                </label>
                <select
                  id="poste"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">Sélectionner un poste...</option>
                  <option>Chauffeur SPL grand routier</option>
                  <option>Autre / Candidature spontanée</option>
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
                  Message / Motivation
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Parlez-nous de votre expérience, de vos disponibilités..."
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
                {status === "loading"
                  ? "Envoi en cours..."
                  : "Envoyer ma candidature"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-sm p-3">
                  Candidature envoyée ! Nous reviendrons vers vous rapidement.
                </p>
              )}
              {status === "error" && (
                <p className="text-center text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-sm p-3">
                  Une erreur est survenue. Appelez-nous au{" "}
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
                ← Retour à l&apos;accueil
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
