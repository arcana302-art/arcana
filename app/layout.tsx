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
        {/* ====== UNA SOLA NUBE ORGÁNICA (SVG) ====== */}
        <div id="sky" aria-hidden>
          <div className="cloud-drift">
            <svg className="cloud-svg" viewBox="0 0 1600 600" role="img" aria-label="nube">
              <defs>
                {/* Filtro único: suaviza (blur) y deforma levemente con ruido fractal (sin flicker) */}
                <filter id="cloudFilter" x="-20%" y="-30%" width="140%" height="160%" colorInterpolationFilters="sRGB">
                  <!-- 1) Suavizado global: fusiona formas internas -->
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blurred"/>
                  <!-- 2) Ruido fractal (base baja, 3 octavas) -->
                  <feTurbulence type="fractalNoise" baseFrequency="0.010 0.016" numOctaves="3" seed="7" result="noise"/>
                  <!-- 3) Ligera deformación de contorno con el ruido (orgánico, sin “bordes duros”) -->
                  <feDisplacementMap in="blurred" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" result="displaced"/>
                  <!-- 4) Salida con alfa casi llena (evita parpadeos por alpha variable) -->
                  <feColorMatrix in="displaced" type="matrix"
                    values="
                      1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 .96 0" />
                </filter>

                {/* Tinte muy sutil (calidez dorado/azul) */}
                <linearGradient id="cloudTint" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="rgba(212,175,55,0.08)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.07)" />
                </linearGradient>
              </defs>

              {/* Grupo con filtro: la combinación de elipses + blur + desplazamiento evita “círculos definidos” */}
              <g filter="url(#cloudFilter)" opacity="0.92">
                {/* Base orgánica: elipses grandes superpuestas (no perfectas, distintas orientaciones) */}
                <ellipse cx="380"  cy="260" rx="220" ry="120" fill="#fff" fillOpacity="0.80" transform="rotate(-6 380 260)"/>
                <ellipse cx="640"  cy="230" rx="260" ry="140" fill="#fff" fillOpacity="0.78" transform="rotate(4 640 230)"/>
                <ellipse cx="900"  cy="250" rx="230" ry="130" fill="#fff" fillOpacity="0.78" transform="rotate(-3 900 250)"/>
                <ellipse cx="1140" cy="290" rx="200" ry="110" fill="#fff" fillOpacity="0.76" transform="rotate(6 1140 290)"/>

                {/* Barriga inferior ondulada (dos elipses bajas) */}
                <ellipse cx="620"  cy="360" rx="260" ry="110" fill="#fff" fillOpacity="0.74" transform="rotate(-2 620 360)"/>
                <ellipse cx="980"  cy="370" rx="240" ry="100" fill="#fff" fillOpacity="0.72" transform="rotate(3 980 370)"/>

                {/* Tinte sutil encima (no añade “bloque”, solo matiz) */}
                <ellipse cx="800" cy="300" rx="560" ry="240" fill="url(#cloudTint)" />
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

/* Contenedor del cielo */
#sky {
  position: fixed; inset: 0;
  z-index: 0; pointer-events: none; overflow: visible;
}

/* La nube se mueve de derecha a izquierda y flota suavemente (solo transform: sin flicker) */
.cloud-drift {
  position: absolute; top: 26vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 120s linear infinite;
}
.cloud-svg {
  width: min(90vw, 1400px);
  height: auto;
  /* pequeño blur adicional para fundir aún más (estático) */
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.25));
}
@keyframes cloud-drift {
  0%   { transform: translate3d(110vw,0,0); }
  100% { transform: translate3d(-95vw,0,0); }
}

/* Flotación vertical sutil */
.cloud-drift::after { /* pseudo para animación vertical sin tocar el SVG */
  content:""; position:absolute; inset:0;
  animation: cloud-float 18s ease-in-out infinite alternate;
}
@keyframes cloud-float {
  0%   { transform: translateY(0); }
  100% { transform: translateY(1.2vh); }
}

/* Responsivo */
@media (max-width: 640px){
  .cloud-drift { top: 24vh; }
  .cloud-svg   { width: 96vw; }
}
        `}</style>
      </body>
    </html>
  );
}
