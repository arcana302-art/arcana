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
          {/* Nubes densas (varias masas más pequeñas) */}
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="cloud c3" />
          <div className="cloud c4" />
          <div className="cloud c5" />
          <div className="cloud c6" />
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
  opacity:.40;
  background-image:
    radial-gradient(2.2px 2.2px at 12px 12px, rgba(255,255,255,.95), transparent 55%),
    radial-gradient(2px 2px at 48px 36px, rgba(255,255,255,.85), transparent 55%),
    radial-gradient(2px 2px at 72px 18px, rgba(255,255,255,.85), transparent 55%),
    radial-gradient(2.2px 2.2px at 24px 64px, rgba(255,255,255,.95), transparent 55%);
  background-size: 90px 90px;
  animation: pan-l1 160s linear infinite;
}
/* Capa media (4–5px) */
.stars.l2{
  opacity:.36;
  background-image:
    radial-gradient(4.5px 4.5px at 22px 22px, #fff, transparent 45%),
    radial-gradient(4px 4px at 86px 50px, rgba(255,255,255,.98), transparent 45%),
    radial-gradient(3.8px 3.8px at 120px 26px, rgba(255,255,255,.95), transparent 45%);
  background-size: 180px 180px;
  animation: pan-l2 200s linear infinite;
}
/* Capa grande (6–7px) */
.stars.l3{
  opacity:.34;
  background-image:
    radial-gradient(6.8px 6.8px at 40px 40px, #fff, transparent 40%),
    radial-gradient(6px 6px at 140px 90px, rgba(255,255,255,.98), transparent 40%);
  background-size: 260px 260px;
  animation: pan-l3 240s linear infinite;
}

/* Animaciones sólo de posición (GPU-friendly) */
@keyframes pan-l1 { 0%{background-position:0 0,0 0,0 0,0 0} 100%{background-position:1400px 0,-1200px 0,1000px 0,-800px 0} }
@keyframes pan-l2 { 0%{background-position:0 0,0 0,0 0} 100%{background-position:1600px 0,-1400px 0,1200px 0} }
@keyframes pan-l3 { 0%{background-position:0 0,0 0} 100%{background-position:1800px 0,-1600px 0} }

/* =======================
   NUBES DENSAS (más pequeñas)
   ======================= */
.cloud {
  position:absolute;
  width: 32vw; height: 28vw; /* medida base, luego se redefine por clase */
  filter: blur(50px);         /* menos blur = más densidad */
  opacity:.62;                /* más densas */
  will-change: transform;
}

/* Textura interna de las nubes (sin flicker) */
.cloud::after{
  content:"";
  position:absolute; inset:-12%;
  pointer-events:none;
  /* Textura moteada suave para dar “algodón” */
  background:
    radial-gradient(18px 14px at 20% 30%, rgba(255,255,255,.28) 0%, rgba(255,255,255,.28) 45%, transparent 70%),
    radial-gradient(16px 12px at 60% 50%, rgba(255,255,255,.25) 0%, rgba(255,255,255,.25) 40%, transparent 68%),
    radial-gradient(14px 10px at 40% 70%, rgba(255,255,255,.22) 0%, rgba(255,255,255,.22) 38%, transparent 66%);
  filter: blur(10px);
  opacity:.65;
}

/* Paleta sutil: blanco con toques dorado/azul (no blend mode) */
.cloud {
  background:
    radial-gradient(60% 50% at 35% 45%, rgba(255,255,255,.78) 0%, rgba(255,255,255,.78) 38%, transparent 72%),
    radial-gradient(55% 45% at 65% 55%, rgba(255,255,255,.68) 0%, rgba(255,255,255,.68) 34%, transparent 70%),
    radial-gradient(70% 60% at 30% 35%, rgba(212,175,55,.18) 0%, rgba(212,175,55,.18) 28%, transparent 66%),
    radial-gradient(70% 60% at 70% 65%, rgba(59,130,246,.16) 0%, rgba(59,130,246,.16) 26%, transparent 64%);
}

/* Posiciones / tamaños individuales (más pequeñas que antes) */
.cloud.c1 { width: 38vw; height: 30vw; left: -8vw;  top: -6vw;  animation: drift1 60s ease-in-out infinite alternate; }
.cloud.c2 { width: 32vw; height: 26vw; right: -10vw; top:  8vw;  animation: drift2 70s ease-in-out infinite alternate; }
.cloud.c3 { width: 46vw; height: 34vw; left: 20vw;  bottom: -12vw; animation: drift3 80s ease-in-out infinite alternate; }
.cloud.c4 { width: 24vw; height: 20vw; left:  6vw;  top: 26vw;  animation: drift4 75s ease-in-out infinite alternate; }
.cloud.c5 { width: 26vw; height: 22vw; right: 12vw; bottom: 20vw; animation: drift5 85s ease-in-out infinite alternate; }
.cloud.c6 { width: 22vw; height: 18vw; left: 55vw; top:  12vw;  animation: drift6 90s ease-in-out infinite alternate; }

/* Movimiento suave (pocos píxeles) */
@keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(4vw, 1vw) } }
@keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-3vw,-1vw) } }
@keyframes drift3 { from { transform: translate(0,0) } to { transform: translate(3.5vw,-2vw) } }
@keyframes drift4 { from { transform: translate(0,0) } to { transform: translate(2.5vw, .5vw) } }
@keyframes drift5 { from { transform: translate(0,0) } to { transform: translate(-2.5vw,1vw) } }
@keyframes drift6 { from { transform: translate(0,0) } to { transform: translate(2vw,-.8vw) } }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .cloud { animation: none !important; opacity: .5; }
}
        `}</style>
      </body>
    </html>
  );
}
