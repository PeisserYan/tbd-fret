"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/variants";
import { useLang } from "@/lib/LangContext";
import { translations } from "@/lib/translations";

type FormData = {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  typeMarchandise: string;
  poids: string;
  palettes: string;
  villeDepart: string;
  villeArrivee: string;
  dateChargement: string;
  message: string;
};

const initialForm: FormData = {
  nom: "",
  entreprise: "",
  email: "",
  telephone: "",
  typeMarchandise: "",
  poids: "",
  palettes: "",
  villeDepart: "",
  villeArrivee: "",
  dateChargement: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-sm border text-sm transition-all duration-200 outline-none focus:ring-2 bg-white";
const inputStyle = {
  borderColor: "var(--color-border)",
  color: "var(--color-text-dark)",
};
const inputFocusStyle = { "--tw-ring-color": "var(--color-primary)" } as React.CSSProperties;

const labelClass = "block text-sm font-semibold mb-1.5";
const labelStyle = { color: "var(--color-text-dark)" };

type FieldProps = {
  name: keyof FormData;
  label: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
  value?: string;
  error?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isRequired?: boolean;
};

function Field({
  name,
  label,
  type = "text",
  placeholder,
  children,
  value = "",
  error,
  onChange,
  isRequired,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className={labelClass} style={labelStyle}>
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      {children ?? (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          style={{ ...inputStyle, ...inputFocusStyle }}
        />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function DevisSection() {
  const { lang } = useLang();
  const t = translations[lang].devis;

  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<Status>("idle");

  const required: (keyof FormData)[] = [
    "nom",
    "entreprise",
    "email",
    "telephone",
    "typeMarchandise",
    "poids",
    "palettes",
    "villeDepart",
    "villeArrivee",
    "dateChargement",
  ];

  function validate() {
    const newErrors: Partial<FormData> = {};
    for (const field of required) {
      if (!form[field].trim()) {
        newErrors[field] = t.requis;
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t.email_invalide;
    }
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
      const res = await fetch("/api/devis", {
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

  return (
    <section
      id="devis"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-off-white)" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
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
              {t.surtitre}
            </span>
            <div
              className="w-8 h-0.5"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
          </div>
          <h2
            className="text-5xl lg:text-6xl mb-4"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              color: "var(--color-text-dark)",
            }}
          >
            {t.titre}
          </h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            {t.sous_titre}
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-sm border"
          style={{ borderColor: "var(--color-border)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8"
          noValidate
        >
          {/* Bloc 1 */}
          <div>
            <h3
              className="text-lg mb-5 pb-3 border-b"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.05em",
                color: "var(--color-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              {t.bloc1}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field name="nom" label={t.nom} placeholder="Jean Dupont" value={form.nom} error={errors.nom} onChange={handleChange} isRequired />
              <Field name="entreprise" label={t.entreprise} placeholder="Acme SAS" value={form.entreprise} error={errors.entreprise} onChange={handleChange} isRequired />
              <Field
                name="email"
                label={t.email}
                type="email"
                placeholder="jean.dupont@acme.fr"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="telephone"
                label={t.telephone}
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={form.telephone}
                error={errors.telephone}
                onChange={handleChange}
                isRequired
              />
            </div>
          </div>

          {/* Bloc 2 */}
          <div>
            <h3
              className="text-lg mb-5 pb-3 border-b"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.05em",
                color: "var(--color-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              {t.bloc2}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field name="typeMarchandise" label={t.type_marchandise} isRequired>
                <select
                  id="typeMarchandise"
                  name="typeMarchandise"
                  value={form.typeMarchandise}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">{t.selectioner}</option>
                  {t.marchandises.map((m) => <option key={m}>{m}</option>)}
                </select>
                {errors.typeMarchandise && (
                  <p className="mt-1 text-xs text-red-500">{errors.typeMarchandise}</p>
                )}
              </Field>
              <Field name="poids" label={t.poids} placeholder="ex: 5 000 kg" value={form.poids} error={errors.poids} onChange={handleChange} isRequired />
              <Field name="palettes" label={t.palettes} isRequired>
                <select
                  id="palettes"
                  name="palettes"
                  value={form.palettes}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">{t.selectioner}</option>
                  {t.palettes_options.map((p) => <option key={p}>{p}</option>)}
                </select>
                {errors.palettes && (
                  <p className="mt-1 text-xs text-red-500">{errors.palettes}</p>
                )}
              </Field>
              <Field name="dateChargement" label={t.date} type="date" value={form.dateChargement} error={errors.dateChargement} onChange={handleChange} isRequired />
              <Field
                name="villeDepart"
                label={t.ville_depart}
                placeholder={t.placeholder_ville_depart}
                value={form.villeDepart}
                error={errors.villeDepart}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="villeArrivee"
                label={t.ville_arrivee}
                placeholder={t.placeholder_ville_arrivee}
                value={form.villeArrivee}
                error={errors.villeArrivee}
                onChange={handleChange}
                isRequired
              />
            </div>
          </div>

          {/* Bloc 3 */}
          <div>
            <h3
              className="text-lg mb-5 pb-3 border-b"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.05em",
                color: "var(--color-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              {t.bloc3}
            </h3>
            <div>
              <label
                htmlFor="message"
                className={labelClass}
                style={labelStyle}
              >
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t.placeholder_message}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 font-semibold text-white rounded-sm text-base transition-all duration-200 hover:brightness-110 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {status === "loading" ? t.envoi_cours : t.envoyer}
            </button>

            {status === "success" && (
              <p className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-sm p-3">
                {t.succes}
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-sm p-3">
                {t.erreur}{" "}
                <a href="tel:+33479544990" className="underline">
                  04 79 54 49 90
                </a>
                .
              </p>
            )}
          </div>
        </form>
        </motion.div>
      </div>
    </section>
  );
}
