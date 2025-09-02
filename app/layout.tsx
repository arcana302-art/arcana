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
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}
      >
        {/* ===== Fondo global (z-0) ===== */}
        <div id="bg-root" aria-hidden>
          {/* Estrellas (visibles, sin flicker) */}
          <div className="stars l1" />
          <div className="stars l2" />
          <div className="stars l3" />

          {/* Bandas de nubes separadas que se mueven de derecha a izquierda */}
          <div className="belt b1" />
          <div className="belt b2" />
          <div className="belt b3" />
        </div>

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL ===== */}
        <style>{`
/* Contenedor del fondo */
#bg-root {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; overflow: hidden;
}

/* =======================
   ESTRELLAS (solo posición)
   ======================= */
.stars { position:absolute; inset:0; backface-visibility:hidden; transform: translateZ(0); will-change: background-position; }
/* Capa densa (2–3px) */
.stars.l1{
  opacity:.38;
  background-image:
    radial-gradient(2.2px 2.2px at 12px 12px, rgba(255,255,255,.95), transparent 55%),
    radial-gradient(2px 2px at 48px 36px, rgba(255,255,255,.85), transparent 55%),
    radial-gradient(2px 2px at 72px 18px, rgba(255,255,255,.85), transparent 55%),
    radial-gradient(2.2px 2.2px at 24px 64px, rgba(255,255,255,.95), transparent 55%);
  background-size: 90px 90px;
  animation: stars-pan-1 180s linear infinite;
}
/* Capa media (4–5px) */
.stars.l2{
  opacity:.34;
  background-image:
    radial-gradient(4.5px 4.5px at 22px 22px, #fff, transparent 45%),
    radial-gradient(4px 4px at 86px 50px, rgba(255,255,255,.98), transparent 45%),
    radial-gradient(3.8px 3.8px at 120px 26px, rgba(255,255,255,.95), transparent 45%);
  background-size: 180px 180px;
  animation: stars-pan-2 220s linear infinite;
}
/* Capa grande (6–7px) */
.stars.l3{
  opacity:.32;
  background-image:
    radial-gradient(6.8px 6.8px at 40px 40px, #fff, transparent 40%),
    radial-gradient(6px 6px at 140px 90px, rgba(255,255,255,.98), transparent 40%);
  background-size: 260px 260px;
  animation: stars-pan-3 260s linear infinite;
}

/* Estrellas: movimiento MUY suave (también derecha->izquierda para acompañar) */
@keyframes stars-pan-1 { 0%{background-position:0 0} 100%{background-position:-1200px 0} }
@keyframes stars-pan-2 { 0%{background-position:0 0} 100%{background-position:-1400px 0} }
@keyframes stars-pan-3 { 0%{background-position:0 0} 100%{background-position:-1600px 0} }

/* =======================
   BANDAS DE NUBES (separadas, R→L)
   ======================= */
/* Base: cada banda es un "tile" de 1000px que se repite en X.
   Dentro del tile definimos varias nubes (radial-gradient) separadas, dando huecos claros. */
.belt {
  position:absolute; left:0; width:100%;
  pointer-events:none; filter: blur(18px);
  opacity:.92;                /* densidad general */
  background-repeat: repeat-x;
  background-size: 1000px 100%;
  will-change: background-position;
}

/* Banda 1: alta, nubes medianas separadas */
.belt.b1 {
  top: 10vh; height: 18vh;
  /* tile con "nubes" circulares separadas */
  background-image:
    radial-gradient(circle at 80px 55%,  rgba(255,255,255,.98) 48%, transparent 70%),
    radial-gradient(circle at 250px 45%, rgba(255,255,255,.95) 46%, transparent 70%),
    radial-gradient(circle at 420px 60%, rgba(255,255,255,.98) 50%, transparent 72%),
    radial-gradient(circle at 610px 50%, rgba(255,255,255,.94) 44%, transparent 70%),
    radial-gradient(circle at 820px 58%, rgba(255,255,255,.98) 50%, transparent 72%),
    /* halos sutiles */
    radial-gradient(circle at 250px 45%, rgba(212,175,55,.16) 70%, transparent 85%),
    radial-gradient(circle at 610px 50%, rgba(59,130,246,.14) 70%, transparent 85%);
  animation: belt-move-slow 95s linear infinite;
}

/* Banda 2: media, nubes más grandes y algo más juntas */
.belt.b2 {
  top: 42vh; height: 20vh;
  background-image:
    radial-gradient(circle at 100px 52%,  rgba(255,255,255,.98) 52%, transparent 72%),
    radial-gradient(circle at 330px 48%,  rgba(255,255,255,.96) 50%, transparent 72%),
    radial-gradient(circle at 560px 55%,  rgba(255,255,255,.98) 54%, transparent 74%),
    radial-gradient(circle at 780px 47%,  rgba(255,255,255,.95) 50%, transparent 72%),
    radial-gradient(circle at 930px 58%,  rgba(255,255,255,.98) 54%, transparent 74%),
    radial-gradient(circle at 330px 48%,  rgba(212,175,55,.15) 72%, transparent 88%),
    radial-gradient(circle at 780px 47%,  rgba(59,130,246,.13) 72%, transparent 88%);
  animation: belt-move-med 70s linear infinite;
}

/* Banda 3: baja, nubes pequeñas y muy separadas */
.belt.b3 {
  bottom: 8vh; height: 16vh;
  background-image:
    radial-gradient(circle at 70px 50%,   rgba(255,255,255,.98) 44%, transparent 68%),
    radial-gradient(circle at 240px 60%,  rgba(255,255,255,.96) 42%, transparent 66%),
    radial-gradient(circle at 430px 46%,  rgba(255,255,255,.98) 46%, transparent 70%),
    radial-gradient(circle at 620px 55%,  rgba(255,255,255,.95) 44%, transparent 68%),
    radial-gradient(circle at 820px 49%,  rgba(255,255,255,.98) 46%, transparent 70%),
    radial-gradient(circle at 950px 58%,  rgba(255,255,255,.95) 44%, transparent 68%),
    radial-gradient(circle at 430px 46%,  rgba(212,175,55,.12) 66%, transparent 86%),
    radial-gradient(circle at 820px 49%,  rgba(59,130,246,.11) 66%, transparent 86%);
  animation: belt-move-fast 55s linear infinite;
}

/* Movimiento continuo de derecha a izquierda (tile de 1000px) */
@keyframes belt-move-slow { 0%{background-position:0 0} 100%{background-position:-1000px 0} }
@keyframes belt-move-med  { 0%{background-position:0 0} 100%{background-position:-1000px 0} }
@keyframes belt-move-fast { 0%{background-position:0 0} 100%{background-position:-1000px 0} }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .belt { animation: none !important; }
}
        `}</style>
      </body>
    </html>
  );
}
