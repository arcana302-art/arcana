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
      <body className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`} style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}>
        {/* ===== FONDO GLOBAL (z-0) ===== */}
        <div id="bg-root" className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden />

        {/* ===== CONTENIDO (z-10) ===== */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL (sin styled-jsx, siempre aplicado) ===== */}
        <style>{`
/* ---------- ESTRELLAS GRANDES + NUBES VISIBLES ---------- */
#bg-root { position: fixed; inset: 0; }

/* Capas de estrellas: tamaños visibles (3px/6px/9px) y brillo */
#bg-root::before,
#bg-root::after {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none;
}

/* Capa densa (puntos 3px) */
#bg-stars-1, #bg-stars-2, #bg-stars-3 { position:absolute; inset:0; pointer-events:none; }
#bg-stars-1 {
  background-image:
    radial-gradient(3px 3px at 12px 12px, rgba(255,255,255,0.9), transparent 55%),
    radial-gradient(3px 3px at 48px 36px, rgba(255,255,255,0.85), transparent 55%),
    radial-gradient(3px 3px at 72px 18px, rgba(255,255,255,0.85), transparent 55%),
    radial-gradient(3px 3px at 24px 64px, rgba(255,255,255,0.9), transparent 55%);
  background-size: 80px 80px;
  opacity: .45;
  animation: bg-pan-1 160s linear infinite, twinkle 5.5s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 3px rgba(255,255,255,.35));
}
/* Capa media (estrellas 6px) */
#bg-stars-2 {
  background-image:
    radial-gradient(6px 6px at 22px 22px, #fff, transparent 45%),
    radial-gradient(6px 6px at 86px 50px, rgba(255,255,255,.98), transparent 45%),
    radial-gradient(5px 5px at 120px 26px, rgba(255,255,255,.95), transparent 45%);
  background-size: 180px 180px;
  opacity: .40;
  animation: bg-pan-2 200s linear infinite, twinkle 6.5s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 6px rgba(255,255,255,.45)) drop-shadow(0 0 12px rgba(212,175,55,.28));
}
/* Capa grande (estrellas 9px) */
#bg-stars-3 {
  background-image:
    radial-gradient(9px 9px at 40px 40px, #fff, transparent 40%),
    radial-gradient(8px 8px at 140px 90px, rgba(255,255,255,.98), transparent 40%);
  background-size: 260px 260px;
  opacity: .36;
  animation: bg-pan-3 240s linear infinite, twinkle 7.5s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 10px rgba(255,255,255,.55)) drop-shadow(0 0 18px rgba(212,175,55,.35));
}

/* Nebulosas MUY visibles (sin mix-blend) */
#bg-neb-1, #bg-neb-2, #bg-neb-3 {
  position: absolute; pointer-events: none; filter: blur(120px);
  opacity: .78; will-change: transform;
}
#bg-neb-1 {
  width: 75vw; height: 75vw; left: -18vw; top: -12vw;
  background:
    radial-gradient(circle at 35% 35%, rgba(212,175,55,.55), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(59,130,246,.50), transparent 60%);
  animation: drift1 70s ease-in-out infinite alternate;
}
#bg-neb-2 {
  width: 58vw; height: 58vw; right: -16vw; top: 6vw;
  background:
    radial-gradient(circle at 60% 40%, rgba(139,92,246,.52), transparent 60%),
    radial-gradient(circle at 40% 60%, rgba(212,175,55,.38), transparent 60%);
  animation: drift2 90s ease-in-out infinite alternate;
}
#bg-neb-3 {
  width: 85vw; height: 85vw; left: 10vw; bottom: -24vw;
  background:
    radial-gradient(circle at 50% 50%, rgba(59,130,246,.52), transparent 60%),
    radial-gradient(circle at 30% 70%, rgba(212,175,55,.40), transparent 60%);
  animation: drift3 110s ease-in-out infinite alternate;
}

/* Halo/Aurora central (golpe visual en hero) */
#bg-aurora {
  position: absolute; left: 50%; top: 12vh; transform: translateX(-50%);
  width: 120vw; height: 70vh; pointer-events: none;
  background:
    radial-gradient(60% 50% at 50% 40%, rgba(212,175,55,.22), transparent 70%),
    radial-gradient(60% 50% at 50% 60%, rgba(59,130,246,.18), transparent 70%);
  filter: blur(40px); opacity: .9;
}

/* Animaciones */
@keyframes bg-pan-1 { 0%{background-position:0 0,0 0,0 0,0 0;} 100%{background-position:1400px 0,-1200px 0,1000px 0,-800px 0;} }
@keyframes bg-pan-2 { 0%{background-position:0 0,0 0,0 0;} 100%{background-position:1600px 0,-1400px 0,1200px 0;} }
@keyframes bg-pan-3 { 0%{background-position:0 0,0 0;} 100%{background-position:1800px 0,-1600px 0;} }
@keyframes twinkle { 0%{filter:brightness(.95)} 100%{filter:brightness(1.28)} }

@keyframes drift1 { from { transform: translate(0,0) } to { transform: translate(10vw, 2vw) } }
@keyframes drift2 { from { transform: translate(0,0) } to { transform: translate(-8vw,-2vw) } }
@keyframes drift3 { from { transform: translate(0,0) } to { transform: translate(6vw,-4vw) } }

/* Respeta accesibilidad */
@media (prefers-reduced-motion: reduce) {
  #bg-stars-1, #bg-stars-2, #bg-stars-3, #bg-neb-1, #bg-neb-2, #bg-neb-3 { animation: none !important; opacity: .4; }
}

/* Inyección de las capas (usamos pseudo-elemento para montar hijos) */
#bg-root::before { /* nada; reservamos canal para capas si hiciera falta */ }
        `}</style>

        {/* ===== Montamos las capas como nodos hijos para asegurar render ===== */}
        <div id="bg-stars-1" />
        <div id="bg-stars-2" />
        <div id="bg-stars-3" />
        <div id="bg-neb-1" />
        <div id="bg-neb-2" />
        <div id="bg-neb-3" />
        <div id="bg-aurora" />
      </body>
    </html>
  );
}
