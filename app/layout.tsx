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
        {/* ===== CIELO: UNA NUBE MUY VAPOROSA Y ORGÁNICA ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <svg className="cloud" viewBox="0 0 1800 720" role="img" aria-label="nube">
              <defs>
                {/* Relleno blanco muy suave (más vapor) */}
                <radialGradient id="softWhite" cx="50%" cy="48%" r="68%">
                  <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.56"/>
                  <stop offset="55%" stopColor="#ffffff" stopOpacity="0.40"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18"/>
                </radialGradient>

                {/* Tinte sutil dorado/azul (casi imperceptible) */}
                <linearGradient id="tint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="rgba(212,175,55,0.035)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.03)" />
                </linearGradient>

                {/* Filtro: ruido suave + blur alto + alpha suave (vapor) */}
                <filter id="fluffyCloud" x="-35%" y="-50%" width="170%" height="200%" colorInterpolationFilters="sRGB">
                  <!-- ruido de baja frecuencia para contorno orgánico no rígido -->
                  <feTurbulence type="fractalNoise" baseFrequency="0.0048 0.0068" numOctaves="2" seed="21" result="noise"/>
                  <!-- deformación ligera (no dentada) -->
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <!-- blur amplio para look vaporoso -->
                  <feGaussianBlur in="displaced" stdDeviation="22" result="blurred"/>
                  <!-- curva de alpha muy progresiva -->
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.16 0.40 0.68"/>
                  </feComponentTransfer>
                </filter>

                {/* Máscara elíptica (feather) para desvanecer bordes y quitar "cuadrado" */}
                <radialGradient id="featherGrad" cx="50%" cy="50%" r="78%" gradientTransform="rotate(-6) scale(1.25, 0.9)">
                  <stop offset="0%"   stopColor="#fff" stopOpacity="1"/>
                  <stop offset="70%"  stopColor="#fff" stopOpacity="0.55"/>
                  <stop offset="100%" stopColor="#000" stopOpacity="0"/>
                </radialGradient>
                <mask id="featherMask">
                  <rect x="0" y="0" width="1800" height="720" fill="url(#featherGrad)"/>
                </mask>

                {/* Velo exterior muy tenue para aire alrededor */}
                <radialGradient id="veil" cx="50%" cy="52%" r="78%">
                  <stop offset="0%"  stopColor="rgba(255,255,255,0.12)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>

              {/* Grupo con filtro + máscara: súper etéreo y orgánico */}
              <g filter="url(#fluffyCloud)" mask="url(#featherMask)" opacity="0.74">
                {/* UNA sola forma orgánica (asimétrica, sin “caja”) */}
                <path
                  fill="url(#softWhite)"
                  d="
                    M 210 410
                    C 260 320, 410 250, 560 280
                    C 610 210, 780 200, 880 250
                    C 970 185, 1170 190, 1240 270
                    C 1335 255, 1480 310, 1504 375
                    C 1600 395, 1650 450, 1608 490
                    C 1460 518, 1310 525, 1160 508
                    C 1020 540, 820 545, 690 512
                    C 560 540, 410 522, 330 485
                    C 280 456, 232 432, 210 410 Z
                  "
                />
                {/* Tinte tenue para profundidad */}
                <path
                  fill="url(#tint)"
                  d="
                    M 210 410
                    C 260 320, 410 250, 560 280
                    C 610 210, 780 200, 880 250
                    C 970 185, 1170 190, 1240 270
                    C 1335 255, 1480 310, 1504 375
                    C 1600 395, 1650 450, 1608 490
                    C 1460 518, 1310 525, 1160 508
                    C 1020 540, 820 545, 690 512
                    C 560 540, 410 522, 330 485
                    C 280 456, 232 432, 210 410 Z
                  "
                  opacity="0.18"
                />
                {/* velo exterior */}
                <ellipse cx="900" cy="420" rx="690" ry="290" fill="url(#veil)" opacity="0.52"/>
              </g>
            </svg>
          </div>
        </div>

        {/* CONTENIDO DEL SITIO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
/* Apaga fondos previos si quedaron */
#bg-root, .stars, .belt, .bank, .puffs, .cloud, .nebula, .grain, .vignette { display: none !important; }

/* Cielo y movimiento (solo transform → sin parpadeos) */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

.cloud-track {
  position: absolute; top: 23vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 150s linear infinite;
}

/* Sombra muy suave para profundidad (nada sólido) */
.cloud {
  width: min(84vw, 1400px);
  height: auto;
  filter: drop-shadow(0 10px 22px rgba(0,0,0,.12));
}

/* Flotación sutil */
.cloud-track::after {
  content:""; position:absolute; inset:0;
  animation: cloud-float 18s ease-in-out infinite alternate;
}

@keyframes cloud-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-100vw,0,0); }
}
@keyframes cloud-float {
  0%   { transform: translateY(0); }
  100% { transform: translateY(0.9vh); }
}

/* Responsivo */
@media (max-width: 640px){
  .cloud-track { top: 21vh; }
  .cloud { width: 96vw; filter: drop-shadow(0 8px 18px rgba(0,0,0,.10)); }
}
        `}</style>
      </body>
    </html>
  );
}
