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
        {/* ===== SOLO UNA NUBE (UNIDA, SIN ESPACIOS) ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* Capa base: silueta continua a lo largo de toda la nube */}
                <span className="oc-base" />
                {/* Masa sólida interior: rellena completamente la forma */}
                <span className="oc-solid" />
                {/* Fusión inferior: termina de cerrar huecos por debajo */}
                <span className="oc-merge" />
                {/* Suavizado superior: unifica bordes y transiciones */}
                <span className="oc-soften" />
                {/* Velo etéreo + halo exterior para naturalidad */}
                <span className="oc-veil" />
                <span className="oc-haze" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL ===== */}
        <style>{`
/* Apaga fondos previos si existieran */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Escena única */
#oc-stage{ position: fixed; inset: 0; z-index:0; pointer-events:none; overflow: visible; }

/* Trayectoria: derecha -> izquierda (solo transform; sin filtros animados) */
#oc-drift{
  position:absolute; top: 28vh; left: 0; width:100%;
  transform: translate3d(110vw,0,0);
  animation: oc-drift 120s linear infinite;
}

/* Flotación vertical leve */
#oc-float{
  position:absolute; left: 0; top: 0;
  animation: oc-float 18s ease-in-out infinite alternate;
}

/* Contenedor de la nube */
.oc-cloud{
  position: relative;
  width: clamp(600px, 64vw, 1120px);
  height: clamp(220px, 26vw, 410px);
  margin-left: -38vw;   /* entra desde la derecha */
  isolation: isolate;
  transform: translateZ(0);
}

/* ========= CAPAS DE UNA SOLA NUBE (SIN HUECOS) ========= */
/* 1) BASE: múltiples radiales grandes que construyen la silueta continua */
.oc-base{
  position:absolute; inset:-6% -8%;
  background:
    /* crestas altas */
    radial-gradient(34% 24% at 22% 24%, rgba(255,255,255,.85) 56%, transparent 85%),
    radial-gradient(40% 26% at 42% 20%, rgba(255,255,255,.82) 58%, transparent 86%),
    radial-gradient(32% 23% at 62% 24%, rgba(255,255,255,.84) 56%, transparent 85%),
    radial-gradient(28% 22% at 78% 27%, rgba(255,255,255,.80) 54%, transparent 84%),
    /* vientre medio */
    radial-gradient(48% 30% at 36% 46%, rgba(255,255,255,.86) 62%, transparent 86%),
    radial-gradient(52% 32% at 60% 44%, rgba(255,255,255,.84) 64%, transparent 86%),
    /* barriga inferior ondulada */
    radial-gradient(38% 26% at 28% 66%, rgba(255,255,255,.80) 58%, transparent 86%),
    radial-gradient(44% 28% at 50% 68%, rgba(255,255,255,.82) 60%, transparent 86%),
    radial-gradient(36% 24% at 70% 70%, rgba(255,255,255,.78) 58%, transparent 86%),
    /* tonos muy suaves dorado/azul para profundidad */
    radial-gradient(70% 55% at 48% 52%, rgba(212,175,55,.10), transparent 86%),
    radial-gradient(68% 55% at 52% 50%, rgba(59,130,246,.08), transparent 86%);
  filter: blur(18px);
  opacity:.96;
  border-radius: 36px;
  z-index: 1;
}

/* 2) SOLID: masa interior que rellena por completo (cuerpo) */
.oc-solid{
  position:absolute; inset:-4% -5%;
  background:
    radial-gradient(80% 65% at 50% 50%, rgba(255,255,255,.82) 0%, rgba(255,255,255,.66) 42%, rgba(255,255,255,.40) 70%, transparent 88%);
  filter: blur(20px);
  opacity:.94;            /* da cuerpo y elimina huecos */
  border-radius: 36px;
  z-index: 2;
}

/* 3) MERGE: fusión inferior y lateral para cerrar cualquier corte */
.oc-merge{
  position:absolute; inset:-8% -10%;
  background:
    radial-gradient(70% 55% at 45% 58%, rgba(255,255,255,.26), transparent 80%),
    radial-gradient(68% 55% at 55% 56%, rgba(255,255,255,.22), transparent 82%);
  filter: blur(22px);
  opacity:.70;
  border-radius: 40px;
  z-index: 0;
}

/* 4) SOFTEN: suavizado superior que unifica transiciones */
.oc-soften{
  position:absolute; inset:-6%;
  background:
    radial-gradient(60% 60% at 50% 45%, rgba(255,255,255,.14), transparent 72%),
    radial-gradient(70% 70% at 50% 55%, rgba(255,255,255,.12), transparent 74%);
  filter: blur(20px);
  opacity:.68;
  border-radius: 34px;
  z-index: 3;
}

/* 5) Velo + Halo: apariencia más etérea sin abrir huecos */
.oc-veil{
  position:absolute; inset:-5%;
  background: radial-gradient(88% 72% at 55% 52%, rgba(255,255,255,.10), transparent 84%);
  filter: blur(12px);
  opacity:.42;
  border-radius: 34px;
  z-index: 4;
}
.oc-haze{
  position:absolute; inset:-10%;
  background: radial-gradient(92% 84% at 50% 50%, rgba(255,255,255,.08), transparent 88%);
  filter: blur(22px);
  opacity:.34;
  border-radius: 40px;
  z-index: 1;
}

/* Animaciones (solo transform) */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-92vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.1vh,0); }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(340px, 92vw, 600px);
    height: clamp(160px, 38vw, 250px);
    margin-left: -48vw;
  }
  .oc-base{ filter: blur(16px); }
  .oc-solid{ filter: blur(18px); opacity:.93; }
  .oc-merge{ filter: blur(20px); opacity:.66; }
  .oc-soften{ filter: blur(18px); opacity:.64; }
  .oc-veil{ opacity:.38; }
  .oc-haze{ opacity:.30; }
}
        `}</style>
      </body>
    </html>
  );
}
