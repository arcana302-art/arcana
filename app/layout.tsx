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
        {/* Capa de estrellas (lejanas detrás / brillantes encima) */}
        <Stars />

        {/* Nubes */}
        <CloudBackdrop />

        {/* Scrims/viñetas para contraste y legibilidad */}
        <SceneOverlays />

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* Pulido global minimalista (no rompe nada existente) */}
        <style jsx global>{`
          :root{
            --container: 1200px;
            --radius-xl: 18px;
          }
          /* Contenedor base para secciones (si lo necesitas) */
          .container,
          .max-w { max-width: var(--container); margin-inline: auto; padding-inline: 16px; }

          /* H2 secciones */
          h2.section-title{
            font-family: var(--font-display), serif;
            font-weight: 700;
            font-size: clamp(24px, 3.2vw, 36px);
            letter-spacing: .2px;
            color: #e9eef9;
            margin: 18px auto 16px;
            text-shadow: 0 1px 0 rgba(255,255,255,0.04);
          }

          /* Tarjetas suaves / glass mínimo */
          .card{
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: var(--radius-xl);
            backdrop-filter: blur(6px);
          }

          /* Pills/chips */
          .pill{
            border: 1px solid rgba(255,255,255,0.14);
            background: rgba(255,255,255,0.05);
            color: rgba(236,242,255,0.85);
            border-radius: 999px;
            padding: 8px 12px;
          }
          .pill:hover{ border-color: rgba(255,255,255,0.22); background: rgba(255,255,255,0.07); }

          /* Suaviza la barra superior si la tienes pegada */
          header, nav {
            backdrop-filter: blur(8px);
            background: linear-gradient(180deg, rgba(10,17,32,0.55), rgba(10,17,32,0.24));
          }

          /* Enlaces */
          a{ color:#d9e2ff; }
          a:hover{ color:#fff; }

          /* Suavizado de scroll */
          html{ scroll-behavior: smooth; }
        `}</style>
      </body>
    </html>
  );
}
