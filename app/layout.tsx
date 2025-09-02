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
        {/* ===== CIELO (canvas con nube vaporosa) ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <canvas id="cloudCanvas" className="cloud" />
            {/* velo sutil para “aire” alrededor */}
            <div className="veil" />
          </div>
        </div>

        {/* CONTENIDO DEL SITIO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* apaga cualquier fondo viejo si quedó en el proyecto */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

/* pista que mueve la nube (solo transform → sin flicker) */
.cloud-track {
  position: absolute; top: 23vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 140s linear infinite;
}

/* el canvas: se escala con CSS, se pinta una vez (ruido perlin) */
.cloud {
  width: min(84vw, 1400px);
  height: auto;
  aspect-ratio: 16 / 6.5;   /* mantiene proporción suave */
  filter: blur(22px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  opacity: 0.78;            /* vapor */
}

/* velo exterior sutil (ayuda a evitar bordes “cortados”) */
.veil {
  position:absolute; inset: -10% -6%;
  background:
    radial-gradient(80% 70% at 50% 52%, rgba(255,255,255,.12), transparent 80%);
  filter: blur(12px);
  pointer-events:none;
}

/* flotación vertical MUY sutil (sin tocar el canvas) */
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

/* responsivo */
@media (max-width: 640px){
  .cloud-track { top: 21vh; }
  .cloud { width: 96vw; filter: blur(20px) drop-shadow(0 8px 18px rgba(0,0,0,.10)); opacity:.76; }
}
        `}</style>

        {/* ===== SCRIPT: genera la textura de nube con Perlin (una vez) ===== */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  // --- utilidades ---
  function clamp(v, a, b){ return v < a ? a : (v > b ? b : v); }
  function smoothstep(e0, e1, x){
    var t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  // --- Perlin 2D clásico ---
  var p = new Uint8Array(512);
  (function buildPerm(){
    var perm = new Uint8Array(256);
    for (var i=0;i<256;i++) perm[i]=i;
    // shuffle con semilla fija para resultados estables
    var seed = 1337;
    function rand(){ seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
    for (var i2=255;i2>0;i2--){
      var r = Math.floor(rand()*(i2+1));
      var tmp = perm[i2]; perm[i2] = perm[r]; perm[r] = tmp;
    }
    for (var i3=0;i3<512;i3++) p[i3] = perm[i3 & 255];
  })();

  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerp(a,b,t){ return a + t*(b-a); }
  function grad(hash, x, y){
    var h = hash & 3; // 4 gradientes (suficientes para vapor suave)
    var u = h < 2 ? x : y;
    var v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -2*v : 2*v) * 0.5; // leve anisotropía
  }
  function perlin2(x, y){
    var X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    var xf = x - Math.floor(x), yf = y - Math.floor(y);
    var u = fade(xf), v = fade(yf);
    var aa = p[X + p[Y]], ab = p[X + p[Y+1]];
    var ba = p[X+1 + p[Y]], bb = p[X+1 + p[Y+1]];
    var x1 = lerp(grad(aa, xf, yf),     grad(ba, xf-1, yf),     u);
    var x2 = lerp(grad(ab, xf, yf-1),   grad(bb, xf-1, yf-1),   u);
    return lerp(x1, x2, v); // ~[-1,1]
  }

  // --- pinta la nube a un canvas ---
  function paintCloud(canvas){
    var dpi = window.devicePixelRatio || 1;
    // Resolución base baja para evitar costo → luego se escala con CSS
    var wCSS = canvas.clientWidth  || 800;
    var hCSS = canvas.clientHeight || 320;
    var W = Math.max(480, Math.floor(wCSS * 0.9));
    var H = Math.max(200, Math.floor(hCSS * 0.9));
    canvas.width  = Math.floor(W * dpi);
    canvas.height = Math.floor(H * dpi);

    var ctx = canvas.getContext('2d');
    if(!ctx) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var img = ctx.createImageData(canvas.width, canvas.height);
    var data = img.data;

    // parámetros del ruido (sin filas/columnas visibles)
    // escalas pequeñas → estructura grande, más vapor
    var s1 = 0.010, s2 = 0.020, s3 = 0.040;
    var w1 = 0.60, w2 = 0.28, w3 = 0.12; // mezcla por octavas
    var invSum = 1.0/(w1+w2+w3);

    // elipse de caída (pluma) para que no quede “cuadrado”
    var cx = canvas.width * 0.52, cy = canvas.height * 0.52;
    var rx = canvas.width * 0.55,  ry = canvas.height * 0.46;
    var featherIn  = 0.78; // radio interno (pleno)
    var featherOut = 1.00; // radio externo (se desvanece)
    // mínimo “cuerpo” para que no desaparezca
    var baseAlpha = 0.82; // baja si quieres aún más vapor

    // ligera inclinación para evitar horizontales perfectas
    var tiltX = 0.06, tiltY = -0.03;

    for (var y=0; y<canvas.height; y++){
      for (var x=0; x<canvas.width; x++){
        var nx = (x + y*tiltX) * s1;
        var ny = (y + x*tiltY) * s1;
        var n1 = perlin2(nx, ny);
        var n2 = perlin2(nx * (s2/s1), ny * (s2/s1));
        var n3 = perlin2(nx * (s3/s1), ny * (s3/s1));
        var n  = (w1*n1 + w2*n2 + w3*n3) * invSum; // [-1,1]
        n = (n + 1) * 0.5; // [0,1]

        // feather elíptico (suaviza bordes y quita “caja”)
        var dx = (x - cx) / rx;
        var dy = (y - cy) / ry;
        var r  = Math.sqrt(dx*dx + dy*dy);
        var mask = 1.0 - smoothstep(featherIn, featherOut, r);

        // mapeo suave → alpha vaporosa
        // threshold bajo + curva suave = niebla/nube etérea
        var a = smoothstep(0.40, 0.75, n) * mask * baseAlpha;

        var idx = (y * canvas.width + x) * 4;
        data[idx+0] = 255;
        data[idx+1] = 255;
        data[idx+2] = 255;
        data[idx+3] = Math.floor(clamp(a,0,1) * 255);
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function init(){
    var canvas = document.getElementById('cloudCanvas');
    if(!canvas) return;
    paintCloud(canvas);
    // repinta en resize (debounce)
    var to=null;
    window.addEventListener('resize', function(){
      clearTimeout(to);
      to = setTimeout(function(){ paintCloud(canvas); }, 120);
    }, { passive:true });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else {
    init();
  }
})();
            `,
          }}
        />
      </body>
    </html>
  );
}
