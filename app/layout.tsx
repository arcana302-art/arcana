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

        {/* OVERRIDE ULTRA-ESPECÍFICO (morado) */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html { scroll-behavior: smooth; }

          /* ===== ATAJO DIRECTO A TUS DOS OUTERHTML =====
             Repetimos clases para subir especificidad y usamos !important.
             Además aplicamos un "hue fix" con filter para cualquier remanente amarillo.
          */
          a.btn-arcana.btn-arcana--primary.btn-arcana.btn-arcana--primary,
          button.btn-arcana.btn-arcana--primary.btn-arcana.btn-arcana--primary,
          a[class~="btn-arcana"][class~="btn-arcana--primary"],
          button[class~="btn-arcana"][class~="btn-arcana--primary"]{
            position: relative !important;
            isolation: isolate !important;
            color: #fff !important;
            border: 0 !important;
            border-radius: 12px !important;
            font-weight: 700 !important;
            padding: 12px 20px !important;
            text-decoration: none !important;
            /* fondo morado propio */
            background: linear-gradient(180deg,var(--violet-500) 0%, var(--violet-700) 100%) !important;
            box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;

            /* --- HACK DE RESCATE ---
               Si aún existiera una capa amarilla difícil de quitar,
               viramos cualquier tono (incluido amarillo) hacia morado sin
               alterar casi el blanco del texto. */
            filter: hue-rotate(260deg) saturate(140%) contrast(1.02) !important;
          }
          a[class~="btn-arcana"][class~="btn-arcana--primary"]:hover,
          button[class~="btn-arcana"][class~="btn-arcana--primary"]:hover{
            background: linear-gradient(180deg,var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px);
            box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* Neutraliza overlays internos (spans/pseudo-elementos) que pinten amarillo */
          a[class~="btn-arcana"][class~="btn-arcana--primary"] *,
          a[class~="btn-arcana"][class~="btn-arcana--primary"] *::before,
          a[class~="btn-arcana"][class~="btn-arcana--primary"] *::after,
          a[class~="btn-arcana"][class~="btn-arcana--primary"]::before,
          a[class~="btn-arcana"][class~="btn-arcana--primary"]::after,
          button[class~="btn-arcana"][class~="btn-arcana--primary"] *,
          button[class~="btn-arcana"][class~="btn-arcana--primary"] *::before,
          button[class~="btn-arcana"][class~="btn-arcana--primary"] *::after,
          button[class~="btn-arcana"][class~="btn-arcana--primary"]::before,
          button[class~="btn-arcana"][class~="btn-arcana--primary"]::after {
            background: transparent !important;
            background-image: none !important;
            box-shadow: none !important;
            filter: none !important; /* evitamos dobles filtros dentro */
          }

          /* (Opcional) estilo sólido para un posible secundario .btn-arcana--secondary */
          a[class~="btn-arcana"][class~="btn-arcana--secondary"],
          button[class~="btn-arcana"][class~="btn-arcana--secondary"]{
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
            border-radius:12px !important; font-weight:700 !important; padding:12px 20px !important;
            box-shadow: 0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
            filter: none !important; /* no viramos los secundarios */
          }
          a[class~="btn-arcana"][class~="btn-arcana--secondary"]:hover,
          button[class~="btn-arcana"][class~="btn-arcana--secondary"]:hover{
            background:#352462 !important; border-color: var(--violet-400) !important; transform: translateY(-1px);
          }
        `}</style>
      </body>
    </html>
  );
}
