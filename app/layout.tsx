// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";

// (si ya tienes este forzador, lo mantenemos; si no existe no pasa nada)
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
        {/* Fondo */}
        <Stars />
        <CloudBackdrop />
        <SceneOverlays />

        {/* Forzador JS (si existe) */}
        {/* Quita esta línea si NO tienes el archivo */}
        <CtaUltraForce />

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* OVERRIDES GLOBALES ULTRA-FOCUS EN CTAs */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html{ scroll-behavior:smooth; }

          /* 1) “Mata-amarillo” para utilidades Tailwind comunes */
          :where([class*="bg-amber"], [class*="bg-yellow"],
                 [class*="from-amber"], [class*="from-yellow"],
                 [class*="to-amber"], [class*="to-yellow"]) {
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important; border-color:transparent !important;
          }
          :where([class*="hover:bg-amber"]:hover, [class*="hover:bg-yellow"]:hover){
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            color:#fff !important;
          }

          /* 2) CTA catch-all:
                - Todos los <button>
                - <a> que se “ven” como botón (redondeados o con padding de botón)
                - No toca chips .pill ni enlaces de texto del menú               */
          :where(button,
                 a[class*="rounded"],
                 a[class*="rounded-"],
                 a[class*="px-"][class*="py-"])
          :not([class*="pill"])
          {
            border-radius:12px !important;
            font-weight:700 !important;
            padding:12px 20px !important;
            text-decoration:none !important;
            border:0 !important;
            color:#fff !important;
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
          }
          :where(button,
                 a[class*="rounded"],
                 a[class*="rounded-"],
                 a[class*="px-"][class*="py-"])
          :not([class*="pill"]):hover{
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px);
            box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* 3) Secundarios típicos (Únete…) si los marcas con .btn-secondary/.cta-secondary */
          .btn-secondary, .cta-secondary, .button-secondary {
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
            box-shadow: 0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
          }
          .btn-secondary:hover, .cta-secondary:hover, .button-secondary:hover{
            background:#352462 !important; border-color:var(--violet-400) !important; transform: translateY(-1px);
          }
        `}</style>
      </body>
    </html>
  );
}
