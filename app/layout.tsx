// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
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
        {/* ===== CIELO (tres nubes; inferior con ascenso épico; color intenso + glow) ===== */}
        {/* Importante: #sky inicia oculto; se muestra solo cuando los 3 canvas están pintados */}
        <div id="sky" aria-hidden>
          {/* Nube superior */}
          <div className="cloud-track track-a">
            <div className="rise rise-a">
              <div className="cloud-wrap wrap-a">
                <canvas id="cloudA" className="cloud cloud-a" />
                <div className="veil veil-a" />
                <div className="glow glow-a" />
              </div>
            </div>
          </div>
          {/* Nube central (tamaño intermedio y separada de la inferior) */}
          <div className="cloud-track track-c">
            <div className="rise rise-c">
              <div className="cloud-wrap wrap-c">
                <canvas id="cloudC" className="cloud cloud-c" />
                <div className="veil veil-c" />
                <div className="glow glow-c" />
              </div>
            </div>
          </div>
          {/* Nube inferior */}
          <div className="cloud-track track-b">
            <div className="rise rise-b">
              <div className="cloud-wrap wrap-b">
                <canvas id="cloudB" className="cloud cloud-b" />
                <div className="veil veil-b" />
                <div className="glow glow-b" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* Limpia restos antiguos */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

/* #sky arranca oculto para evitar CUALQUIER flash */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; visibility: hidden; }
#sky.ready { visibility: visible; } /* sin transiciones, aparece cuando ya está pintado */

/* ------ Deriva horizontal (solo X); inician fuera de pantalla ------ */
.cloud-track {
  position: absolute; left: 0; width: 100%;
  will-change: transform;
  transform: translateX(120vw); /* offscreen de inicio */
}
.track-a { top: 12vh; animation: cloud-drift-a 150s linear infinite; }
.track-c { top: 42vh; animation: cloud-drift-c 165s linear infinite; animation-delay: 2s; }
.track-b { top: 72vh; animation: cloud-drift-b 180s linear infinite; animation-delay: 4s; }

@keyframes cloud-drift-a {
  0%   { transform: translateX(110vw); }
  100% { transform: translateX(-100vw); }
}
@keyframes cloud-drift-c {
  0%   { transform: translateX(112vw); }
  100% { transform: translateX(-102vw); }
}
@keyframes cloud-drift-b {
  0%   { transform: translateX(115vw); }
  100% { transform: translateX(-105vw); }
}

/* ------ Ascenso vertical (solo Y) ------ */
.rise { will-change: transform; }
.rise-a { animation: cloud-rise-a 150s linear infinite; }
.rise-c { animation: cloud-rise-c 165s linear infinite; animation-delay: 2s; }
.rise-b { animation: cloud-rise-b 180s linear infinite; animation-delay: 4s; }

@keyframes cloud-rise-a {
  0%   { transform: translateY(1.5vh); }
  100% { transform: translateY(-2.4vh); }
}
/* Central: ascenso moderado y separada de la inferior */
@keyframes cloud-rise-c {
  0%   { transform: translateY(10vh); }
  100% { transform: translateY(-22vh); }
}
/* Inferior: ascenso épico (~104vh) */
@keyframes cloud-rise-b {
  0%   { transform: translateY(24vh); }
  100% { transform: translateY(-80vh); }
}

/* Flotación sutil (independiente) */
.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 17s ease-in-out infinite alternate; }
.wrap-c { animation: cloud-float-c 19s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 22s ease-in-out infinite alternate; }

@keyframes cloud-float-a { 0% { transform: translateY(0); } 100% { transform: translateY(0.9vh); } }
@keyframes cloud-float-c { 0% { transform: translateY(0); } 100% { transform: translateY(1.1vh); } }
@keyframes cloud-float-b { 0% { transform: translateY(0); } 100% { transform: translateY(1.5vh); } }

/* Los canvas y velos también empiezan ocultos hasta que el script declara ready */
.cloud, .veil, .glow { visibility: hidden; }

.cloud {
  display:block;
  width: min(42vw, 700px);
  height: calc(min(42vw, 700px) * 0.40625);
  aspect-ratio: 16 / 6.5;
  background:
    radial-gradient(60% 50% at 50% 52%, rgba(255,255,255,.26) 0%, rgba(255,255,255,.13) 45%, rgba(255,255,255,0) 72%),
    radial-gradient(40% 50% at 28% 40%, rgba(210,175,255,0.12), transparent 70%),
    radial-gradient(42% 52% at 72% 62%, rgba(255,125,205,0.10), transparent 72%);
  filter: blur(24px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  border-radius: 9999px/60%;
}

/* Tamaños */
.cloud-a {
  width: min(52vw, 860px);
  height: calc(min(52vw, 860px) * 0.40625);
  opacity: 0.70;
}
.cloud-c { /* intermedia entre A y B */
  width: min(56vw, 920px);
  height: calc(min(56vw, 920px) * 0.40625);
  opacity: 0.74;
  transform: scale(1.01);
}
.cloud-b {
  width: min(62vw, 980px);
  height: calc(min(62vw, 980px) * 0.40625);
  opacity: 0.76;
  transform: scale(1.02);
}

/* Velo de luz intenso (blend SCREEN) */
.veil {
  position:absolute; inset: -14% -8%;
  background:
    radial-gradient(50% 62% at 24% 42%, rgba(168,85,247,0.44), transparent 66%),
    radial-gradien
