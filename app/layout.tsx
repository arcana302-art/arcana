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

        {/* ====== THEME GLOBAL (MORADOS, SIN TRANSPARENCIAS EN BOTONES) ====== */}
        <style jsx global>{`
          :root{
            --container: 1200px;
            --radius-xl: 18px;

            /* Paleta principal morada */
            --violet-300: #c4b5fd;
            --violet-400: #a78bfa;
            --violet-500: #8b5cf6;
            --violet-600: #7c3aed;
            --violet-700: #6d28d9;
            --violet-800: #5b21b6;

            --pink-400: #f472b6;
            --brand-txt: #eef2ff;
            --surface-900: #0a1120;
            --surface-800: #11162a;
            --surface-700: #1a2140;
          }

          /* Contenedor utilitario */
          .container,.max-w{ max-width:var(--container); margin-inline:auto; padding-inline:16px; }

          /* TITULARES de sección */
          h2.section-title{
            font-family: var(--font-display), serif;
            font-weight: 700;
            font-size: clamp(24px, 3.2vw, 36px);
            letter-spacing: .2px;
            color: #e9eef9;
            margin: 18px auto 16px;
            text-shadow: 0 1px 0 rgba(255,255,255,0.04);
          }

          /* Tarjetas sutiles */
          .card{
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: var(--radius-xl);
            backdrop-filter: blur(6px);
          }

          /* Chips/pills (pueden quedarse como están) */
          .pill{
            border: 1px solid rgba(255,255,255,0.14);
            background: rgba(255,255,255,0.05);
            color: rgba(236,242,255,0.85);
            border-radius: 999px;
            padding: 8px 12px;
          }
          .pill:hover{ border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.07); }

          /* NAV/FIXED */
          header, nav {
            backdrop-filter: blur(8px);
            background: linear-gradient(180deg, rgba(10,17,32,0.55), rgba(10,17,32,0.24));
          }

          /* ENLACES */
          a{ color:#d9e2ff; }
          a:hover{ color:#fff; }

          /* ===== BOTONES ===== */
          .btn{
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 700;
            line-height: 1;
            text-decoration: none;
            cursor: pointer;
            user-select: none;
            border: 0;
            color: #fff;
            transition: transform .16s ease, box-shadow .16s ease, background .16s ease, border-color .16s ease, opacity .16s ease;
            will-change: transform, box-shadow, background, border-color, opacity;
          }
          .btn:focus-visible{
            outline: 2px solid var(--violet-400);
            outline-offset: 2px;
          }
          .btn:disabled{ opacity:.6; cursor:not-allowed; }

          /* Primario: morado sólido con degradado vertical */
          .btn-primary{
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%);
            box-shadow:
              0 8px 22px rgba(109,40,217,0.35),
              0 2px 8px rgba(139,92,246,0.28);
          }
          .btn-primary:hover{
            transform: translateY(-1px);
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%);
            box-shadow:
              0 10px 26px rgba(109,40,217,0.45),
              0 4px 12px rgba(139,92,246,0.34);
          }
          .btn-primary:active{ transform: translateY(0) scale(.99); }

          /* Secundario: también opaco (sin transparencia, sin glass) */
          .btn-secondary{
            background: #2b2150;                /* base sólida oscura */
            color: var(--brand-txt);
            border: 2px solid var(--violet-600); /* contorno morado */
            box-shadow:
              0 6px 18px rgba(139,92,246,0.18),
              inset 0 -1px 0 rgba(255,255,255,0.05);
          }
          .btn-secondary:hover{
            transform: translateY(-1px);
            background: #352462;                /* un tono más claro, sólido */
            border-color: var(--violet-400);
            box-shadow:
              0 10px 22px rgba(139,92,246,0.26),
              inset 0 -1px 0 rgba(255,255,255,0.06);
          }
          .btn-secondary:active{ transform: translateY(0) scale(.99); }

          /* Tamaños opcionales */
          .btn-sm{ padding: 9px 16px; border-radius: 10px; font-weight: 600; }
          .btn-lg{ padding: 14px 24px; border-radius: 14px; }

          /* Util por si hay botones dentro de tarjetas "Agendar" */
          .btn-card-primary{ composes: btn btn-primary; }
          .btn-card-secondary{ composes: btn btn-secondary; }

          /* Suavizado de scroll */
          html{ scroll-behavior: smooth; }
        `}</style>
      </body>
    </html>
  );
}
