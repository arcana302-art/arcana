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
        {/* ===== CIELO: UNA NUBE ULTRA-ETÉREA ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <svg className="cloud" viewBox="0 0 1600 600" role="img" aria-label="nube">
              <defs>
                {/* Relleno blanco MUY suave */}
                <radialGradient id="softWhite" cx="50%" cy="50%" r="65%">
                  <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.64" />
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.46" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.20" />
                </radialGradient>

                {/* Tinte (apenas perceptible) para profundidad */}
                <linearGradient id="tint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="rgba(212,175,55,0.04)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.035)" />
                </linearGradient>

                {/* Filtro: ruido MUY suave + blur alto + alpha curva suave */}
                <filter id="fluffyCloud" x="-30%" y="-45%" width="160%" height="190%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.0055 0.0085" numOctaves="2" seed="17" result="noise"/>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <feGaussianBlur in="displaced" stdDeviation="20" result="blurred"/>
                  <feComponentTransfer>
                    <!-- curva de alpha muy progresiva -->
                    <feFuncA type="table" tableValues="0 0.18 0.45 0.72" />
                  </feComponentTransfer>
                </filter>

                {/* Máscara de pluma para desvanecer bordes (feather mask) */}
                <radialGradient id="featherGrad" cx="50%" cy="50%" r="72%">
                  <stop offset="0%"  stopColor="white" stopOpacity="1"/>
                  <stop offset="70%" stopColor="white" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="black" stopOpacity="0"/>
                </radialGradient>
                <mask id="featherMask">
                  <rect x="0" y="0" width="1600" height="600" fill="url(#featherGrad)"/>
                </mask>
              </defs>

              {/* Grupo con filtro + máscara (ultra etéreo) */}
              <g filter="url(#fluffyCloud)" mask="url(#featherMask)" opacity="0.78">
                {/* Forma orgánica única (sin piezas rígidas) */}
                <path
                  fill="url(#softWhite)"
                  d="
                    M 240 360
                    C 308 270, 438 220, 556 252
                    C 618 190, 760 182, 840 232
                    C 918 170, 1060 170, 1122 242
                    C 1206 228, 1306 270, 1326 332
                    C 1408 356, 1444 408, 1416 446
                    C 1260 474, 1140 486, 996 468
                    C 876 494, 714 498, 596 468
                    C 488 486, 366 468, 304 436
                    C 266 410, 228 388, 240 360 Z
                  "
                />
                {/* Tinte tenue sobre la misma forma */}
                <path
                  fill="url(#tint)"
                  d="
                    M 240 360
                    C 308 270, 438 220, 556 252
                    C 618 190, 760 182, 840 232
                    C 918 170, 1060 170, 1122 242
                    C 1206 228, 1306 270, 1326 332
                    C 1408 356, 1444 408, 1416 446
                    C 1260 474, 1140 486, 996 468
                    C 876 494, 714 498, 596 468
                    C 488 486, 366 468, 304 436
                    C 266 410, 228 388, 240 360 Z
                  "
                  opacity="0.18"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* CONTENIDO DEL SITIO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
/* Apaga cualquier fondo previo */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Cielo y movimiento (solo transform → sin parpadeos) */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

.cloud-track {
  position: absolute; top: 24vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 140s linear infinite;
}

/* Sombra muy suave para profundidad (no “bloque”) */
.cloud {
  width: min(86vw, 1340px);
  height: auto;
  filter: drop-shadow(0 12px 28px rgba(0,0,0,.14));
}

/* Flotación sutil */
.cloud-track::after {
  content:""; position:absolute; inset:0;
  animation: cloud-float 18s ease-in-out infinite alternate;
}

@keyframes cloud-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-98vw,0,0); }
}
@keyframes cloud-float {
  0%   { transform: translateY(0); }
  100% { transform: translateY(1.0vh); }
}

/* Responsivo */
@media (max-width: 640px){
  .cloud-track { top: 22vh; }
  .cloud { width: 96vw; filter: drop-shadow(0 10px 22px rgba(0,0,0,.12)); }
}
        `}</style>
      </body>
    </html>
  );
}
