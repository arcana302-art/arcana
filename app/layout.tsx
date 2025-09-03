// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fondos y overlays (ya existentes en tu proyecto)
import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";

// Forzador de CTAs morados (nuevo)
import CtaForce from "./components/CtaForce";

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
        {/* Capa de estrellas y nubes */}
        <Stars />
        <CloudBackdrop />

        {/* Overlays de contraste/viñeta */}
        <SceneOverlays />

        {/* Forzador de CTAs morados (detecta y aplica estilos) */}
        <CtaForce />

        {/* Contenido de la app */}
        <div className="relative z-10">{children}</div>

        {/* Utilidad global mínima */}
        <style jsx global>{`
          html { scroll-behavior: smooth; }
        `}</style>
      </body>
    </html>
  );
}
