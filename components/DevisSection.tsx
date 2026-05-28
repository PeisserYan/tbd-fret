"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/variants";

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
        newErrors[field] = "Ce champ est requis";
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email invalide";
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
              Réponse sous 24h
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
            DEMANDEZ UN DEVIS
          </h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Tous nos transports sont effectués avec notre propre flotte.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-8 shadow-sm border space-y-8"
          style={{ borderColor: "var(--color-border)" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          noValidate
        >
          {/* Bloc 1 — Votre entreprise */}
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
              1. Votre entreprise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field name="nom" label="Nom et prénom" placeholder="Jean Dupont" value={form.nom} error={errors.nom} onChange={handleChange} isRequired />
              <Field name="entreprise" label="Entreprise" placeholder="Acme SAS" value={form.entreprise} error={errors.entreprise} onChange={handleChange} isRequired />
              <Field
                name="email"
                label="Email professionnel"
                type="email"
                placeholder="jean.dupont@acme.fr"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="telephone"
                label="Téléphone"
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={form.telephone}
                error={errors.telephone}
                onChange={handleChange}
                isRequired
              />
            </div>
          </div>

          {/* Bloc 2 — Votre expédition */}
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
              2. Votre expédition
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field name="typeMarchandise" label="Type de marchandise" isRequired>
                <select
                  id="typeMarchandise"
                  name="typeMarchandise"
                  value={form.typeMarchandise}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">Sélectionner...</option>
                  <option>Marchandises générales</option>
                  <option>Alimentaire sec</option>
                  <option>Produits industriels</option>
                  <option>Transport ADR</option>
                  <option>Autre</option>
                </select>
                {errors.typeMarchandise && (
                  <p className="mt-1 text-xs text-red-500">{errors.typeMarchandise}</p>
                )}
              </Field>
              <Field name="poids" label="Poids estimé" placeholder="ex: 5 000 kg" value={form.poids} error={errors.poids} onChange={handleChange} isRequired />
              <Field name="palettes" label="Nombre de palettes" isRequired>
                <select
                  id="palettes"
                  name="palettes"
                  value={form.palettes}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="">Sélectionner...</option>
                  <option>1–5 palettes</option>
                  <option>6–10 palettes</option>
                  <option>11–20 palettes</option>
                  <option>21–33 palettes</option>
                  <option>Charge complète</option>
                </select>
                {errors.palettes && (
                  <p className="mt-1 text-xs text-red-500">{errors.palettes}</p>
                )}
              </Field>
              <Field name="dateChargement" label="Date souhaitée" type="date" value={form.dateChargement} error={errors.dateChargement} onChange={handleChange} isRequired />
              <Field
                name="villeDepart"
                label="Ville de départ"
                placeholder="Lyon, Grenoble..."
                value={form.villeDepart}
                error={errors.villeDepart}
                onChange={handleChange}
                isRequired
              />
              <Field
                name="villeArrivee"
                label="Ville d'arrivée en Italie"
                placeholder="Milano, Torino..."
                value={form.villeArrivee}
                error={errors.villeArrivee}
                onChange={handleChange}
                isRequired
              />
            </div>
          </div>

          {/* Bloc 3 — Précisions */}
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
              3. Précisions (optionnel)
            </h3>
            <div>
              <label
                htmlFor="message"
                className={labelClass}
                style={labelStyle}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Précisions sur la marchandise, contraintes particulières..."
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
              {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande →"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-sm p-3">
                Votre demande a bien été envoyée. Daniel vous répondra sous 24h.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-center text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-sm p-3">
                Une erreur est survenue. Appelez-nous au{" "}
                <a href="tel:+33479544990" className="underline">
                  04 79 54 49 90
                </a>
                .
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
