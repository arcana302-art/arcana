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
        {/* ===== Fondo global sin flicker (z-0) ===== */}
        <div id="bg-root" aria-hidden>
          <div className="stars l1" />
          <div className="stars l2" />
          <div className="stars l3" />
          <div className="neb n1" />
          <div className="neb n2" />
          <div className="neb n3" />
        </div>

        {/* Contenido sobre el fondo */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL (solo posiciones, sin filters animados) ===== */}
        <style>{`
/* Contenedor del fondo */
#bg-root {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; overflow: hidden;
}

/* ===== Estrellas (visibles, sin brillo animado) ===== */
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

/* ===== Nebulosas grandes (sin mix-blend, sin sombras animadas) ===== */
.neb { position:absolute; filter: blur(100px); opacity:.55; will-change: transform; }
.neb.n1{
  width:72vw;height:72vw;left:-18vw;top:-12vw;
  background:
    radial-gradient(circle at 35% 35%, rgba(212,175,55,.50), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(59,130,246,.45), transparent 60%);
  animation: drift1 70s ease-in-out infinite alternate;
}
.neb.n2{
  width:56vw;height:56vw;right:-16vw;top:6vw;
  background:
    radial-gradient(circle at 60% 40%, rgba(139,92,246,.48), transparent 60%),
    radial-gradient(circle at 40% 60%, rgba(212,175,55,.35), transparent 60%);
  animation: drift2 90s ease-in-out infinite alternate;
}
.neb.n3{
  width:82vw;height:82vw;left:10vw;bottom:-22vw;
  background:
    radial-gradient(circle at 50% 50%, rgba(59,130,246,.50), transparent 60%),
    radial-gradient(circle at 30% 70%, rgba(212,175,55,.38), transparent 60%);
  animation: drift3 110s ease-in-out infinite alternate;
}

/* ===== Animaciones sólo de posición (no filtros) ===== */
@keyframes pan-l1 { 0%{background-position:0 0,0 0,0 0,0 0} 100%{background-position:1400px 0,-1200px 0,1000px 0,-800px 0} }
@keyframes pan-l2 { 0%{background-position:0 0,0 0,0 0} 100%{background-position:1600px 0,-1400px 0,1200px 0} }
@keyframes pan-l3 { 0%{background-position:0 0,0 0} 100%{background-position:1800px 0,-1600px 0} }

@keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(10vw, 2vw) } }
@keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-8vw,-2vw) } }
@keyframes drift3 { from { transform: translate(0,0) } to { transform: translate(6vw,-4vw) } }

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .stars, .neb { animation: none !important; opacity: .4; }
}
        `}</style>
      </body>
    </html>
  );
}
