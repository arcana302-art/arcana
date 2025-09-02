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
        {/* ===== NUBE ÚNICA CON PUFFS EMPALMADOS ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* Capa “mortero” trasera: rellena microhuecos detrás de los puffs */}
                <span className="oc-mortar back" />
                {/* Puffs elípticos MUY empalmados (sin huecos) */}
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className={`oc-puff rp${i + 1}`} />
                ))}
                {/* Capa “mortero” delantera: sella y suaviza uniones por arriba */}
                <span className="oc-mortar front" />
                {/* Halo/velo etéreo para naturalidad */}
                <span className="oc-veil" />
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
  width: clamp(620px, 66vw, 1180px);
  height: clamp(230px, 28vw, 430px);
  margin-left: -40vw;        /* entra desde la derecha */
  isolation: isolate;
  transform: translateZ(0);
}

/* ===== MORTERO (relleno difuso para cerrar microgrietas) ===== */
.oc-mortar{
  position:absolute; inset:-7% -9%;
  background:
    radial-gradient(75% 65% at 50% 50%, rgba(255,255,255,.30), transparent 88%),
    radial-gradient(60% 55% at 42% 44%, rgba(255,255,255,.22), transparent 86%),
    radial-gradient(62% 58% at 58% 56%, rgba(255,255,255,.22), transparent 86%),
    radial-gradient(70% 60% at 50% 52%, rgba(212,175,55,.08), transparent 88%),
    radial-gradient(68% 60% at 50% 48%, rgba(59,130,246,.06), transparent 88%);
  border-radius: 40px;
}
.oc-mortar.back  { filter: blur(24px); opacity:.60; z-index: 0; }
.oc-mortar.front { filter: blur(18px); opacity:.42; z-index: 3; }

/* ===== PUFFS EMPALMADOS (casi pegados) =====
   - Opacidad relativamente alta y blur moderado para que el solape sea suave pero llene.
   - Elipses con ligeras rotaciones para romper geometría.
   - MUCHA superposición (los centros están muy cerca).
*/
.oc-puff{
  position:absolute; border-radius:50%;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.88) 0%, rgba(255,255,255,.62) 56%, rgba(255,255,255,0) 82%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.08) 0 70%, transparent 80%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.06) 0 70%, transparent 80%);
  filter: blur(14px);
  opacity:.88;
  transform: translateZ(0);
  z-index: 2;
}

/* ===== DISTRIBUCIÓN: 6 filas con fuerte solape =====
   Nota: porcentajes relativos al tamaño de .oc-cloud
*/
/* Fila 1 (crestas altas) */
.rp1  { width:18%; height:12%; left:12%; top:8%;  transform: rotate(-6deg); }
.rp2  { width:22%; height:14%; left:24%; top:6%;  transform: rotate(4deg);  }
.rp3  { width:20%; height:13%; left:38%; top:7%;  transform: rotate(-3deg); }
.rp4  { width:18%; height:12%; left:52%; top:8%;  transform: rotate(3deg);  }
.rp5  { width:16%; height:11%; left:66%; top:10%; transform: rotate(6deg);  }
.rp6  { width:14%; height:10%; left:78%; top:12%; transform: rotate(-5deg); }

/* Fila 2 (alto medio) — solape fuerte con F1 y F3 */
.rp7  { width:24%; height:16%; left:14%; top:16%; transform: rotate(-4deg); }
.rp8  { width:26%; height:18%; left:30%; top:15%; transform: rotate(2deg);  }
.rp9  { width:24%; height:17%; left:48%; top:16%; transform: rotate(-2deg); }
.rp10 { width:22%; height:16%; left:64%; top:18%; transform: rotate(2deg);  }
.rp11 { width:18%; height:14%; left:78%; top:20%; transform: rotate(-3deg); }

/* Fila 3 (media) — volumen principal */
.rp12 { width:28%; height:20%; left:12%; top:26%; transform: rotate(-3deg); }
.rp13 { width:32%; height:22%; left:32%; top:24%; transform: rotate(2deg);  }
.rp14 { width:30%; height:21%; left:54%; top:26%; transform: rotate(-2deg); }
.rp15 { width:22%; height:18%; left:76%; top:28%; transform: rotate(2deg);  }

/* Fila 4 (barriga) — muy empalmada con F3 y F5 */
.rp16 { width:26%; height:19%; left:10%; top:38%; transform: rotate(-3deg); }
.rp17 { width:30%; height:21%; left:30%; top:36%; transform: rotate(2deg);  }
.rp18 { width:28%; height:20%; left:52%; top:38%; transform: rotate(-2deg); }
.rp19 { width:24%; height:18%; left:72%; top:40%; transform: rotate(2deg);  }

/* Fila 5 (borde inferior ondulado) */
.rp20 { width:22%; height:16%; left:14%; top:50%; transform: rotate(-3deg); }
.rp21 { width:26%; height:18%; left:34%; top:49%; transform: rotate(2deg);  }
.rp22 { width:24%; height:17%; left:56%; top:50%; transform: rotate(-2deg); }
.rp23 { width:20%; height:15%; left:76%; top:52%; transform: rotate(2deg);  }

/* Fila 6 (remate y cierre) */
.rp24 { width:16%; height:12%; left:18%; top:60%; transform: rotate(-4deg); }
.rp25 { width:18%; height:13%; left:34%; top:60%; transform: rotate(3deg);  }
.rp26 { width:16%; height:12%; left:50%; top:60%; transform: rotate(-3deg); }
.rp27 { width:14%; height:11%; left:66%; top:61%; transform: rotate(3deg);  }

/* Extras pequeños para tapar cualquier microhueco (dispersos) */
.rp28 { width:10%; height:8%; left:26%; top:22%; transform: rotate(-8deg); }
.rp29 { width:9%;  height:7%; left:46%; top:22%; transform: rotate(7deg);  }
.rp30 { width:10%; height:8%; left:66%; top:22%; transform: rotate(-6deg); }
.rp31 { width:9%;  height:7%; left:26%; top:44%; transform: rotate(6deg);  }
.rp32 { width:10%; height:8%; left:46%; top:44%; transform: rotate(-7deg); }
.rp33 { width:9%;  height:7%; left:66%; top:44%; transform: rotate(6deg);  }
.rp34 { width:8%;  height:6%; left:36%; top:32%; transform: rotate(9deg);  }
.rp35 { width:8%;  height:6%; left:56%; top:32%; transform: rotate(-9deg); }
.rp36 { width:8%;  height:6%; left:46%; top:54%; transform: rotate(8deg);  }

/* Velo/Halo etéreo (muy sutil) */
.oc-veil{
  position:absolute; inset:-6%;
  background:
    radial-gradient(88% 72% at 55% 52%, rgba(255,255,255,.10), transparent 84%);
  filter: blur(10px);
  opacity:.40;
  border-radius: 36px;
  z-index: 4;
}

/* Animaciones (solo transform) */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-94vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.1vh,0); }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(360px, 94vw, 620px);
    height: clamp(170px, 40vw, 260px);
    margin-left: -50vw;
  }
  .oc-mortar.back  { filter: blur(22px); opacity:.56; }
  .oc-mortar.front { filter: blur(16px); opacity:.40; }
  .oc-puff{ filter: blur(12px); opacity:.86; }
  .oc-veil{ opacity:.36; }
}
        `}</style>
      </body>
    </html>
  );
}
