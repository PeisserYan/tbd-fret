"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "L'entreprise", href: "/#expertise" },
  { label: "Prestations", href: "/#prestations" },
  { label: "En chiffres", href: "/#chiffres" },
  { label: "Engagement", href: "/#engagement" },
  { label: "Contact", href: "/#contact" },
  { label: "Recrutement", href: "/recrutement" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleLogoClick() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
        animate={{
          backgroundColor: scrolled
            ? "rgba(13, 46, 82, 0.96)"
            : "rgba(13, 46, 82, 0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 shrink-0 cursor-pointer"
            >
              <img
                src="/logo-tbd.png"
                alt="TBD Fret logo"
                width={56}
                height={56}
                className="object-contain w-14 h-14"
              />
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#devis"
                className="ml-2 px-5 py-2 text-sm font-semibold text-white rounded-sm transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Demander un devis
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Ouvrir le menu"
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 z-50 h-full w-72 shadow-2xl"
              style={{ backgroundColor: "var(--color-primary-dark)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex flex-col p-8 pt-20 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-lg font-medium border-b border-white/10 pb-4"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/#devis"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 px-5 py-3 text-center font-semibold text-white rounded-sm"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
