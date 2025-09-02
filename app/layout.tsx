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
        {/* ===== CIELO (canvas con nube vaporosa + fallback) ===== */}
        <div id="sky" aria-hidden>
          <div className="cloud-track">
            <canvas id="cloudCanvas" className="cloud" />
            <div className="veil" />
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* NO ocultamos el canvas; sólo apagamos restos viejos específicos si existieran */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

.cloud-track {
  position: absolute; top: 23vh; left: 0; width: 100%;
  transform: translate3d(110vw,0,0);
  animation: cloud-drift 140s linear infinite;
}

/* Fallback visible por si el script no corre todavía:
   - altura explícita (calc) + aspect-ratio
   - radial-gradient vaporoso
*/
.cloud {
  display:block;
  width: min(84vw, 1400px);
  height: calc(min(84vw, 1400px) * 0.40625); /* 6.5/16 */
  aspect-ratio: 16 / 6.5;
  background:
    radial-gradient(60% 50% at 50% 52%, rgba(255,255,255,.38) 0%, rgba(255,255,255,.22) 45%, rgba(255,255,255,0) 72%);
  filter: blur(20px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  opacity: 0.78;
  border-radius: 9999px/60%;
}

/* Velo exterior sutil */
.veil {
  position:absolute; inset: -10% -6%;
  background: radial-gradient(80% 70% at 50% 52%, rgba(255,255,255,.10), transparent 80%);
  filter: blur(12px);
  pointer-events:none;
}

/* Flotación vertical sutil (no re-pinta el canvas) */
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
  .cloud {
    width: 96vw;
    height: calc(96vw * 0.40625);
    filter: blur(18px) drop-shadow(0 8px 18px rgba(0,0,0,.10));
    opacity:.76;
  }
}
        `}</style>

        {/* ===== SCRIPT (cliente, robusto) ===== */}
        <Script id="paint-cloud" strategy="afterInteractive">{`
(function(){
  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function smoothstep(e0,e1,x){ var t=clamp((x-e0)/(e1-e0),0,1); return t*t*(3-2*t); }

  // Perlin 2D con domain-warp suave
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

  function paintCloud(canvas){
    try{
      // Asegura medidas válidas (fallback si el layout aún no está)
      var wCSS = canvas.offsetWidth || 800;
      var hCSS = canvas.offsetHeight || Math.round(wCSS * 0.40625);
      var dpi  = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      var W = Math.max(480, Math.floor(wCSS));
      var H = Math.max(200, Math.floor(hCSS));
      canvas.width  = Math.floor(W * dpi);
      canvas.height = Math.floor(H * dpi);

      var ctx = canvas.getContext("2d"); if(!ctx) return;
      var img = ctx.createImageData(canvas.width, canvas.height);
      var data = img.data;

      var s1=0.010, s2=0.020, s3=0.040;
      var w1=0.60, w2=0.28, w3=0.12, inv=1/(w1+w2+w3);

      var warpFreq=0.0045, warpAmp=1.75;
      var cx=canvas.width*0.52, cy=canvas.height*0.52, rx=canvas.width*0.56, ry=canvas.height*0.46;
      var featherIn=0.80, featherOut=1.00;
      var baseAlpha=0.78; // si la ves tenue, súbela a 0.82

      var tiltX=0.05, tiltY=-0.025;

      for (var y=0; y<canvas.height; y++){
        for (var x=0; x<canvas.width; x++){
          var wx = perlin2(x*warpFreq, y*warpFreq) * warpAmp;
          var wy = perlin2((x+1000)*warpFreq, (y-777)*warpFreq) * warpAmp;

          var nx = (x + y*tiltX + wx) * s1;
          var ny = (y + x*tiltY + wy) * s1;

          var n1 = perlin2(nx, ny);
          var n2 = perlin2(nx * (s2/s1), ny * (s2/s1));
          var n3 = perlin2(nx * (s3/s1), ny * (s3/s1));
          var n  = (w1*n1 + w2*n2 + w3*n3) * inv; // [-1,1] -> [0,1]
          n = (n + 1) * 0.5;

          var dx=(x-cx)/rx, dy=(y-cy)/ry, r=Math.sqrt(dx*dx+dy*dy);
          var mask = 1 - smoothstep(featherIn, featherOut, r);

          var a = smoothstep(0.42, 0.78, n) * mask * baseAlpha;

          var i=(y*canvas.width + x)*4;
          data[i  ] = 255;
          data[i+1] = 255;
          data[i+2] = 255;
          data[i+3] = Math.floor(clamp(a,0,1)*255);
        }
      }
      ctx.putImageData(img,0,0);
    }catch(e){ /* si algo falla, el fallback CSS mantiene una nube visible */ }
  }

  function init(){
    var c = document.getElementById('cloudCanvas');
    if(!c) return;
    // pinta al estar listo el layout
    requestAnimationFrame(function(){ paintCloud(c); });
    // repinta en eventos confiables
    var to=null;
    window.addEventListener('resize', function(){ clearTimeout(to); to=setTimeout(function(){ paintCloud(c); }, 120); }, {passive:true});
    window.addEventListener('pageshow', function(){ paintCloud(c); }, {passive:true});
    window.addEventListener('load', function(){ paintCloud(c); }, {passive:true});
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
