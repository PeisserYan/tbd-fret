import { NextRequest, NextResponse } from "next/server";
import {
  escapeHtml,
  hasDuplicateFreeText,
  isHoneypotFilled,
  isSuspiciousOrigin,
  isValidEmail,
  isValidPhone,
  logSilentReject,
  subjectSafe,
} from "@/lib/form-guard";

const EMAIL_DESTINATION = process.env.EMAIL_DESTINATION ?? "tbd@tbd-fret.com";
// Expéditeur : doit être une adresse d'un domaine authentifié dans Brevo (DKIM/DMARC tbd-fret.com)
const EMAIL_SENDER = process.env.EMAIL_SENDER_DEVIS ?? "devis@tbd-fret.com";

function isValidDate(value: string): boolean {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1900 || year > 2100) return false;
  const d = new Date(value);
  return (
    d.getUTCFullYear() === year &&
    d.getUTCMonth() + 1 === month &&
    d.getUTCDate() === day
  );
}

export async function POST(req: NextRequest) {
  try {
    // Bloque les POST dont Origin/Referer sont présents mais pointent vers un autre domaine
    // (bypass du honeypot via appel API direct). Absence des en-têtes = toléré.
    if (isSuspiciousOrigin(req)) {
      logSilentReject(req, "/api/devis", "origin_referer_mismatch");
      return NextResponse.json({ success: true });
    }

    const body = await req.json();
    const { _hp, ...fields } = body;
    // Honeypot : un champ censé rester vide pour un humain.
    // S'il est rempli, on bloque immédiatement avant tout envoi (Brevo).
    if (isHoneypotFilled(_hp)) {
      logSilentReject(req, "/api/devis", "honeypot_filled");
      return NextResponse.json({ success: true });
    }
    const {
      nom,
      entreprise,
      email,
      telephone,
      typeMarchandise,
      poids,
      palettes,
      villeDepart,
      villeArrivee,
      dateChargement,
      message,
    } = fields;

    // Validation basique côté serveur
    if (!nom || !email || !entreprise || !villeDepart || !villeArrivee) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Validation anti-spam complémentaire (défense en profondeur, ne remplace pas le honeypot)

    // 1. Signature typique de bot : plusieurs champs texte libres identiques mot pour mot
    if (hasDuplicateFreeText([nom, entreprise, villeDepart, villeArrivee, message])) {
      // Comportement quasi certain de bot : on répond succès sans envoyer, comme pour le honeypot
      logSilentReject(req, "/api/devis", "duplicate_free_text_fields");
      return NextResponse.json({ success: true });
    }

    // 2. Date de chargement invalide (format ou date impossible)
    if (!isValidDate(dateChargement)) {
      return NextResponse.json(
        { error: "Date de chargement invalide" },
        { status: 400 }
      );
    }

    // 3. Téléphone à un format international plausible (FR, IT, ES, ...)
    if (!isValidPhone(telephone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Toutes les valeurs saisies sont échappées avant insertion dans le HTML du mail
    const e = {
      nom: escapeHtml(nom),
      entreprise: escapeHtml(entreprise),
      email: escapeHtml(email),
      telephone: escapeHtml(telephone),
      typeMarchandise: escapeHtml(typeMarchandise),
      poids: escapeHtml(poids),
      palettes: escapeHtml(palettes),
      villeDepart: escapeHtml(villeDepart),
      villeArrivee: escapeHtml(villeArrivee),
      dateChargement: escapeHtml(dateChargement),
      message: escapeHtml(message),
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0D2E52; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle demande de devis — TBD Fret</h1>
        </div>
        <div style="background: #F5F7FA; padding: 24px; border: 1px solid #D0DCE8; border-top: none; border-radius: 0 0 8px 8px;">

          <h2 style="color: #1B4F8A; font-size: 16px; margin: 0 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Contact
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #5A6A7A; width: 40%; font-size: 14px;">Nom et prénom</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.nom}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Entreprise</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.entreprise}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Email</td><td style="padding: 6px 0; color: #1B4F8A; font-size: 14px;"><a href="mailto:${e.email}">${e.email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Téléphone</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.telephone}</td></tr>
          </table>

          <h2 style="color: #1B4F8A; font-size: 16px; margin: 24px 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Expédition
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #5A6A7A; width: 40%; font-size: 14px;">Type de marchandise</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.typeMarchandise}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Poids estimé</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.poids}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Palettes</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.palettes}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Départ</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.villeDepart}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Arrivée (Italie)</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.villeArrivee}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Date souhaitée</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.dateChargement}</td></tr>
          </table>

          ${
            message
              ? `
          <h2 style="color: #1B4F8A; font-size: 16px; margin: 24px 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Précisions
          </h2>
          <p style="color: #0D1B2A; font-size: 14px; line-height: 1.6; background: white; padding: 12px; border-radius: 4px; border: 1px solid #D0DCE8;">${e.message}</p>
          `
              : ""
          }

          <div style="margin-top: 32px; padding: 16px; background: white; border-radius: 4px; border: 1px solid #D0DCE8;">
            <p style="color: #5A6A7A; font-size: 12px; margin: 0;">
              Répondre directement à <a href="mailto:${e.email}" style="color: #1B4F8A;">${e.email}</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: EMAIL_SENDER, name: "TBD Fret" },
        to: [{ email: EMAIL_DESTINATION }],
        replyTo: { email: email },
        subject: `Demande de devis — ${subjectSafe(entreprise)} (${subjectSafe(villeDepart, 40)} → ${subjectSafe(villeArrivee, 40)})`,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Erreur Brevo /devis:", res.status, detail);
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    // TODO: ajouter écriture Supabase ici (dans 2 mois)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /devis:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
