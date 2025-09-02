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

          {/* Bancos densos de nube (base) */}
          <div className="bank t" />
          <div className="bank b" />

          {/* Puffs “aborregados” (arriba y abajo) */}
          <div className="puffs top">
            <div className="puff p1" />
            <div className="puff p2" />
            <div className="puff p3" />
            <div className="puff p4" />
            <div className="puff p5" />
            <div className="puff p6" />
            <div className="puff p7" />
            <div className="puff p8" />
            <div className="puff p9" />
          </div>
          <div className="puffs bottom">
            <div className="puff p1" />
            <div className="puff p2" />
            <div className="puff p3" />
            <div className="puff p4" />
            <div className="puff p5" />
            <div className="puff p6" />
            <div className="puff p7" />
            <div className="puff p8" />
            <div className="puff p9" />
          </div>

          {/* Masas de nube de apoyo (volumen general) */}
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="cloud c3" />
          <div className="cloud c4" />
          <div className="cloud c5" />
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
   BANCOS BASE (densos, difusos)
   ======================= */
.bank {
  position:absolute; left:50%; transform: translateX(-50%);
  width: 140vw; pointer-events:none; filter: blur(26px);
  opacity:.88;  /* alta densidad */
  will-change: transform;
  background:
    radial-gradient(60% 80% at 35% 55%, rgba(255,255,255,.96) 0%, rgba(255,255,255,.96) 36%, transparent 72%),
    radial-gradient(55% 75% at 65% 45%, rgba(255,255,255,.92) 0%, rgba(255,255,255,.92) 34%, transparent 70%),
    radial-gradient(80% 80% at 50% 50%, rgba(212,175,55,.18) 0%, rgba(212,175,55,.18) 30%, transparent 70%),
    radial-gradient(85% 85% at 50% 55%, rgba(59,130,246,.16) 0%, rgba(59,130,246,.16) 28%, transparent 72%);
}
.bank.t { top: -8vh;  height: 40vh; animation: bankFloatT 85s ease-in-out infinite alternate; }
.bank.b { bottom: -10vh; height: 46vh; animation: bankFloatB 105s ease-in-out infinite alternate; }
@keyframes bankFloatT { from { transform: translate(-50%,0) } to { transform: translate(calc(-50% + 1.5vw), 1vh) } }
@keyframes bankFloatB { from { transform: translate(-50%,0) } to { transform: translate(calc(-50% - 1.5vw), -1vh) } }

/* =======================
   PUFFS “ABORREGADOS”
   ======================= */
.puffs { position:absolute; left:0; width:100%; pointer-events:none; height: 26vh; }
.puffs.top { top: 6vh; }
.puffs.bottom { bottom: 6vh; }

.puff {
  position:absolute; border-radius: 50%;
  filter: blur(12px); opacity:.95;  /* MUY densos */
  will-change: transform;
  /* núcleo blanco + halo suave dorado/azul */
  background:
    radial-gradient(closest-side, rgba(255,255,255,.98) 0%, rgba(255,255,255,.98) 55%, transparent 70%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.18), transparent 70%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.16), transparent 70%);
}
.puff::after{
  content:""; position:absolute; inset:-10%;
  border-radius:50%; pointer-events:none;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.45), transparent 65%),
    radial-gradient(closest-side, rgba(255,255,255,.35), transparent 70%);
  filter: blur(8px); opacity:.7;
}

/* TOP: 9 puffs espaciados y solapados */
.puffs.top .p1 { width:16vw; height:12vw; left:  2vw; top:  1vh; animation: floatA 14s ease-in-out infinite alternate; }
.puffs.top .p2 { width:12vw; height:10vw; left: 14vw; top: -1vh; animation: floatB 18s ease-in-out infinite alternate; }
.puffs.top .p3 { width:18vw; height:14vw; left: 24vw; top:  0vh; animation: floatA 16s ease-in-out infinite alternate; }
.puffs.top .p4 { width:14vw; height:11vw; left: 38vw; top: -2vh; animation: floatC 20s ease-in-out infinite alternate; }
.puffs.top .p5 { width:20vw; height:15vw; left: 50vw; top:  1vh; animation: floatA 17s ease-in-out infinite alternate; }
.puffs.top .p6 { width:12vw; height:10vw; left: 66vw; top: -1vh; animation: floatB 19s ease-in-out infinite alternate; }
.puffs.top .p7 { width:18vw; height:14vw; left: 76vw; top:  0vh; animation: floatC 21s ease-in-out infinite alternate; }
.puffs.top .p8 { width:14vw; height:11vw; left: 90vw; top: -2vh; animation: floatA 16s ease-in-out infinite alternate; }
.puffs.top .p9 { width:12vw; height:10vw; left:105vw; top:  0vh; animation: floatB 18s ease-in-out infinite alternate; }

/* BOTTOM: 9 puffs */
.puffs.bottom .p1 { width:16vw; height:12vw; left:  6vw; bottom:  1vh; animation: floatB 16s ease-in-out infinite alternate; }
.puffs.bottom .p2 { width:12vw; height:10vw; left: 18vw; bottom: -1vh; animation: floatA 14s ease-in-out infinite alternate; }
.puffs.bottom .p3 { width:18vw; height:14vw; left: 28vw; bottom:  0vh; animation: floatC 20s ease-in-out infinite alternate; }
.puffs.bottom .p4 { width:14vw; height:11vw; left: 42vw; bottom: -2vh; animation: floatB 17s ease-in-out infinite alternate; }
.puffs.bottom .p5 { width:20vw; height:15vw; left: 54vw; bottom:  1vh; animation: floatA 19s ease-in-out infinite alternate; }
.puffs.bottom .p6 { width:12vw; height:10vw; left: 70vw; bottom: -1vh; animation: floatC 21s ease-in-out infinite alternate; }
.puffs.bottom .p7 { width:18vw; height:14vw; left: 80vw; bottom:  0vh; animation: floatB 16s ease-in-out infinite alternate; }
.puffs.bottom .p8 { width:14vw; height:11vw; left: 94vw; bottom: -2vh; animation: floatA 18s ease-in-out infinite alternate; }
.puffs.bottom .p9 { width:12vw; height:10vw; left:108vw; bottom:  0vh; animation: floatC 20s ease-in-out infinite alternate; }

/* Flotación leve (sin flicker: solo translate) */
@keyframes floatA { from { transform: translateY(0) } to { transform: translateY(.9vh) } }
@keyframes floatB { from { transform: translateY(0) } to { transform: translateY(-.8vh) } }
@keyframes floatC { from { transform: translateY(0) } to { transform: translateY(.6vh) } }

/* =======================
   MASAS DE NUBE DE APOYO
   ======================= */
.cloud {
  position:absolute;
  filter: blur(22px);         /* compacto */
  opacity:.78;
  will-change: transform;
  width: 26vw; height: 20vw;
  background:
    radial-gradient(60% 50% at 35% 45%, rgba(255,255,255,.96) 0%, rgba(255,255,255,.96) 45%, transparent 72%),
    radial-gradient(55% 45% at 65% 55%, rgba(255,255,255,.90) 0%, rgba(255,255,255,.90) 40%, transparent 70%),
    radial-gradient(70% 60% at 30% 35%, rgba(212,175,55,.18) 0%, rgba(212,175,55,.18) 28%, transparent 66%),
    radial-gradient(70% 60% at 70% 65%, rgba(59,130,246,.16) 0%, rgba(59,130,246,.16) 26%, transparent 64%);
}
.cloud.c1 { width: 32vw; height: 24vw; left: -6vw;  top: -4vw;  animation: drift1 60s ease-in-out infinite alternate; }
.cloud.c2 { width: 24vw; height: 18vw; right: -8vw; top:  9vw;  animation: drift2 70s ease-in-out infinite alternate; }
.cloud.c3 { width: 36vw; height: 26vw; left: 18vw;  bottom: -10vw; animation: drift3 80s ease-in-out infinite alternate; }
.cloud.c4 { width: 20vw; height: 16vw; left:  8vw;  top: 30vw;  animation: drift4 75s ease-in-out infinite alternate; }
.cloud.c5 { width: 22vw; height: 18vw; right: 12vw; bottom: 20vw; animation: drift5 85s ease-in-out infinite alternate; }

@keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(3vw, .6vw) } }
@keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-2.5vw,-.6vw) } }
@keyframes drift3 { from { transform: translate(0,0) } to { transform: translate(2.8vw,-1.2vw) } }
@keyframes drift4 { from { transform: translate(0,0) } to { transform: translate(2vw, .4vw) } }
@keyframes drift5 { from { transform: translate(0,0) } to { transform: translate(-2vw,.8vw) } }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .bank, .puff, .cloud { animation: none !important; opacity: .9; }
}
        `}</style>
      </body>
    </html>
  );
}
