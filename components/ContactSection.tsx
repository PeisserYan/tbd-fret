"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/variants";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--color-primary-dark)" }}
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
            className="text-5xl lg:text-6xl text-white"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            NOUS CONTACTER
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Infos contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-white"
          >
            <img src="/logo-tbd.png" alt="TBD" style={{ height: "60px", width: "auto", marginBottom: "24px" }} />
            <div className="mb-8">
              <h3
                className="text-2xl mb-2"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  letterSpacing: "0.05em",
                  color: "var(--color-accent)",
                }}
              >
                TRANSPORTS BOGEAT DANIEL
              </h3>
              <p className="text-white/70 leading-relaxed">
                241 rue des Bouvards
                <br />
                73420 Voglans
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <a
                href="tel:+33479544990"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(0,191,255,0.15)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                      fill="#00BFFF"
                    />
                  </svg>
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors font-medium">
                  04 79 54 49 90
                </span>
              </a>
              <a
                href="mailto:tbd@tbd-fret.com"
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(0,191,255,0.15)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                      fill="#00BFFF"
                    />
                  </svg>
                </div>
                <span className="text-white/80 group-hover:text-white transition-colors font-medium">
                  tbd@tbd-fret.com
                </span>
              </a>
            </div>

            <div
              className="p-5 rounded-lg border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Horaires d&apos;ouverture
              </p>
              <p className="text-white/80 text-sm">
                Lundi – Vendredi&nbsp;: <strong className="text-white">7h00 – 18h00</strong>
              </p>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="w-full h-72 lg:h-96 rounded-lg overflow-hidden relative"
          >
            <iframe
              src="https://maps.google.com/maps?q=Transports+Bogeat+Daniel,+241+rue+des+Bouvards,+73420+Voglans&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation TBD Voglans"
            />
            {/* Bouton ouvrir dans Google Maps */}
            <a
              href="https://www.google.com/maps/search/Transports+Bogeat+Daniel,+241+rue+des+Bouvards,+73420+Voglans"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
              </svg>
              Voir la fiche Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
