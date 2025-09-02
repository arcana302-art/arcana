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
        {/* ===== SOLO UNA NUBE SUAVE ===== */}
        <div id="oc-stage" aria-hidden>
          <div id="oc-drift">
            <div id="oc-float">
              <div className="oc-cloud">
                {/* puffs elípticos (algodón) */}
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

/* Trayectoria: derecha -> izquierda (solo transform) */
#oc-drift{
  position:absolute; top: 28vh; left: 0; width:100%;
  transform: translate3d(110vw,0,0);
  animation: oc-drift 110s linear infinite;
}

/* Flotación vertical leve */
#oc-float{
  position:absolute; left: 0; top: 0;
  animation: oc-float 18s ease-in-out infinite alternate;
}

/* Contenedor de la nube (forma orgánica) */
.oc-cloud{
  position: relative;
  width: clamp(520px, 56vw, 1000px);
  height: clamp(180px, 22vw, 360px);
  margin-left: -30vw;  /* entra desde la derecha */
  will-change: transform;
  transform: translateZ(0);
}

/* Un puff = elipse suave con núcleo menos brillante + halo tibio */
.oc-puff{
  position:absolute; border-radius:50%;
  /* 👉 ya no usamos aspect-ratio 1:1; cada puff tendrá width/height propias (elipse) */
  background:
    radial-gradient(closest-side, rgba(255,255,255,.88) 0%, rgba(255,255,255,.58) 58%, rgba(255,255,255,0) 82%),
    radial-gradient(70% 60% at 60% 40%, rgba(212,175,55,.10) 0 70%, transparent 80%),
    radial-gradient(70% 60% at 40% 60%, rgba(59,130,246,.08) 0 70%, transparent 80%);
  filter: blur(12px);   /* blur estático (no animado) */
  opacity:.92;          /* menos blanco sólido */
  will-change: transform;
  transform: translateZ(0);
}

/* Suavizado global: fusiona bordes entre puffs */
.oc-soften{
  position:absolute; inset:-6%;
  background:
    radial-gradient(60% 60% at 50% 45%, rgba(255,255,255,.16), transparent 70%),
    radial-gradient(70% 70% at 50% 55%, rgba(255,255,255,.12), transparent 72%);
  filter: blur(14px);
  border-radius: 20px;
  opacity:.85;
}

/* Textura sutil para evitar discos perfectos */
.oc-texture{
  position:absolute; inset:-4%;
  background:
    radial-gradient(8px 6px at 20% 40%, rgba(255,255,255,.06), transparent 60%),
    radial-gradient(10px 7px at 60% 55%, rgba(255,255,255,.05), transparent 62%),
    radial-gradient(7px 5px  at 40% 70%, rgba(255,255,255,.05), transparent 64%);
  filter: blur(6px);
  opacity:.5;
  border-radius: 20px;
}

/* --- Disposición de puffs (elipses) --- */
/* fila superior (crestas) */
.p1 { width: 18%; height: 12%; left: 16%; top: 6%; }
.p2 { width: 22%; height: 14%; left: 30%; top: 4%; }
.p3 { width: 20%; height: 13%; left: 48%; top: 6%; }
.p4 { width: 16%; height: 12%; left: 64%; top: 9%; }

/* fila media (volumen) */
.p5  { width: 28%; height: 20%; left: 18%; top: 20%; }
.p6  { width: 34%; height: 22%; left: 38%; top: 18%; }
.p7  { width: 30%; height: 20%; left: 58%; top: 22%; }

/* relleno medio */
.p8  { width: 16%; height: 12%; left: 10%; top: 28%; }
.p9  { width: 14%; height: 11%; left: 76%; top: 26%; }
.p10 { width: 13%; height: 10%; left: 86%; top: 30%; }

/* barriga inferior (suave, más ancha) */
.p11 { width: 28%; height: 18%; left: 22%; top: 46%; }
.p12 { width: 30%; height: 20%; left: 44%; top: 48%; }
.p13 { width: 24%; height: 16%; left: 66%; top: 50%; }

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
    width: clamp(330px, 90vw, 560px);
    height: clamp(140px, 34vw, 240px);
    margin-left: -46vw;
  }
  .oc-puff{ filter: blur(10px); opacity:.9; }
  .oc-soften{ filter: blur(12px); }
}
        `}</style>
      </body>
    </html>
  );
}
