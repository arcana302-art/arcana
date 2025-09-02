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
          {/* Bancos densos de nube (top/bottom) */}
          <div className="bank t" />
          <div className="bank b" />
          {/* Nubes densas (múltiples masas más pequeñas) */}
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="cloud c3" />
          <div className="cloud c4" />
          <div className="cloud c5" />
          <div className="cloud c6" />
          <div className="cloud c7" />
          <div className="cloud c8" />
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
   BANCOS DE NUBE (MUY DENSOS)
   ======================= */
.bank {
  position:absolute; left:50%; transform: translateX(-50%);
  width: 140vw; pointer-events:none; filter: blur(36px);
  opacity:.85;  /* densidad principal */
  will-change: transform;
  background:
    radial-gradient(60% 80% at 35% 55%, rgba(255,255,255,.92) 0%, rgba(255,255,255,.92) 36%, transparent 72%),
    radial-gradient(55% 75% at 65% 45%, rgba(255,255,255,.88) 0%, rgba(255,255,255,.88) 34%, transparent 70%),
    radial-gradient(80% 80% at 50% 50%, rgba(212,175,55,.20) 0%, rgba(212,175,55,.20) 30%, transparent 70%),
    radial-gradient(85% 85% at 50% 55%, rgba(59,130,246,.18) 0%, rgba(59,130,246,.18) 28%, transparent 72%);
}
.bank.t { top: -10vh; height: 42vh; animation: bankFloatT 90s ease-in-out infinite alternate; }
.bank.b { bottom: -12vh; height: 48vh; animation: bankFloatB 110s ease-in-out infinite alternate; }

.bank::after{
  content:""; position:absolute; inset:-10%;
  background:
    radial-gradient(24px 18px at 20% 50%, rgba(255,255,255,.40) 0% , rgba(255,255,255,.40) 40%, transparent 68%),
    radial-gradient(22px 16px at 60% 45%, rgba(255,255,255,.36) 0% , rgba(255,255,255,.36) 38%, transparent 66%),
    radial-gradient(18px 14px at 40% 60%, rgba(255,255,255,.32) 0% , rgba(255,255,255,.32) 36%, transparent 64%);
  filter: blur(12px); opacity:.65;
}

@keyframes bankFloatT { from { transform: translate(-50%,0) } to { transform: translate(calc(-50% + 2vw), 1.5vh) } }
@keyframes bankFloatB { from { transform: translate(-50%,0) } to { transform: translate(calc(-50% - 2vw), -1.5vh) } }

/* =======================
   NUBES DENSAS (masas pequeñas superpuestas)
   ======================= */
.cloud {
  position:absolute;
  filter: blur(28px);         /* MENOS blur = MÁS densas */
  opacity:.82;                /* alta densidad local */
  will-change: transform;
  width: 28vw; height: 22vw;  /* base; cada clase ajusta */
  background:
    radial-gradient(60% 50% at 35% 45%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.95) 42%, transparent 72%),
    radial-gradient(55% 45% at 65% 55%, rgba(255,255,255,.90) 0%, rgba(255,255,255,.90) 38%, transparent 70%),
    radial-gradient(70% 60% at 30% 35%, rgba(212,175,55,.22) 0%, rgba(212,175,55,.22) 30%, transparent 66%),
    radial-gradient(70% 60% at 70% 65%, rgba(59,130,246,.20) 0%, rgba(59,130,246,.20) 28%, transparent 64%);
}

/* Textura interna (algodón) */
.cloud::before, .cloud::after{
  content:""; position:absolute; inset:-12%; pointer-events:none;
  background:
    radial-gradient(16px 12px at 25% 35%, rgba(255,255,255,.42) 0%, rgba(255,255,255,.42) 45%, transparent 70%),
    radial-gradient(14px 10px at 60% 55%, rgba(255,255,255,.38) 0%, rgba(255,255,255,.38) 42%, transparent 68%),
    radial-gradient(12px 9px  at 40% 70%, rgba(255,255,255,.34) 0%, rgba(255,255,255,.34) 38%, transparent 66%);
  filter: blur(10px); opacity:.7;
}
.cloud::after{
  inset:-8%;
  background:
    radial-gradient(20px 14px at 35% 45%, rgba(255,255,255,.30) 0%, rgba(255,255,255,.30) 40%, transparent 66%),
    radial-gradient(18px 12px at 55% 60%, rgba(255,255,255,.26) 0%, rgba(255,255,255,.26) 36%, transparent 64%);
  filter: blur(8px); opacity:.6;
}

/* Posiciones / tamaños (más pequeñas y muchas) */
.cloud.c1 { width: 34vw; height: 26vw; left: -6vw;  top: -4vw;  animation: drift1 60s ease-in-out infinite alternate; }
.cloud.c2 { width: 26vw; height: 20vw; right: -8vw; top:  8vw;  animation: drift2 70s ease-in-out infinite alternate; }
.cloud.c3 { width: 42vw; height: 30vw; left: 18vw;  bottom: -10vw; animation: drift3 80s ease-in-out infinite alternate; }
.cloud.c4 { width: 22vw; height: 18vw; left:  6vw;  top: 28vw;  animation: drift4 75s ease-in-out infinite alternate; }
.cloud.c5 { width: 24vw; height: 19vw; right: 10vw; bottom: 22vw; animation: drift5 85s ease-in-out infinite alternate; }
.cloud.c6 { width: 20vw; height: 16vw; left: 52vw; top:  12vw;  animation: drift6 90s ease-in-out infinite alternate; }
.cloud.c7 { width: 28vw; height: 22vw; left: 32vw; top:   6vw;  animation: drift7 95s ease-in-out infinite alternate; }
.cloud.c8 { width: 24vw; height: 18vw; right: 28vw; top:  22vw;  animation: drift8 88s ease-in-out infinite alternate; }

/* Movimiento MUY suave (densidad sin mareo) */
@keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(3vw, .6vw) } }
@keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-2.5vw,-.6vw) } }
@keyframes drift3 { from { transform: translate(0,0) } to { transform: translate(2.8vw,-1.2vw) } }
@keyframes drift4 { from { transform: translate(0,0) } to { transform: translate(2vw, .4vw) } }
@keyframes drift5 { from { transform: translate(0,0) } to { transform: translate(-2vw,.8vw) } }
@keyframes drift6 { from { transform: translate(0,0) } to { transform: translate(1.8vw,-.6vw) } }
@keyframes drift7 { from { transform: translate(0,0) } to { transform: translate(2.2vw,.6vw) } }
@keyframes drift8 { from { transform: translate(0,0) } to { transform: translate(-2.2vw,.4vw) } }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .bank, .cloud { animation: none !important; opacity: .6; }
}
        `}</style>
      </body>
    </html>
  );
}
