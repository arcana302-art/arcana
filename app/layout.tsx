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

          {/* Bandas de nubes separadas (parallax R→L) */}
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

/* Estrellas: movimiento MUY suave R→L */
@keyframes stars-pan-1 { 0%{background-position:0 0} 100%{background-position:-1200px 0} }
@keyframes stars-pan-2 { 0%{background-position:0 0} 100%{background-position:-1400px 0} }
@keyframes stars-pan-3 { 0%{background-position:0 0} 100%{background-position:-1600px 0} }

/* =======================
   BANDAS DE NUBES (separadas, R→L, parallax)
   ======================= */
/* Base bandas: tile más ANCHO (1400px) para dar separaciones claras */
.belt {
  position:absolute; left:0; width:100%;
  pointer-events:none; filter: blur(14px);      /* bordes “algodón” */
  opacity:.94;
  background-repeat: repeat-x;
  background-size: 1400px 100%;
  will-change: background-position;
}

/* --- Banda 1 (alta): grupos medianos con huecos grandes --- */
.belt.b1 {
  top: 9vh; height: 16vh;
  background-image:
    /* Nubes principales (blancas) */
    radial-gradient(circle at 120px 55%, rgba(255,255,255,.98) 52%, transparent 74%),
    radial-gradient(circle at 380px 48%, rgba(255,255,255,.96) 48%, transparent 72%),
    radial-gradient(circle at 680px 60%, rgba(255,255,255,.98) 54%, transparent 76%),
    radial-gradient(circle at 980px 50%, rgba(255,255,255,.95) 50%, transparent 74%),
    radial-gradient(circle at 1260px 58%, rgba(255,255,255,.98) 52%, transparent 76%),
    /* Núcleos extra para “borreguito” */
    radial-gradient(closest-side at 240px 54%, rgba(255,255,255,.85) 44%, transparent 68%),
    radial-gradient(closest-side at 820px 52%, rgba(255,255,255,.85) 44%, transparent 68%),
    /* Halos sutiles */
    radial-gradient(circle at 380px 48%, rgba(212,175,55,.14) 70%, transparent 88%),
    radial-gradient(circle at 980px 50%, rgba(59,130,246,.12) 70%, transparent 88%);
  animation: belt-move-slow 110s linear infinite;
}

/* --- Banda 2 (media): grupos grandes separados, capa central del parallax --- */
.belt.b2 {
  top: 42vh; height: 18vh;
  background-image:
    radial-gradient(circle at 100px 52%,  rgba(255,255,255,.98) 56%, transparent 76%),
    radial-gradient(circle at 420px 48%,  rgba(255,255,255,.96) 54%, transparent 76%),
    radial-gradient(circle at 780px 55%,  rgba(255,255,255,.98) 58%, transparent 78%),
    radial-gradient(circle at 1120px 47%, rgba(255,255,255,.95) 54%, transparent 76%),
    radial-gradient(circle at 1340px 58%, rgba(255,255,255,.98) 58%, transparent 78%),
    radial-gradient(closest-side at 270px 50%, rgba(255,255,255,.86) 46%, transparent 70%),
    radial-gradient(closest-side at 960px 53%, rgba(255,255,255,.86) 46%, transparent 70%),
    radial-gradient(circle at 420px 48%,  rgba(212,175,55,.13) 72%, transparent 90%),
    radial-gradient(circle at 1120px 47%, rgba(59,130,246,.11) 72%, transparent 90%);
  animation: belt-move-med 80s linear infinite;
}

/* --- Banda 3 (baja): grupos pequeños y bien separados, la más rápida --- */
.belt.b3 {
  bottom: 7vh; height: 14vh;
  background-image:
    radial-gradient(circle at 90px 50%,   rgba(255,255,255,.98) 46%, transparent 70%),
    radial-gradient(circle at 360px 60%,  rgba(255,255,255,.96) 44%, transparent 68%),
    radial-gradient(circle at 640px 46%,  rgba(255,255,255,.98) 48%, transparent 72%),
    radial-gradient(circle at 920px 55%,  rgba(255,255,255,.95) 44%, transparent 70%),
    radial-gradient(circle at 1200px 49%, rgba(255,255,255,.98) 48%, transparent 72%),
    radial-gradient(closest-side at 500px 52%, rgba(255,255,255,.84) 40%, transparent 66%),
    radial-gradient(closest-side at 1080px 51%, rgba(255,255,255,.84) 40%, transparent 66%),
    radial-gradient(circle at 360px 60%,  rgba(212,175,55,.12) 64%, transparent 86%),
    radial-gradient(circle at 920px 55%,  rgba(59,130,246,.10) 64%, transparent 86%);
  animation: belt-move-fast 58s linear infinite;
}

/* Movimiento continuo R→L con tile de 1400px */
@keyframes belt-move-slow { 0%{background-position:0 0} 100%{background-position:-1400px 0} }
@keyframes belt-move-med  { 0%{background-position:0 0} 100%{background-position:-1400px 0} }
@keyframes belt-move-fast { 0%{background-position:0 0} 100%{background-position:-1400px 0} }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .belt { animation: none !important; }
}
        `}</style>
      </body>
    </html>
  );
}
