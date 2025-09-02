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
        {/* ===== NUBE ÚNICA (ligera, con aire entre puffs) ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* Fusión MUY ligera para cerrar microgrietas (no “rellena” de más) */}
                <span className="oc-merge" />
                {/* Puffs elípticos equilibrados (22) */}
                <span className="oc-puff rp1" />
                <span className="oc-puff rp2" />
                <span className="oc-puff rp3" />
                <span className="oc-puff rp4" />
                <span className="oc-puff rp5" />
                <span className="oc-puff rp6" />
                <span className="oc-puff rp7" />
                <span className="oc-puff rp8" />
                <span className="oc-puff rp9" />
                <span className="oc-puff rp10" />
                <span className="oc-puff rp11" />
                <span className="oc-puff rp12" />
                <span className="oc-puff rp13" />
                <span className="oc-puff rp14" />
                <span className="oc-puff rp15" />
                <span className="oc-puff rp16" />
                <span className="oc-puff rp17" />
                <span className="oc-puff rp18" />
                <span className="oc-puff rp19" />
                <span className="oc-puff rp20" />
                <span className="oc-puff rp21" />
                <span className="oc-puff rp22" />
                {/* Suavizado y velo sutiles */}
                <span className="oc-soften" />
                <span className="oc-veil" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        <style>{`
/* Apaga fondos previos si existieran */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Escena única */
#oc-stage{ position: fixed; inset: 0; z-index:0; pointer-events:none; overflow: visible; }

/* Movimiento R→L y flotación (solo transform → sin flicker) */
#oc-drift{
  position:absolute; top: 28vh; left: 0; width:100%;
  transform: translate3d(110vw,0,0);
  animation: oc-drift 120s linear infinite;
}
#oc-float{
  position:absolute; left: 0; top: 0;
  animation: oc-float 18s ease-in-out infinite alternate;
}

.oc-cloud{
  position: relative;
  width: clamp(600px, 64vw, 1100px);
  height: clamp(210px, 26vw, 390px);
  margin-left: -38vw;          /* entra desde la derecha */
  isolation: isolate;
  transform: translateZ(0);
}

/* Fusión MUY ligera (no bloquea la luz entre puffs) */
.oc-merge{
  position:absolute; inset:-5% -7%;
  background:
    radial-gradient(70% 60% at 50% 50%, rgba(255,255,255,.18), transparent 84%),
    radial-gradient(60% 50% at 42% 56%, rgba(255,255,255,.14), transparent 86%),
    radial-gradient(62% 50% at 58% 44%, rgba(255,255,255,.14), transparent 86%);
  filter: blur(12px);
  opacity:.35;                 /* bajito para no “tapar” gaps naturales */
  border-radius: 28px;
  z-index: 0;
}

/* Puffs: más transparentes, blur medio, toques dorado/azul MUY suaves */
.oc-puff{
  position:absolute; border-radius:50%;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.68) 0%, rgba(255,255,255,.42) 54%, rgba(255,255,255,0) 82%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.06) 0 70%, transparent 80%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.05) 0 70%, transparent 80%);
  filter: blur(12px);
  opacity:.78;                 /* ≪ antes .88: ahora respira */
  transform: translateZ(0);
  z-index: 1;
}

/* Suavizado y velo sutil para unir sin matar el “aire” */
.oc-soften{
  position:absolute; inset:-5%;
  background:
    radial-gradient(62% 60% at 50% 48%, rgba(255,255,255,.10), transparent 76%),
    radial-gradient(70% 66% at 50% 52%, rgba(255,255,255,.08), transparent 78%);
  filter: blur(14px);
  opacity:.42;
  border-radius: 26px;
  z-index: 2;
}
.oc-veil{
  position:absolute; inset:-4%;
  background: radial-gradient(86% 70% at 54% 50%, rgba(255,255,255,.08), transparent 82%);
  filter: blur(8px);
  opacity:.28;
  border-radius: 24px;
  z-index: 3;
}

/* ===== Distribución (22 puffs) — con AIRE entre ellos ===== */
/* fila 1 (crestas) */
.rp1  { width:16%; height:11%; left:14%; top:10%; transform: rotate(-6deg); }
.rp2  { width:19%; height:12%; left:28%; top:8%;  transform: rotate(4deg);  }
.rp3  { width:17%; height:11%; left:44%; top:9%;  transform: rotate(-3deg); }
.rp4  { width:15%; height:10%; left:58%; top:10%; transform: rotate(3deg);  }
.rp5  { width:14%; height:10%; left:72%; top:12%; transform: rotate(-5deg); }

/* fila 2 (alto medio) */
.rp6  { width:20%; height:14%; left:16%; top:18%; transform: rotate(-4deg); }
.rp7  { width:22%; height:15%; left:34%; top:17%; transform: rotate(2deg);  }
.rp8  { width:20%; height:14%; left:52%; top:18%; transform: rotate(-2deg); }
.rp9  { width:18%; height:13%; left:70%; top:20%; transform: rotate(2deg);  }

/* fila 3 (medio — volumen principal) */
.rp10 { width:24%; height:17%; left:14%; top:28%; transform: rotate(-3deg); }
.rp11 { width:26%; height:18%; left:36%; top:26%; transform: rotate(2deg);  }
.rp12 { width:24%; height:17%; left:58%; top:28%; transform: rotate(-2deg); }

/* fila 4 (barriga) */
.rp13 { width:22%; height:16%; left:12%; top:40%; transform: rotate(-3deg); }
.rp14 { width:24%; height:17%; left:34%; top:38%; transform: rotate(2deg);  }
.rp15 { width:22%; height:16%; left:56%; top:40%; transform: rotate(-2deg); }
.rp16 { width:18%; height:14%; left:76%; top:42%; transform: rotate(2deg);  }

/* fila 5 (borde inferior ondulado — deja respiración) */
.rp17 { width:18%; height:13%; left:18%; top:51%; transform: rotate(-3deg); }
.rp18 { width:20%; height:14%; left:36%; top:50%; transform: rotate(2deg);  }
.rp19 { width:18%; height:13%; left:54%; top:51%; transform: rotate(-2deg); }
.rp20 { width:16%; height:12%; left:70%; top:52%; transform: rotate(2deg);  }

/* extras pequeños para disimular microgrietas puntuales */
.rp21 { width:9%;  height:7%; left:30%; top:33%; transform: rotate(-8deg); }
.rp22 { width:9%;  height:7%; left:50%; top:34%; transform: rotate(7deg);  }

/* Animaciones */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-92vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.1vh,0); }
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  #oc-drift, #oc-float { animation: none !important; }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(360px, 92vw, 600px);
    height: clamp(160px, 38vw, 240px);
    margin-left: -48vw;
  }
  .oc-merge{ filter: blur(10px); opacity:.30; }
  .oc-puff{ filter: blur(11px); opacity:.76; }
  .oc-soften{ filter: blur(12px); opacity:.38; }
  .oc-veil{ opacity:.24; }
}
        `}</style>
      </body>
    </html>
  );
}
