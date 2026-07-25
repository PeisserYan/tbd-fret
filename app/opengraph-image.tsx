import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "TBD – Transporteur France-Italie depuis 1980";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D2E52",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Bande couleur accent à gauche */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: "#00BFFF",
          }}
        />
        {/* Titre principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: "-1px",
          }}
        >
          <div>TRANSPORT</div>
          <div>FRANCE–ITALIE</div>
        </div>
        {/* Sous-titre */}
        <div
          style={{
            color: "#00BFFF",
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 40,
          }}
        >
          Spécialiste depuis 1980 · 36 Volvo en propre
        </div>
        {/* Nom entreprise */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 22,
            fontWeight: 400,
          }}
        >
          TBD Fret — Voglans, Savoie (73)
        </div>
        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            color: "rgba(255,255,255,0.4)",
            fontSize: 20,
          }}
        >
          tbd-fret.com
        </div>
      </div>
    ),
    { ...size }
  );
}
