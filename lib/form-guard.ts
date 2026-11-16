import type { NextRequest } from "next/server";

// Utilitaires partagés par les routes de formulaire (/api/devis, /api/candidature) :
// anti-spam + échappement HTML des champs insérés dans les e-mails.

// Domaines autorisés à soumettre les formulaires (protection anti-bypass API direct)
const ALLOWED_HOSTS = ["tbd-fret.com", "www.tbd-fret.com"];

// Rejette seulement si Origin/Referer sont PRÉSENTS ET pointent vers un domaine différent.
// Absence des deux en-têtes = toléré (proxy d'entreprise, extension vie privée, etc.).
export function isSuspiciousOrigin(req: NextRequest): boolean {
  const candidates = [req.headers.get("origin"), req.headers.get("referer")];
  const present = candidates.filter((v): v is string => !!v);
  if (present.length === 0) return false;

  for (const value of present) {
    try {
      const host = new URL(value).hostname;
      if (ALLOWED_HOSTS.includes(host)) return false;
    } catch {
      // valeur d'en-tête non parsable : ignorée, ne compte pas comme "match valide"
    }
  }
  return true;
}

export function logSilentReject(req: NextRequest, route: string, reason: string) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "inconnue";
  console.warn(
    JSON.stringify({
      event: "contact_form_silent_reject",
      route,
      reason,
      timestamp: new Date().toISOString(),
      ip,
      originPresent: !!req.headers.get("origin"),
      refererPresent: !!req.headers.get("referer"),
    })
  );
}

// Honeypot : champ censé rester vide pour un humain. Robuste à n'importe quel type envoyé.
export function isHoneypotFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim() !== "";
  return true; // un humain n'envoie jamais autre chose qu'une chaîne vide
}

// Signature typique de bot : plusieurs champs texte libres identiques mot pour mot
export function hasDuplicateFreeText(values: unknown[]): boolean {
  const seen = new Set<string>();
  for (const v of values) {
    if (typeof v !== "string" || v.trim() === "") continue;
    const normalized = v.trim().toLowerCase();
    if (seen.has(normalized)) return true;
    seen.add(normalized);
  }
  return false;
}

// Téléphone international générique : 6 à 14 chiffres avec + optionnel,
// une fois espaces/tirets/points/parenthèses retirés. Couvre FR, IT, ES, etc.
const PHONE_INTL_REGEX = /^\+?\d{6,14}$/;

export function isValidPhone(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return PHONE_INTL_REGEX.test(value.replace(/[\s.\-()]/g, ""));
}

const EMAIL_REGEX = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_REGEX.test(value);
}

// Échappe une valeur saisie par l'utilisateur avant insertion dans le HTML de l'e-mail.
// Empêche l'injection de liens, images ou mise en forme trompeuse.
export function escapeHtml(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Valeur texte pour l'objet du mail : chaîne, sans retours à la ligne, longueur bornée.
export function subjectSafe(value: unknown, max = 80): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}
