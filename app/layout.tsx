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
        {/* ===== SOLO UNA NUBE (etérea y unida) ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* Capa de fusión inferior (une huecos desde abajo) */}
                <span className="oc-merge" />
                {/* Puffs elípticos suaves */}
                <span className="oc-puff p1" />
                <span className="oc-puff p2" />
                <span className="oc-puff p3" />
                <span className="oc-puff p4" />
                <span className="oc-puff p5" />
                <span className="oc-puff p6" />
                <span className="oc-puff p7" />
                <span className="oc-puff p8" />
                <span className="oc-puff p9" />
                <span className="oc-puff p10" />
                <span className="oc-puff p11" />
                <span className="oc-puff p12" />
                <span className="oc-puff p13" />
                <span className="oc-puff p14" />
                <span className="oc-puff p15" />
                {/* Suavizado superior (sella las uniones) */}
                <span className="oc-soften" />
                {/* Velo etéreo que baja el contraste */}
                <span className="oc-veil" />
                {/* Haze exterior muy suave */}
                <span className="oc-haze" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL ===== */}
        <style>{`
/* Apaga restos anteriores si existieran */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Escena única */
#oc-stage{ position: fixed; inset: 0; z-index:0; pointer-events:none; overflow: visible; }

/* Trayectoria: derecha -> izquierda (solo transform) */
#oc-drift{
  position:absolute; top: 28vh; left: 0; width:100%;
  transform: translate3d(110vw,0,0);
  animation: oc-drift 125s linear infinite;
}

/* Flotación vertical leve */
#oc-float{
  position:absolute; left: 0; top: 0;
  animation: oc-float 18s ease-in-out infinite alternate;
}

/* Contenedor de la nube */
.oc-cloud{
  position: relative;
  width: clamp(580px, 62vw, 1080px);
  height: clamp(210px, 25vw, 400px);
  margin-left: -36vw;      /* entra desde la derecha */
  isolation: isolate;      /* ayuda a fusionar sin artefactos */
  transform: translateZ(0);
}

/* --- Capas de unión y etéreas --- */
/* Une por debajo: rellenos grandes, muy difusos y poco opacos */
.oc-merge{
  position:absolute; inset: -8% -10%;
  background:
    radial-gradient(60% 50% at 40% 45%, rgba(255,255,255,.18), transparent 72%),
    radial-gradient(70% 55% at 62% 55%, rgba(255,255,255,.16), transparent 74%),
    radial-gradient(80% 60% at 52% 52%, rgba(212,175,55,.08), transparent 76%),
    radial-gradient(70% 60% at 48% 48%, rgba(59,130,246,.06), transparent 78%);
  filter: blur(28px);
  opacity:.55;
  border-radius: 32px;
  z-index: 0;
}

/* Sella uniones por arriba: más blur, menos opacidad */
.oc-soften{
  position:absolute; inset:-7%;
  background:
    radial-gradient(60% 60% at 50% 45%, rgba(255,255,255,.12), transparent 70%),
    radial-gradient(70% 70% at 50% 55%, rgba(255,255,255,.10), transparent 72%);
  filter: blur(24px);
  border-radius: 30px;
  opacity:.60;
  z-index: 3;
}

/* Velo etéreo: baja contraste general de la nube */
.oc-veil{
  position:absolute; inset:-6%;
  background:
    radial-gradient(85% 70% at 55% 50%, rgba(255,255,255,.10), transparent 80%);
  filter: blur(10px);
  opacity:.45;
  border-radius: 28px;
  z-index: 4;
}

/* Haze exterior: halo sutil alrededor, muy tenue */
.oc-haze{
  position:absolute; inset:-10%;
  background:
    radial-gradient(90% 80% at 50% 50%, rgba(255,255,255,.08), transparent 85%);
  filter: blur(20px);
  opacity:.35;
  border-radius: 36px;
  z-index: 1;
}

/* --- Puffs elípticos etéreos (menos opacidad, más blur) --- */
.oc-puff{
  position:absolute; border-radius:50%;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.70) 0%, rgba(255,255,255,.40) 52%, rgba(255,255,255,0) 82%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.08) 0 70%, transparent 80%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.06) 0 70%, transparent 80%);
  filter: blur(20px);  /* más difuso */
  opacity:.78;         /* más etéreo */
  transform: translateZ(0);
  z-index: 2;
}

/* --- Disposición (elipses + ligeras rotaciones) --- */
/* fila superior (crestas) */
.p1  { width: 18%; height: 11%; left: 12%; top: 9%;  transform: rotate(-6deg); }
.p2  { width: 23%; height: 13%; left: 27%; top: 6%;  transform: rotate(4deg);  }
.p3  { width: 20%; height: 12%; left: 46%; top: 8%;  transform: rotate(-3deg); }
.p4  { width: 16%; height: 11%; left: 63%; top: 11%; transform: rotate(6deg);  }

/* fila media (volumen principal) */
.p5  { width: 26%; height: 18%; left: 15%; top: 23%; transform: rotate(-4deg); }
.p6  { width: 33%; height: 21%; left: 35%; top: 20%; transform: rotate(2deg);  }
.p7  { width: 28%; height: 19%; left: 57%; top: 25%; transform: rotate(-2deg); }

/* rellenos intermedios */
.p8  { width: 14%; height: 10%; left: 7%;  top: 30%; transform: rotate(5deg);  }
.p9  { width: 12%; height: 10%; left: 76%; top: 28%; transform: rotate(-5deg); }
.p10 { width: 11%; height: 9%;  left: 86%; top: 32%; transform: rotate(3deg);  }

/* barriga inferior (ondulada) */
.p11 { width: 22%; height: 16%; left: 19%; top: 49%; transform: rotate(-3deg); }
.p12 { width: 26%; height: 18%; left: 40%; top: 51%; transform: rotate(2deg);  }
.p13 { width: 20%; height: 15%; left: 62%; top: 52%; transform: rotate(-2deg); }

/* puffs extra pequeños para romper patrón */
.p14 { width: 10%; height: 8%;  left: 32%; top: 34%; transform: rotate(-8deg); }
.p15 { width: 9%;  height: 7%;  left: 54%; top: 37%; transform: rotate(7deg); }

/* Animaciones (solo transform) */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-92vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.2vh,0); }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(330px, 92vw, 580px);
    height: clamp(150px, 38vw, 240px);
    margin-left: -46vw;
  }
  .oc-merge{ filter: blur(24px); opacity:.5; }
  .oc-soften{ filter: blur(22px); opacity:.55; }
  .oc-veil{ opacity:.40; }
  .oc-haze{ opacity:.30; }
  .oc-puff{ filter: blur(18px); opacity:.76; }
}
        `}</style>
      </body>
    </html>
  );
}
