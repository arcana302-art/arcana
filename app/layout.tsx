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
        {/* ===== UNA SOLA NUBE MUY ETÉREA ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <svg className="cloud" viewBox="0 0 1600 600" role="img" aria-label="nube">
              <defs>
                {/* relleno blanco suave (menos denso) */}
                <radialGradient id="softWhite" cx="50%" cy="50%" r="62%">
                  <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.72"/>
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.58"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.28"/>
                </radialGradient>

                {/* tinte sutil para profundidad (muy tenue) */}
                <linearGradient id="tint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="rgba(212,175,55,0.06)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.05)" />
                </linearGradient>

                {/* filtro: ruido suave + blur alto + alpha suave (etéreo) */}
                <filter id="fluffyCloud" x="-28%" y="-40%" width="156%" height="180%" colorInterpolationFilters="sRGB">
                  <!-- ruido de baja frecuencia (contorno orgánico, NO granulado) -->
                  <feTurbulence type="fractalNoise" baseFrequency="0.006 0.010" numOctaves="2" seed="13" result="noise"/>
                  <!-- deformación SUAVE (para evitar bordes rectos, sin “dentado”) -->
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <!-- blur amplio para look vapor -->
                  <feGaussianBlur in="displaced" stdDeviation="18" result="blurred"/>
                  <!-- curva de alpha muy suave (sin recortes duros) -->
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.25 0.55 0.8"/>
                  </feComponentTransfer>
                </filter>

                {/* velo externo muy suave para “aire” alrededor */}
                <radialGradient id="veil" cx="50%" cy="50%" r="70%">
                  <stop offset="0%"  stopColor="rgba(255,255,255,0.16)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/* grupo con filtro: UNA sola forma + velo */}
              <g filter="url(#fluffyCloud)" opacity="0.84">
                {/* forma orgánica única */}
                <path
                  fill="url(#softWhite)"
                  d="
                    M 240 360
                    C 300 270, 420 220, 540 250
                    C 600 190, 740 180, 820 230
                    C 900 170, 1040 170, 1100 240
                    C 1180 225, 1280 270, 1298 330
                    C 1382 350, 1420 405, 1390 440
                    C 1240 470, 1120 482, 980 462
                    C 860 490, 700 492, 580 462
                    C 470 480, 350 462, 290 430
                    C 255 405, 220 385, 240 360 Z
                  "
                />
                {/* tinte tenue, sigue la misma forma */}
                <path
                  fill="url(#tint)"
                  d="
                    M 240 360
                    C 300 270, 420 220, 540 250
                    C 600 190, 740 180, 820 230
                    C 900 170, 1040 170, 1100 240
                    C 1180 225, 1280 270, 1298 330
                    C 1382 350, 1420 405, 1390 440
                    C 1240 470, 1120 482, 980 462
                    C 860 490, 700 492, 580 462
                    C 470 480, 350 462, 290 430
                    C 255 405, 220 385, 240 360 Z
                  "
                  opacity="0.22"
                />
                {/* velo exterior etéreo */}
                <ellipse cx="800" cy="320" rx="560" ry="250" fill="url(#veil)" opacity="0.5"/>
              </g>
            </svg>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
/* apaga fondos viejos si quedaron */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* contenedor del cielo */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

/* movimiento: SOLO transform (GPU) → sin flicker */
.cloud-track {
  position: absolute; top: 25vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 130s linear infinite;
}
/* la nube en sí: sombra MUY suave (no sólida) */
.cloud {
  width: min(88vw, 1380px);
  height: auto;
  filter: drop-shadow(0 16px 32px rgba(0,0,0,.16));
}

/* flotación vertical sutil */
.cloud-track::after {
  content:""; position:absolute; inset:0;
  animation: cloud-float 18s ease-in-out infinite alternate;
}

@keyframes cloud-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-96vw,0,0); }
}
@keyframes cloud-float {
  0%   { transform: translateY(0); }
  100% { transform: translateY(1.1vh); }
}

/* responsivo */
@media (max-width: 640px){
  .cloud-track { top: 23vh; }
  .cloud { width: 96vw; }
}
        `}</style>
      </body>
    </html>
  );
}
