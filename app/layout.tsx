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
        {/* ===== SOLO UNA NUBE (suave y orgánica) ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* puffs elípticos (algodón) — más blur, menos opacidad, ligeras rotaciones */}
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

                {/* capa de suavizado global (fusiona puffs) */}
                <span className="oc-soften" />
                {/* textura muy sutil para romper uniformidad */}
                <span className="oc-texture" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL ===== */}
        <style>{`
/* APAGA fondos previos si quedaron en el proyecto */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Escenario único */
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

/* Contenedor de la nube (forma orgánica) */
.oc-cloud{
  position: relative;
  width: clamp(560px, 60vw, 1060px);
  height: clamp(200px, 24vw, 390px);
  margin-left: -34vw;  /* entra desde la derecha */
  will-change: transform;
  transform: translateZ(0);
  isolation: isolate;       /* fusiona capas sin artefactos */
}

/* Un puff = elipse suave con núcleo tenue + halo tibio */
.oc-puff{
  position:absolute; border-radius:50%;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.78) 0%, rgba(255,255,255,.46) 52%, rgba(255,255,255,0) 82%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.10) 0 70%, transparent 80%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.08) 0 70%, transparent 80%);
  filter: blur(18px);  /* MÁS blur = contornos muy suaves */
  opacity:.82;         /* MENOS blanco sólido */
  will-change: transform;
  transform: translateZ(0);
}

/* Suavizado global: fusiona bordes entre puffs */
.oc-soften{
  position:absolute; inset:-7%;
  background:
    radial-gradient(60% 60% at 50% 45%, rgba(255,255,255,.12), transparent 70%),
    radial-gradient(70% 70% at 50% 55%, rgba(255,255,255,.10), transparent 72%);
  filter: blur(22px);
  border-radius: 28px;
  opacity:.70;
}

/* Textura sutil para evitar discos perfectos */
.oc-texture{
  position:absolute; inset:-5%;
  background:
    radial-gradient(8px 6px at 20% 40%, rgba(255,255,255,.05), transparent 60%),
    radial-gradient(10px 7px at 60% 55%, rgba(255,255,255,.05), transparent 62%),
    radial-gradient(7px 5px  at 40% 70%, rgba(255,255,255,.04), transparent 64%),
    radial-gradient(9px 7px  at 70% 35%, rgba(255,255,255,.04), transparent 62%);
  filter: blur(7px);
  opacity:.42;
  border-radius: 28px;
}

/* --- Disposición de puffs (ELIPSES + ligeras rotaciones) --- */
/* fila superior (crestas irregulares) */
.p1  { width: 18%; height: 11%; left: 13%; top: 8%;  transform: rotate(-6deg); }
.p2  { width: 23%; height: 13%; left: 28%; top: 5%;  transform: rotate(4deg);  }
.p3  { width: 20%; height: 12%; left: 47%; top: 7%;  transform: rotate(-3deg); }
.p4  { width: 16%; height: 11%; left: 64%; top: 10%; transform: rotate(6deg);  }

/* fila media (volumen principal, quebrada) */
.p5  { width: 26%; height: 18%; left: 16%; top: 22%; transform: rotate(-4deg); }
.p6  { width: 33%; height: 21%; left: 36%; top: 19%; transform: rotate(2deg);  }
.p7  { width: 28%; height: 19%; left: 58%; top: 24%; transform: rotate(-2deg); }

/* rellenos intermedios */
.p8  { width: 14%; height: 10%; left: 8%;  top: 29%; transform: rotate(5deg);  }
.p9  { width: 12%; height: 10%; left: 77%; top: 27%; transform: rotate(-5deg); }
.p10 { width: 11%; height: 9%;  left: 87%; top: 31%; transform: rotate(3deg);  }

/* barriga inferior (ondulada) */
.p11 { width: 22%; height: 16%; left: 20%; top: 48%; transform: rotate(-3deg); }
.p12 { width: 26%; height: 18%; left: 41%; top: 50%; transform: rotate(2deg);  }
.p13 { width: 20%; height: 15%; left: 63%; top: 51%; transform: rotate(-2deg); }

/* puffs extra pequeños para romper patrón */
.p14 { width: 10%; height: 8%;  left: 33%; top: 33%; transform: rotate(-8deg); }
.p15 { width: 9%;  height: 7%;  left: 55%; top: 36%; transform: rotate(7deg); }

/* Animaciones (solo transform) */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-90vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.4vh,0); }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(330px, 92vw, 560px);
    height: clamp(150px, 36vw, 240px);
    margin-left: -46vw;
  }
  .oc-puff{ filter: blur(16px); opacity:.8; }
  .oc-soften{ filter: blur(20px); }
}
        `}</style>
      </body>
    </html>
  );
}
