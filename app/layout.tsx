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
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-[#0a1120] text-zinc-100 antialiased relative`}>
        {/* ==== FONDO ANIMADO GLOBAL (z-0) — ESTRELLAS GRANDES + NUBES VISIBLES ==== */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" id="arcana-bg">
          {/* Nebulosas MUY VISIBLES */}
          <div className="nebula n1" />
          <div className="nebula n2" />
          <div className="nebula n3" />
          {/* Estrellas GRANDES (3 capas) */}
          <div className="stars s1" />
          <div className="stars s2" />
          <div className="stars s3" />
          {/* Halo central detrás del hero */}
          <div className="aurora" />
        </div>

        {/* CONTENIDO SOBRE EL FONDO */}
        <div className="relative z-10">{children}</div>

        {/* ==== CSS GLOBAL EMBEBIDO (no depende de otros archivos) ==== */}
        <style jsx global>{`
          :root { --arcana-accent: #d4af37; --bg1:#0a1120; --bg2:#0b1530; }
          body { background: linear-gradient(180deg, var(--bg1), var(--bg2)); }

          /* ===== Nebulosas (sin mix-blend, colores fuertes y blur alto) ===== */
          .nebula {
            position: absolute;
            filter: blur(120px);
            opacity: 0.72;         /* MUY visibles */
            will-change: transform;
          }
          .nebula.n1 {
            width: 70vw; height: 70vw; left: -18vw; top: -12vw;
            background:
              radial-gradient(circle at 35% 35%, rgba(212,175,55,0.50), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(59,130,246,0.45), transparent 60%);
            animation: drift1 70s ease-in-out infinite alternate;
          }
          .nebula.n2 {
            width: 55vw; height: 55vw; right: -16vw; top: 6vw;
            background:
              radial-gradient(circle at 60% 40%, rgba(139,92,246,0.48), transparent 60%),
              radial-gradient(circle at 40% 60%, rgba(212,175,55,0.35), transparent 60%);
            animation: drift2 90s ease-in-out infinite alternate;
          }
          .nebula.n3 {
            width: 80vw; height: 80vw; left: 10vw; bottom: -22vw;
            background:
              radial-gradient(circle at 50% 50%, rgba(59,130,246,0.50), transparent 60%),
              radial-gradient(circle at 30% 70%, rgba(212,175,55,0.38), transparent 60%);
            animation: drift3 110s ease-in-out infinite alternate;
          }
          @keyframes drift1 { from { transform: translate(0,0); } to { transform: translate(10vw, 2vw); } }
          @keyframes drift2 { from { transform: translate(0,0); } to { transform: translate(-8vw, -2vw); } }
          @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(6vw, -4vw); } }

          /* ===== Estrellas GRANDES (claras y con brillo) ===== */
          .stars {
            position: absolute; inset: 0;
            animation: scrollStars 220s linear infinite, twinkle 6.5s ease-in-out infinite alternate;
            will-change: background-position, filter, opacity;
          }
          /* Capa densa (pequeñas) */
          .stars.s1 {
            opacity: 0.45;
            background-image:
              radial-gradient(2px 2px at 12px 12px, rgba(255,255,255,0.95), transparent 60%),
              radial-gradient(1.6px 1.6px at 28px 40px, rgba(255,255,255,0.85), transparent 60%),
              radial-gradient(1.8px 1.8px at 52px 18px, rgba(255,255,255,0.85), transparent 60%),
              radial-gradient(2px 2px at 18px 64px, rgba(255,255,255,0.95), transparent 60%);
            background-size: 64px 64px;
            filter: drop-shadow(0 0 2px rgba(255,255,255,0.35));
          }
          /* Capa media (estrellas claras y visibles) */
          .stars.s2 {
            opacity: 0.40;
            background-image:
              radial-gradient(3.6px 3.6px at 22px 22px, #fff, transparent 55%),
              radial-gradient(3px 3px at 66px 50px, rgba(255,255,255,0.98), transparent 55%),
              radial-gradient(2.8px 2.8px at 90px 26px, rgba(255,255,255,0.95), transparent 55%);
            background-size: 120px 120px;
            animation-duration: 240s, 7s;
            filter:
              drop-shadow(0 0 4px rgba(255,255,255,0.45))
              drop-shadow(0 0 10px rgba(212,175,55,0.25));
          }
          /* Capa GRANDE (impacto inmediato) */
          .stars.s3 {
            opacity: 0.38;
            background-image:
              radial-gradient(6px 6px at 40px 40px, #fff, transparent 45%),
              radial-gradient(5px 5px at 120px 80px, rgba(255,255,255,0.98), transparent 45%);
            background-size: 220px 220px; /* separa estrellas grandes */
            animation-duration: 280s, 7.5s;
            filter:
              drop-shadow(0 0 6px rgba(255,255,255,0.6))
              drop-shadow(0 0 14px rgba(212,175,55,0.35));
          }
          @keyframes scrollStars {
            0% { background-position: 0 0, 0 0, 0 0, 0 0; }
            100% { background-position: 1800px 0, -1600px 0, 1400px 0, -1200px 0; }
          }
          @keyframes twinkle { 0% { filter: brightness(0.95); } 100% { filter: brightness(1.3); } }

          /* Halo/Aurora central para “wow” en el hero */
          .aurora {
            position: absolute; left: 50%; top: 16vh; transform: translateX(-50%);
            width: 120vw; height: 70vh; pointer-events: none;
            background:
              radial-gradient(60% 50% at 50% 40%, rgba(212,175,55,0.18), transparent 70%),
              radial-gradient(60% 50% at 50% 60%, rgba(59,130,246,0.14), transparent 70%);
            filter: blur(40px);
            opacity: 0.85;
          }

          /* Accesibilidad: si el usuario reduce movimiento, fija y baja opacidad */
          @media (prefers-reduced-motion: reduce) {
            .nebula, .stars { animation: none !important; }
            .nebula { opacity: .45; }
            .stars { opacity: .35; }
          }
        `}</style>
      </body>
    </html>
  );
}
