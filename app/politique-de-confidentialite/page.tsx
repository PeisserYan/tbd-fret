import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité — TBD Transports Bogeat Daniel",
  description: "Politique de confidentialité et traitement des données personnelles de TBD Transports Bogeat Daniel.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen py-32 px-4"
        style={{ backgroundColor: "var(--color-off-white)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-5xl mb-4"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              color: "var(--color-text-dark)",
              letterSpacing: "0.02em",
            }}
          >
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>
          <p className="text-sm mb-12" style={{ color: "var(--color-text-muted)" }}>
            Dernière mise à jour : mai 2026
          </p>

          <div
            className="space-y-10 text-sm leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                1. Responsable du traitement
              </h2>
              <p>
                Le responsable du traitement des données personnelles collectées sur ce site est :
              </p>
              <p className="mt-2">
                <strong style={{ color: "var(--color-text-dark)" }}>TRANSPORTS BOGEAT DANIEL</strong><br />
                SIRET : 320 029 887 00041<br />
                241 rue des Bouvards, 73420 Voglans, France<br />
                Tél. : <a href="tel:+33479544990" className="underline">04 79 54 49 90</a><br />
                Email : <a href="mailto:tbd@tbd-fret.com" className="underline">tbd@tbd-fret.com</a>
              </p>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                2. Données collectées
              </h2>
              <p>Dans le cadre de l&apos;utilisation de ce site, nous pouvons collecter les données suivantes :</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong style={{ color: "var(--color-text-dark)" }}>Formulaire de devis :</strong> nom, prénom, email, téléphone, entreprise, description du besoin de transport.</li>
                <li><strong style={{ color: "var(--color-text-dark)" }}>Formulaire de candidature :</strong> nom, prénom, email, téléphone, poste souhaité, message de motivation.</li>
                <li><strong style={{ color: "var(--color-text-dark)" }}>Données de navigation :</strong> adresse IP, navigateur, pages consultées (via cookies d&apos;audience, si consentement donné).</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                3. Finalités du traitement
              </h2>
              <p>Les données collectées sont utilisées pour :</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Répondre aux demandes de devis et établir des propositions commerciales ;</li>
                <li>Traiter les candidatures d&apos;emploi et contacter les candidats ;</li>
                <li>Améliorer les performances et l&apos;expérience utilisateur du site ;</li>
                <li>Respecter nos obligations légales et réglementaires.</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                4. Base légale
              </h2>
              <p>
                Les traitements effectués reposent sur les bases légales suivantes, conformément au Règlement
                Général sur la Protection des Données (RGPD — Règlement UE 2016/679) :
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>L&apos;exécution de mesures précontractuelles ou d&apos;un contrat (devis, prestations) ;</li>
                <li>Le consentement de la personne concernée (candidatures, cookies) ;</li>
                <li>L&apos;intérêt légitime de TRANSPORTS BOGEAT DANIEL (sécurité du site, suivi d&apos;activité).</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                5. Durée de conservation
              </h2>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li><strong style={{ color: "var(--color-text-dark)" }}>Données de devis :</strong> 3 ans à compter du dernier contact ;</li>
                <li><strong style={{ color: "var(--color-text-dark)" }}>Données de candidature :</strong> 2 ans à compter de la réception, sauf recrutement actif ;</li>
                <li><strong style={{ color: "var(--color-text-dark)" }}>Données de navigation :</strong> 13 mois maximum.</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                6. Destinataires des données
              </h2>
              <p>
                Les données personnelles ne sont pas vendues ni cédées à des tiers. Elles peuvent être transmises
                à des prestataires techniques strictement nécessaires au fonctionnement du site (hébergeur Vercel,
                service d&apos;envoi d&apos;emails), dans le cadre de contrats garantissant leur confidentialité.
              </p>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                7. Vos droits
              </h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Droit d&apos;accès à vos données personnelles ;</li>
                <li>Droit de rectification en cas d&apos;inexactitude ;</li>
                <li>Droit à l&apos;effacement (« droit à l&apos;oubli ») ;</li>
                <li>Droit à la limitation du traitement ;</li>
                <li>Droit à la portabilité des données ;</li>
                <li>Droit d&apos;opposition au traitement.</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous par email à{" "}
                <a href="mailto:tbd@tbd-fret.com" className="underline">tbd@tbd-fret.com</a>{" "}
                ou par courrier à : TRANSPORTS BOGEAT DANIEL, 241 rue des Bouvards, 73420 Voglans.
              </p>
              <p className="mt-2">
                En cas de réclamation, vous pouvez également saisir la{" "}
                <a
                  href="https://www.cnil.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
                </a>.
              </p>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                8. Sécurité des données
              </h2>
              <p>
                TRANSPORTS BOGEAT DANIEL met en œuvre les mesures techniques et organisationnelles appropriées
                pour garantir la sécurité des données personnelles collectées, notamment via le protocole HTTPS
                et l&apos;hébergement sur infrastructure sécurisée.
              </p>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                9. Cookies
              </h2>
              <p>
                Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement ainsi que des cookies
                d&apos;audience anonymisés. Vous pouvez à tout moment désactiver les cookies via les paramètres
                de votre navigateur. La désactivation des cookies techniques peut affecter le fonctionnement du site.
              </p>
            </section>

            <section>
              <h2
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  color: "var(--color-text-dark)",
                  letterSpacing: "0.02em",
                }}
              >
                10. Modifications
              </h2>
              <p>
                TRANSPORTS BOGEAT DANIEL se réserve le droit de modifier la présente politique à tout moment.
                Les utilisateurs sont invités à la consulter régulièrement. La date de dernière mise à jour est
                indiquée en haut de ce document.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="text-sm transition-colors"
              style={{ color: "var(--color-primary)" }}
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
