import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_DESTINATION = process.env.EMAIL_DESTINATION ?? "tbd@tbd-fret.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    } = body;

    // Validation basique côté serveur
    if (!nom || !email || !entreprise || !villeDepart || !villeArrivee) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

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
            <tr><td style="padding: 6px 0; color: #5A6A7A; width: 40%; font-size: 14px;">Nom et prénom</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${nom}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Entreprise</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${entreprise}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Email</td><td style="padding: 6px 0; color: #1B4F8A; font-size: 14px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Téléphone</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${telephone}</td></tr>
          </table>

          <h2 style="color: #1B4F8A; font-size: 16px; margin: 24px 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Expédition
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #5A6A7A; width: 40%; font-size: 14px;">Type de marchandise</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${typeMarchandise}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Poids estimé</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${poids}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Palettes</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${palettes}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Départ</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${villeDepart}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Arrivée (Italie)</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${villeArrivee}</td></tr>
            <tr><td style="padding: 6px 0; color: #5A6A7A; font-size: 14px;">Date souhaitée</td><td style="padding: 6px 0; color: #0D1B2A; font-weight: 600; font-size: 14px;">${dateChargement}</td></tr>
          </table>

          ${
            message
              ? `
          <h2 style="color: #1B4F8A; font-size: 16px; margin: 24px 0 16px 0; border-bottom: 1px solid #D0DCE8; padding-bottom: 8px;">
            Précisions
          </h2>
          <p style="color: #0D1B2A; font-size: 14px; line-height: 1.6; background: white; padding: 12px; border-radius: 4px; border: 1px solid #D0DCE8;">${message}</p>
          `
              : ""
          }

          <div style="margin-top: 32px; padding: 16px; background: white; border-radius: 4px; border: 1px solid #D0DCE8;">
            <p style="color: #5A6A7A; font-size: 12px; margin: 0;">
              Répondre directement à <a href="mailto:${email}" style="color: #1B4F8A;">${email}</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "TBD Fret <devis@tbd-fret.com>",
      to: EMAIL_DESTINATION,
      replyTo: email,
      subject: `Demande de devis — ${entreprise} (${villeDepart} → ${villeArrivee})`,
      html,
    });

    // TODO: ajouter écriture Supabase ici (dans 2 mois)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API /devis:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
