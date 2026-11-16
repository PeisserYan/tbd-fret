import { NextRequest, NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";
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
const EMAIL_SENDER = process.env.EMAIL_SENDER_CANDIDATURE ?? "candidature@tbd-fret.com";

export async function POST(req: NextRequest) {
  try {
    // Bloque les POST dont Origin/Referer pointent vers un autre domaine (appel API direct)
    if (isSuspiciousOrigin(req)) {
      logSilentReject(req, "/api/candidature", "origin_referer_mismatch");
      return NextResponse.json({ success: true });
    }

    const body = await req.json();
    const { _hp, ...fields } = body;
    // Honeypot : rempli = bot, on répond succès sans rien envoyer
    if (isHoneypotFilled(_hp)) {
      logSilentReject(req, "/api/candidature", "honeypot_filled");
      return NextResponse.json({ success: true });
    }
    const { nom, email, telephone, poste, message } = fields;

    if (!nom || !email || !poste) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Téléphone facultatif, mais s'il est fourni il doit être plausible
    if (typeof telephone === "string" && telephone.trim() !== "" && !isValidPhone(telephone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    // Signature typique de bot : nom et message identiques mot pour mot
    if (hasDuplicateFreeText([nom, message])) {
      logSilentReject(req, "/api/candidature", "duplicate_free_text_fields");
      return NextResponse.json({ success: true });
    }

    // Toutes les valeurs saisies sont échappées avant insertion dans le HTML du mail
    const e = {
      nom: escapeHtml(nom),
      email: escapeHtml(email),
      telephone: telephone ? escapeHtml(telephone) : "—",
      poste: escapeHtml(poste),
      message: escapeHtml(message),
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0D2E52; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle candidature — TBD Fret</h1>
        </div>
        <div style="background: #F5F7FA; padding: 24px; border: 1px solid #D0DCE8; border-top: none; border-radius: 0 0 8px 8px;">

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #5A6A7A; width: 40%; font-size: 14px;">Nom</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.nom}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Email</td><td style="padding: 6px 0; color: #1B4F8A; font-size: 14px;"><a href="mailto:${e.email}">${e.email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Téléphone</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.telephone}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Poste souhaité</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${e.poste}</td></tr>
          </table>

          ${
            message
              ? `
          <h2 style="color: #1B4F8A; font-size: 16px; margin: 24px 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Motivation
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

    const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY ?? "" });
    await brevo.transactionalEmails.sendTransacEmail({
      sender: { email: EMAIL_SENDER, name: "TBD Fret" },
      to: [{ email: EMAIL_DESTINATION }],
      replyTo: { email },
      subject: `Candidature — ${subjectSafe(poste, 40)} — ${subjectSafe(nom, 60)}`,
      htmlContent: html,
    });

    // TODO: ajouter écriture Supabase ici (dans 2 mois)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /candidature:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
