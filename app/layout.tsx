// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";

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

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* THEME + OVERRIDES FORZADOS A MORADO */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
            --btn-bg: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%);
            --btn-bg-hover: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%);
          }

          /* ====== Tema base para .btn ====== */
          .btn{
            position:relative; display:inline-flex; align-items:center; justify-content:center;
            padding:12px 20px; border-radius:12px; font-weight:700; line-height:1; text-decoration:none;
            cursor:pointer; user-select:none; border:0; color:#fff; transition:transform .16s, box-shadow .16s, background .16s;
          }
          .btn-primary{ background:var(--btn-bg); box-shadow:0 8px 22px rgba(109,40,217,.35),0 2px 8px rgba(139,92,246,.28); }
          .btn-primary:hover{ transform:translateY(-1px); background:var(--btn-bg-hover); box-shadow:0 10px 26px rgba(109,40,217,.45),0 4px 12px rgba(139,92,246,.34); }
          .btn-secondary{ background:#2b2150; color:#fff; border:2px solid var(--violet-600); }
          .btn-secondary:hover{ transform:translateY(-1px); background:#352462; border-color:var(--violet-400); }

          /* ====== OVERRIDES FORZADOS (sin tocar componentes) ======
             Capturamos patrones típicos de tus CTAs y los pintamos morados,
             aunque tengan clases antiguas (amarillo, glass, etc.).            */

          /* Hero principal */
          a[href="/booking"],
          a[href*="/booking"],
          a[href*="agendar"],
          button[name="agendar"],
          button[id*="agendar"],
          .agendar-btn,
          .cta-primary,
          .button-primary,
          .btn.btn-primary,
          .btn-primary {
            background: var(--btn-bg) !important;
            color: #fff !important;
            border: 0 !important;
            box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
          }
          a[href="/booking"]:hover,
          a[href*="/booking"]:hover,
          a[href*="agendar"]:hover,
          button[name="agendar"]:hover,
          .agendar-btn:hover,
          .cta-primary:hover,
          .button-primary:hover,
          .btn.btn-primary:hover,
          .btn-primary:hover {
            background: var(--btn-bg-hover) !important;
            box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* Botones "Agendar" dentro de tarjetas/listados */
          .card a,
          .card button {
            border-radius: 12px !important;
          }
          .card a[href*="agendar"],
          .card a[href*="/booking"],
          .card button[name="agendar"],
          .card .btn-primary {
            background: var(--btn-bg) !important;
            color:#fff !important; border:0 !important;
            box-shadow: 0 6px 18px rgba(109,40,217,.30) !important;
          }
          .card a[href*="agendar"]:hover,
          .card a[href*="/booking"]:hover,
          .card button[name="agendar"]:hover,
          .card .btn-primary:hover {
            background: var(--btn-bg-hover) !important;
            box-shadow: 0 10px 22px rgba(109,40,217,.38) !important;
          }

          /* Evita traslucidos en cualquier "secundario" */
          .btn-secondary,
          .button-secondary,
          .cta-secondary {
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
          }
          .btn-secondary:hover,
          .button-secondary:hover,
          .cta-secondary:hover {
            background:#352462 !important; border-color:var(--violet-400) !important;
          }
        `}</style>
      </body>
    </html>
  );
}
