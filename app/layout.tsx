// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
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
        {/* ===== CIELO (dos nubes, más grandes, parallax lento y deriva hacia arriba) ===== */}
        <div id="sky" aria-hidden>
          {/* Nube superior */}
          <div className="cloud-track track-a">
            <div className="cloud-wrap wrap-a">
              <canvas id="cloudA" className="cloud cloud-a" />
              <div className="veil veil-a" />
            </div>
          </div>
          {/* Nube inferior */}
          <div className="cloud-track track-b">
            <div className="cloud-wrap wrap-b">
              <canvas id="cloudB" className="cloud cloud-b" />
              <div className="veil veil-b" />
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* Apaga restos viejos si existieran (NO toques los canvas .cloud) */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

/* ----- Pistas (deriva principal) ----- */
.cloud-track {
  position: absolute; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  will-change: transform;
}

/* Más separación y PARALLAX MÁS LENTO
   + deriva vertical ascendente integrada en la animación */
.track-a { top: 12vh; animation: cloud-drift-a 150s linear infinite; }
.track-b { top: 62vh; animation: cloud-drift-b 200s linear infinite; animation-delay: 8s; }

/* ----- Wrap interno (flotación suave independiente) ----- */
.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 17s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 22s ease-in-out infinite alternate; }

/* Canvas base + fallback visible */
.cloud {
  display:block;
  width: min(42vw, 700px);
  height: calc(min(42vw, 700px) * 0.40625); /* 6.5/16 */
  aspect-ratio: 16 / 6.5;
  background:
    radial-gradient(60% 50% at 50% 52%, rgba(255,255,255,.32) 0%, rgba(255,255,255,.16) 45%, rgba(255,255,255,0) 72%);
  filter: blur(24px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  border-radius: 9999px/60%;
}

/* >>> Ambas más grandes <<< */
.cloud-a {
  width: min(52vw, 860px);
  height: calc(min(52vw, 860px) * 0.40625);
  opacity: 0.70;
}
.cloud-b {
  width: min(62vw, 980px);
  height: calc(min(62vw, 980px) * 0.40625);
  opacity: 0.76;
  transform: scale(1.02);
}

/* Velo exterior sutil */
.veil {
  position:absolute; inset: -14% -8%;
  background: radial-gradient(80% 70% at 50% 52%, rgba(255,255,255,.10), transparent 80%);
  filter: blur(12px);
  pointer-events:none;
}

/* ----- Animaciones ----- */
/* Deriva con subida vertical ligera */
@keyframes cloud-drift-a {
  0%   { transform: translate3d(110vw,  1.0vh, 0); }
  100% { transform: translate3d(-100vw, -1.6vh, 0); }
}
@keyframes cloud-drift-b {
  0%   { transform: translate3d(115vw,  2.2vh, 0); }
  100% { transform: translate3d(-105vw, -3.2vh, 0); }
}

/* Flotación independiente (pequeña oscilación) */
@keyframes cloud-float-a {
  0%   { transform: translateY(0); }
  100% { transform: translateY(0.9vh); }
}
@keyframes cloud-float-b {
  0%   { transform: translateY(0); }
  100% { transform: translateY(1.2vh); }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce){
  .cloud-track, .cloud-wrap { animation: none !important; transform: translate3d(0,0,0) !important; }
}

/* Responsivo */
@media (max-width: 768px){
  .track-a { top: 10vh; }
  .track-b { top: 70vh; } /* más separadas en móvil */
  .cloud-a { width: 84vw; height: calc(84vw * 0.40625); opacity: .68; }
  .cloud-b { width: 96vw; height: calc(96vw * 0.40625); opacity: .72; }
  .cloud  { filter: blur(22px) drop-shadow(0 8px 18px rgba(0,0,0,.10)); }
}
        `}</style>

        {/* ===== SCRIPT (cliente) — pinta AMBAS nubes ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function smoothstep(e0,e1,x){ var t=clamp((x-e0)/(e1-e0),0,1); return t*t*(3-2*t); }

  // Perlin 2D (perm común)
  var p=new Uint8Array(512);
  (function(){
    var perm=new Uint8Array(256); for(var i=0;i<256;i++) perm[i]=i;
    var seed=1337; function rnd(){ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }
    for(var i=255;i>0;i--){ var r=Math.floor(rnd()*(i+1)); var t=perm[i]; perm[i]=perm[r]; perm[r]=t; }
    for(var j=0;j<512;j++) p[j]=perm[j&255];
  })();
  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerp(a,b,t){ return a+t*(b-a); }
  function grad(h,x,y){ var g=h&3, u=g<2?x:y, v=g<2?y:x; return ((g&1)?-u:u)+((g&2)?-v:v); }
  function perlin2(x,y){
    var X=Math.floor(x)&255, Y=Math.floor(y)&255, xf=x-Math.floor(x), yf=y-Math.floor(y);
    var u=fade(xf), v=fade(yf);
    var aa=p[X+p[Y]], ab=p[X+p[Y+1]], ba=p[X+1+p[Y]], bb=p[X+1+p[Y+1]];
    return lerp( lerp(grad(aa,xf,yf),   grad(ba,xf-1,yf),   u),
                 lerp(grad(ab,xf,yf-1), grad(bb,xf-1,yf-1), u), v );
  }

  function paintCloud(canvas, variant){
    try{
      // medidas robustas
      var wCSS = canvas.offsetWidth || 600;
      var hCSS = canvas.offsetHeight || Math.round(wCSS * 0.40625);
      var dpi  = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      var W = Math.max(420, Math.floor(wCSS));
      var H = Math.max(170, Math.floor(hCSS));
      canvas.width  = Math.floor(W * dpi);
      canvas.height = Math.floor(H * dpi);

      var ctx = canvas.getContext("2d"); if(!ctx) return;
      var img = ctx.createImageData(canvas.width, canvas.height);
      var data = img.data;

      // escalas → estructura grande y vaporosa
      var s1=0.010, s2=0.020, s3=0.040;
      var w1=0.60, w2=0.28, w3=0.12, inv=1/(w1+w2+w3);

      // offsets distintos por variante para que no sean iguales
      var off = variant === 1 ? 5000 : 0;

      // domain warp (rompe alineaciones), distinta por nube
      var warpFreq= variant===0 ? 0.0039 : 0.0043;
      var warpAmp = variant===0 ? 2.0    : 2.2;

      // feather elíptico (contorno no "cuadrado"), sutilmente distinto
      var cx=canvas.width*(variant===0?0.52:0.50);
      var cy=canvas.height*(variant===0?0.50:0.54);
      var rx=canvas.width*(variant===0?0.60:0.58);
      var ry=canvas.height*(variant===0?0.46:0.44);
      var featherIn = variant===0 ? 0.84 : 0.82;
      var featherOut= variant===0 ? 1.06 : 1.04;

      // opacidad base (la inferior un pelín más densa)
      var baseAlpha = variant===0 ? 0.72 : 0.75;

      // leve inclinación del dominio (variadas)
      var tiltX = variant===0 ? 0.06 : 0.07;
      var tiltY = variant===0 ? -0.03 : -0.028;

      for (var y=0; y<canvas.height; y++){
        for (var x=0; x<canvas.width; x++){
          // domain warp con offset por variante
          var wx = perlin2((x+off)*warpFreq, (y+off)*warpFreq) * warpAmp;
          var wy = perlin2((x+1000+off)*warpFreq, (y-777+off)*warpFreq) * warpAmp;

          var nx = (x + y*tiltX + wx) * s1;
          var ny = (y + x*tiltY + wy) * s1;

          var n1 = perlin2(nx, ny);
          var n2 = perlin2(nx * (s2/s1), ny * (s2/s1));
          var n3 = perlin2(nx * (s3/s1), ny * (s3/s1));
          var n  = (w1*n1 + w2*n2 + w3*n3) * inv; // [-1,1] -> [0,1]
          n = (n + 1) * 0.5;

          // feather elíptico
          var dx=(x-cx)/rx, dy=(y-cy)/ry, r=Math.sqrt(dx*dx+dy*dy);
          var mask = 1 - smoothstep(featherIn, featherOut, r);

          // curva suave para alpha vaporosa
          var a = smoothstep(0.40, 0.75, n) * mask * baseAlpha;

          var i=(y*canvas.width + x)*4;
          data[i  ] = 255;
          data[i+1] = 255;
          data[i+2] = 255;
          data[i+3] = Math.floor(clamp(a,0,1)*255);
        }
      }
      ctx.putImageData(img,0,0);
    }catch(e){ /* fallback CSS mantiene visible si algo fallara */ }
  }

  function paintAll(){
    var a = document.getElementById('cloudA');
    var b = document.getElementById('cloudB');
    if (a) paintCloud(a, 0);
    if (b) paintCloud(b, 1);
  }

  function init(){
    paintAll();
    var to=null;
    window.addEventListener('resize', function(){ clearTimeout(to); to=setTimeout(paintAll, 120); }, {passive:true});
    window.addEventListener('pageshow', paintAll, {passive:true});
    window.addEventListener('load', paintAll, {passive:true});
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
        `}</Script>
      </body>
    </html>
  );
}
