// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";
import CtaAutofix from "./components/CtaAutofix";

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
        {/* Fondo */}
        <Stars />
        <CloudBackdrop />
        <SceneOverlays />

        {/* Forzador de CTAs morados */}
        <CtaAutofix />

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* THEME MORADO (opaco) */}
        <style jsx global>{`
          :root{
            --violet-300:#c4b5fd; --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
            --btn-bg: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%);
            --btn-bg-hover: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%);
          }

          /* Base botones */
          .btn{
            position:relative; display:inline-flex; align-items:center; justify-content:center;
            gap:.5rem; padding:12px 20px; border-radius:12px; font-weight:700; line-height:1; text-decoration:none;
            cursor:pointer; user-select:none; border:0; color:#fff;
            transition:transform .16s ease, box-shadow .16s ease, background .16s ease, border-color .16s ease, opacity .16s ease;
            will-change: transform, box-shadow, background, border-color, opacity;
          }
          .btn:focus-visible{ outline:2px solid var(--violet-400); outline-offset:2px; }
          .btn:disabled{ opacity:.6; cursor:not-allowed; }

          .btn-primary{
            background:var(--btn-bg);
            box-shadow:0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28);
          }
          .btn-primary:hover{
            transform:translateY(-1px);
            background:var(--btn-bg-hover);
            box-shadow:0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34);
          }
          .btn-primary:active{ transform:translateY(0) scale(.99); }

          .btn-secondary{
            background:#2b2150; color:#fff; border:2px solid var(--violet-600);
            box-shadow: 0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05);
          }
          .btn-secondary:hover{
            transform:translateY(-1px);
            background:#352462; border-color:var(--violet-400);
            box-shadow: 0 10px 22px rgba(139,92,246,.26), inset 0 -1px 0 rgba(255,255,255,.06);
          }

          /* Overrides de clases amarillas comunes (Tailwind/utilidades) */
          [class*="bg-amber"], [class*="bg-yellow"],
          [class*="from-amber"], [class*="from-yellow"],
          [class*="to-amber"], [class*="to-yellow"],
          [class*="ring-amber"], [class*="ring-yellow"],
          [class*="border-amber"], [class*="border-yellow"] {
            /* No forzamos todo, solo el background para evitar sorpresas */
          }
          /* Cuando sean CTAs típicos, el CtaAutofix ya les pone .btn/.btn-primary */

          /* Para anchors/botones con morado explícito por selector genérico (cobertura extra) */
          a[href*="/booking"], a[href*="agendar"], button[name="agendar"],
          .agendar-btn, .cta-primary, .button-primary {
            background: var(--btn-bg) !important; color:#fff !important; border:0 !important;
            box-shadow:0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
          }
          a[href*="/booking"]:hover, a[href*="agendar"]:hover, button[name="agendar"]:hover,
          .agendar-btn:hover, .cta-primary:hover, .button-primary:hover {
            background: var(--btn-bg-hover) !important;
            box-shadow:0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }
        `}</style>
      </body>
    </html>
  );
}
