import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales — TBD Transports Bogeat Daniel",
  description: "Mentions légales de TBD Transports Bogeat Daniel, entreprise de transport routier de fret.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen py-32 px-4"
        style={{ backgroundColor: "var(--color-off-white)" }}
      >
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-5xl mb-12"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              color: "var(--color-text-dark)",
              letterSpacing: "0.02em",
            }}
          >
            MENTIONS LÉGALES
          </h1>

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
                1. Éditeur du site
              </h2>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Raison sociale :</strong> TRANSPORTS BOGEAT DANIEL
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Forme juridique :</strong> Entreprise individuelle
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>SIRET :</strong> 320 029 887 00041
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Siège social :</strong> 241 rue des Bouvards, 73420 Voglans, France
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Téléphone :</strong>{" "}
                <a href="tel:+33479544990" className="underline">04 79 54 49 90</a>
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Email :</strong>{" "}
                <a href="mailto:tbd@tbd-fret.com" className="underline">tbd@tbd-fret.com</a>
              </p>
              <p>
                <strong style={{ color: "var(--color-text-dark)" }}>Activité :</strong> Transport routier de marchandises — code APE 4941B
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
                2. Directeur de la publication
              </h2>
              <p>Le directeur de la publication est le représentant légal de TRANSPORTS BOGEAT DANIEL.</p>
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
                3. Hébergement
              </h2>
              <p>
                Ce site est hébergé par <strong style={{ color: "var(--color-text-dark)" }}>Vercel Inc.</strong>,
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              </p>
              <p>
                Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">vercel.com</a>
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
                4. Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive
                de TRANSPORTS BOGEAT DANIEL ou de ses partenaires. Toute reproduction, représentation, modification
                ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite
                et constituerait une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la
                propriété intellectuelle.
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
                5. Limitation de responsabilité
              </h2>
              <p>
                TRANSPORTS BOGEAT DANIEL s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
                informations diffusées sur ce site. Toutefois, la société ne peut garantir l&apos;exhaustivité,
                la précision ou la complétude des informations mises à disposition et se réserve le droit de
                corriger, à tout moment, le contenu du site. TRANSPORTS BOGEAT DANIEL décline toute responsabilité
                pour tout préjudice direct ou indirect résultant de l&apos;utilisation de ce site.
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
                6. Cookies
              </h2>
              <p>
                Ce site peut utiliser des cookies à des fins de mesure d&apos;audience et d&apos;amélioration de
                l&apos;expérience utilisateur. Conformément à la réglementation en vigueur, vous pouvez refuser
                les cookies non essentiels via les paramètres de votre navigateur.
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
                7. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
                français sont seuls compétents.
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
