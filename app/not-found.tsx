import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex flex-col items-center justify-center text-white"
        style={{ backgroundColor: "var(--color-primary-dark)" }}
      >
        <div className="text-center px-4">
          <div
            className="text-8xl font-bold mb-4"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-bebas-neue)" }}
          >
            404
          </div>
          <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-bebas-neue)" }}>
            Page introuvable
          </h1>
          <p className="text-white/75 mb-8 max-w-md mx-auto">
            Cette page n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm uppercase tracking-widest transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary-dark)" }}
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
