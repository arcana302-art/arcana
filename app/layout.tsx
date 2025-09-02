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
        {/* ===== SOLO UNA NUBE ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* puffs que forman la silueta “algodón” */}
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
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS GLOBAL ===== */}
        <style>{`
/* APAGA cualquier fondo previo (si quedó código viejo en el proyecto) */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Escenario único para la nube */
#oc-stage{ position: fixed; inset: 0; z-index:0; pointer-events:none; overflow: visible; }

/* Trayectoria: derecha -> izquierda (sin flicker: sólo translate3d) */
#oc-drift{
  position:absolute; top: 28vh; left: 0; width:100%;
  transform: translate3d(110vw,0,0);
  animation: oc-drift 95s linear infinite;
}

/* Flotación vertical suave */
#oc-float{
  position:absolute; left: 0; top: 0;
  animation: oc-float 18s ease-in-out infinite alternate;
}

/* Contenedor de la nube (forma orgánica) */
.oc-cloud{
  position: relative;
  width: clamp(480px, 52vw, 980px);
  height: clamp(180px, 22vw, 360px);
  margin-left: -26vw;  /* inicia entrando desde la derecha */
  will-change: transform;
  transform: translateZ(0);
}

/* Un puff = círculo suave con núcleo blanco y halo tibio */
.oc-puff{
  position:absolute; border-radius:50%; aspect-ratio: 1 / 1;
  background:
    radial-gradient(closest-side, rgba(255,255,255,.98) 0%, rgba(255,255,255,.98) 56%, transparent 72%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.16), transparent 70%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.14), transparent 70%);
  filter: blur(8px);   /* blur estático (no animado) */
  opacity:.98;
  will-change: transform;
  transform: translateZ(0);
}

/* Disposición (porcentajes relativos al contenedor) */
/* fila superior */
.p1 { width: 18%; left: 18%; top: 6%; }
.p2 { width: 22%; left: 33%; top: 4%; }
.p3 { width: 19%; left: 50%; top: 6%; }
.p4 { width: 15%; left: 65%; top: 8%; }
/* fila media (crestas) */
.p5  { width: 28%; left: 20%; top: 20%; }
.p6  { width: 34%; left: 38%; top: 18%; }
.p7  { width: 30%; left: 58%; top: 22%; }
/* relleno medio */
.p8  { width: 16%; left: 11%; top: 26%; }
.p9  { width: 14%; left: 77%; top: 26%; }
.p10 { width: 12%; left: 86%; top: 30%; }
/* barriga inferior */
.p11 { width: 26%; left: 25%; top: 46%; }
.p12 { width: 28%; left: 46%; top: 48%; }
.p13 { width: 22%; left: 67%; top: 50%; }

/* Animaciones */
@keyframes oc-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-80vw,0,0); }
}
@keyframes oc-float {
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(0,1.6vh,0); }
}

/* Responsivo */
@media (max-width: 640px){
  #oc-drift{ top: 24vh; }
  .oc-cloud{
    width: clamp(320px, 90vw, 560px);
    height: clamp(140px, 34vw, 240px);
    margin-left: -45vw;
  }
  .oc-puff{ filter: blur(7px); }
}
        `}</style>
      </body>
    </html>
  );
}
