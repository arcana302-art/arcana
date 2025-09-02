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
        {/* ===== CIELO: UNA SOLA NUBE ORGÁNICA ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <svg className="cloud" viewBox="0 0 1600 600" role="img" aria-label="nube">
              <defs>
                {/* Tinte sutil (calidez dorado/azul muy baja) */}
                <radialGradient id="softWhite" cx="50%" cy="50%" r="60%">
                  <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.88"/>
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.76"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.38"/>
                </radialGradient>
                <linearGradient id="tint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="rgba(212,175,55,0.10)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
                </linearGradient>

                {/* Filtro: blur + ligera deformación por ruido (orgánico, sin rigidez) */}
                <filter id="fluffyCloud" x="-25%" y="-40%" width="150%" height="180%" colorInterpolationFilters="sRGB">
                  <!-- Ruido fractal de baja frecuencia (contorno irregular suave) -->
                  <feTurbulence type="fractalNoise" baseFrequency="0.0075 0.012" numOctaves="3" seed="9" result="noise"/>
                  <!-- Deforma suavemente el borde con el ruido -->
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <!-- Suaviza para aspecto “algodón” -->
                  <feGaussianBlur in="displaced" stdDeviation="12" result="blurred"/>
                  <!-- Ajuste de alpha: evita bordes duros y parpadeos -->
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.5 0.85 1"/>
                  </feComponentTransfer>
                </filter>
              </defs>

              {/* UNA SOLA FORMA con relleno suave + tinte sutil y filtro orgánico */}
              <g filter="url(#fluffyCloud)">
                <path
                  fill="url(#softWhite)"
                  d="
                    M 220 360
                    C 260 280, 380 220, 500 250
                    C 540 190, 680 180, 760 230
                    C 820 170, 980 170, 1040 240
                    C 1120 230, 1220 270, 1235 330
                    C 1320 350, 1360 400, 1330 440
                    C 1210 470, 1080 480, 920 460
                    C 800 490, 640 490, 540 460
                    C 440 480, 330 460, 270 430
                    C 235 405, 200 385, 220 360 Z
                  "
                />
                {/* capa de tinte sutil para profundidad (muy tenue) */}
                <path
                  fill="url(#tint)"
                  d="
                    M 220 360
                    C 260 280, 380 220, 500 250
                    C 540 190, 680 180, 760 230
                    C 820 170, 980 170, 1040 240
                    C 1120 230, 1220 270, 1235 330
                    C 1320 350, 1360 400, 1330 440
                    C 1210 470, 1080 480, 920 460
                    C 800 490, 640 490, 540 460
                    C 440 480, 330 460, 270 430
                    C 235 405, 200 385, 220 360 Z
                  "
                  opacity="0.35"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
/* Apaga cualquier fondo viejo si quedó en el proyecto */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Cielo */
#sky {
  position: fixed; inset: 0;
  z-index: 0; pointer-events: none; overflow: visible;
}

/* Movimiento: SOLO transform (GPU), sin filtros animados → sin flicker */
.cloud-track {
  position: absolute; top: 26vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 115s linear infinite;
}
.cloud {
  width: min(88vw, 1380px); height: auto;
  filter: drop-shadow(0 24px 48px rgba(0,0,0,.22)); /* profundidad suave */
}

/* Flotación vertical muy sutil */
.cloud-track::after {
  content:""; position:absolute; inset:0;
  animation: cloud-float 18s ease-in-out infinite alternate;
}

@keyframes cloud-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-95vw,0,0); }
}
@keyframes cloud-float {
  0%   { transform: translateY(0); }
  100% { transform: translateY(1.2vh); }
}

/* Responsivo */
@media (max-width: 640px){
  .cloud-track { top: 24vh; }
  .cloud { width: 96vw; }
}
        `}</style>
      </body>
    </html>
  );
}
