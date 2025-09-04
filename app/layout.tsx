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

        {/* OVERRIDE DEFINITIVO: limpia todo y reaplica tema morado a .btn-arcana--primary */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html { scroll-behavior: smooth; }

          /* Objetivos EXACTOS que compartiste: */
          a.btn-arcana.btn-arcana--primary,
          button.btn-arcana.btn-arcana--primary {
            /* Borra cualquier estilo previo (Tailwind, inline, etc.) */
            all: unset !important;

            /* Re-aplica comportamiento y estilo del botón */
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            user-select: none !important;
            text-decoration: none !important;

            /* Tipografía y caja */
            font-family: inherit !important;
            font-weight: 700 !important;
            line-height: 1 !important;
            border-radius: 12px !important;
            padding: 12px 20px !important;

            /* Tema morado opaco */
            color: #fff !important;
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            border: 0 !important;
            box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;

            /* Asegura que el link siga funcionando como link */
            /* (el href sigue activo; 'all: unset' no lo desactiva) */
          }

          a.btn-arcana.btn-arcana--primary:hover,
          button.btn-arcana.btn-arcana--primary:hover {
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* Si hubiera overlays internos/pseudo-elementos con fondo amarillo, los neutralizamos: */
          a.btn-arcana.btn-arcana--primary::before,
          a.btn-arcana.btn-arcana--primary::after,
          button.btn-arcana.btn-arcana--primary::before,
          button.btn-arcana.btn-arcana--primary::after {
            all: unset !important;
            content: none !important;
          }
          a.btn-arcana.btn-arcana--primary *,
          button.btn-arcana.btn-arcana--primary * {
            background: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
            filter: none !important;
          }
        `}</style>
      </body>
    </html>
  );
}
