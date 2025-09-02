// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-[#0a1120] text-zinc-100 antialiased relative`}
      >
        {/* === FONDO ANIMADO GLOBAL (z-0) === */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Estrellas visibles en 3 capas */}
          <div className="star-layer layer-1" />
          <div className="star-layer layer-2" />
          <div className="star-layer layer-3" />
          {/* Nubes / nebulosas */}
          <div className="cloud cloud-1" />
          <div className="cloud cloud-2" />
          <div className="cloud cloud-3" />
        </div>

        {/* === CONTENIDO (z-10) === */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL embebido: no depende de otros archivos ===== */}
        <style jsx global>{`
          /* Paleta base por si globals.css no carga antes */
          :root {
            --arcana-bg: #0a1120;
            --arcana-bg-2: #0b1530;
            --arcana-accent: #d4af37;
          }

          /* ===== Estrellas grandes + brillo (siempre visibles) ===== */
          .star-layer {
            position: absolute;
            inset: 0;
            animation: stars-move 200s linear infinite, twinkle 6s ease-in-out infinite alternate;
            will-change: background-position, filter, opacity;
          }
          /* capa 1: densa */
          .star-layer.layer-1 {
            opacity: 0.36;
            background-image:
              radial-gradient(1.8px 1.8px at 12px 12px, rgba(255,255,255,0.95), transparent 60%),
              radial-gradient(1.4px 1.4px at 28px 40px, rgba(255,255,255,0.85), transparent 60%),
              radial-gradient(1.2px 1.2px at 52px 18px, rgba(255,255,255,0.8), transparent 60%),
              radial-gradient(1.6px 1.6px at 18px 64px, rgba(255,255,255,0.95), transparent 60%);
            background-size: 54px 54px;
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.25));
          }
          /* capa 2: puntos más grandes y separados */
          .star-layer.layer-2 {
            opacity: 0.34;
            background-image:
              radial-gradient(2.4px 2.4px at 20px 22px, #fff, transparent 60%),
              radial-gradient(2.0px 2.0px at 46px 50px, rgba(255,255,255,0.95), transparent 60%),
              radial-gradient(2.2px 2.2px at 70px 26px, rgba(255,255,255,0.9), transparent 60%);
            background-size: 110px 110px;
            animation-duration: 240s, 6.5s;
            filter: drop-shadow(0 0 3px rgba(255,255,255,0.35));
          }
          /* capa 3: ESTRELLAS GRANDES para que se note inmediato */
          .star-layer.layer-3 {
            opacity: 0.32;
            background-image:
              radial-gradient(3.8px 3.8px at 30px 30px, #fff, transparent 55%),
              radial-gradient(3.2px 3.2px at 88px 60px, rgba(255,255,255,0.95), transparent 55%);
            background-size: 180px 180px;
            animation-duration: 280s, 7s;
            filter:
              drop-shadow(0 0 4px rgba(255,255,255,0.45))
              drop-shadow(0 0 12px rgba(212,175,55,0.2));
          }
          @keyframes stars-move {
            0% { background-position: 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 1400px 0, -1400px 0, 1000px 0, -1000px 0; }
          }
          @keyframes twinkle {
            0% { filter: brightness(0.95); }
            100% { filter: brightness(1.25); }
          }

          /* ===== Nubes / nebulosas (azul + dorado) ===== */
          .cloud {
            position: absolute;
            filter: blur(80px);
            opacity: 0.58;
            mix-blend-mode: screen;
            will-change: transform;
          }
          .cloud-1 {
            width: 60vw; height: 60vw; left: -15vw; top: -10vw;
            background:
              radial-gradient(circle at 30% 30%, rgba(212,175,55,0.28), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(59,130,246,0.26), transparent 60%);
            animation: drift1 65s ease-in-out infinite alternate;
          }
          .cloud-2 {
            width: 46vw; height: 46vw; right: -14vw; top: 6vw;
            background:
              radial-gradient(circle at 60% 40%, rgba(139,92,246,0.24), transparent 60%),
              radial-gradient(circle at 40% 60%, rgba(212,175,55,0.18), transparent 60%);
            animation: drift2 85s ease-in-out infinite alternate;
          }
          .cloud-3 {
            width: 70vw; height: 70vw; left: 16vw; bottom: -18vw;
            background:
              radial-gradient(circle at 50% 50%, rgba(59,130,246,0.24), transparent 60%),
              radial-gradient(circle at 30% 70%, rgba(212,175,55,0.18), transparent 60%);
            animation: drift3 95s ease-in-out infinite alternate;
          }
          @keyframes drift1 { from { transform: translate(0,0); } to { transform: translate(9vw, 2vw); } }
          @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-7vw, -1vw); } }
          @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(6vw, -3vw); } }

          /* Accesibilidad: si el usuario reduce movimiento, se bajan animaciones */
          @media (prefers-reduced-motion: reduce) {
            .star-layer, .cloud { animation: none !important; opacity: 0.22; }
          }
        `}</style>
      </body>
    </html>
  );
}
