// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";

// Si ya creaste este archivo, lo seguimos usando.
// (No pasa nada si no existe; puedes comentarlo)
import CtaUltraForce from "./components/CtaUltraForce";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Arcana",
  description: "Guía mística con especialistas verificados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)" }}
      >
        {/* Fondo animado */}
        <Stars />
        <CloudBackdrop />
        <SceneOverlays />

        {/* Forzador JS que pinta CTAs en morado por texto/uso (inline !important) */}
        <CtaUltraForce />

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* ======== OVERRIDES “MATA-AMARILLO” ULTRA-AGRESIVOS ======== */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }

          html{ scroll-behavior: smooth; }

          /* 1) Cualquier utilidad Tailwind que huela a AMARILLO -> MORADO sólido/opaco */
          :where(*[class*="bg-amber"], *[class*="bg-yellow"],
                 *[class*="from-amber"], *[class*="from-yellow"],
                 *[class*="to-amber"], *[class*="to-yellow"]) {
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important;
            border-color: transparent !important;
          }
          /* Hovers amarillos también al morado */
          :where(*[class*="hover:bg-amber"]:hover, *[class*="hover:bg-yellow"]:hover){
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            color:#fff !important;
          }
          /* Bordes/aneillos amarillos -> morados */
          :where(*[class*="border-amber"], *[class*="border-yellow"]) { border-color: var(--violet-600) !important; }
          :where(*[class*="ring-amber"], *[class*="ring-yellow"])   { box-shadow: 0 0 0 2px var(--violet-600) inset !important; }
          :where(*[class*="text-amber"], *[class*="text-yellow"])   { color:#fff !important; }

          /* 2) Normaliza look de botones (sin traslúcidos) */
          :where(a,button,[role="button"]){
            border-radius:12px; font-weight:700;
          }

          /* 3) Rutas/uso típicos de CTA -> morado, por si escapa a los selectores de arriba */
          a[href*="/booking"],
          a[href*="agendar" i],
          a[href*="consulta" i],
          button[name*="agendar" i],
          .agendar-btn, .cta-primary, .button-primary {
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important;
            border:0 !important;
            box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
            padding:12px 20px !important;
          }
          a[href*="/booking"]:hover,
          a[href*="agendar" i]:hover,
          a[href*="consulta" i]:hover,
          button[name*="agendar" i]:hover,
          .agendar-btn:hover, .cta-primary:hover, .button-primary:hover {
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px);
            box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* 4) Botón secundario sólido (no glass) para “Únete…” u otros */
          .btn-secondary, .cta-secondary, .button-secondary,
          a[href*="únete" i], a[href*="unete" i] {
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
            box-shadow: 0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
          }
          .btn-secondary:hover, .cta-secondary:hover, .button-secondary:hover,
          a[href*="únete" i]:hover, a[href*="unete" i]:hover {
            background:#352462 !important; border-color: var(--violet-400) !important; transform: translateY(-1px);
          }
        `}</style>
      </body>
    </html>
  );
}
