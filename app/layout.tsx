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
        {/* ===== CIELO (3 nubes sólidas + 4 estrellas) ===== */}
        {/* NOTA: #sky SIEMPRE visible; los canvas no tienen fondo para evitar cualquier "flash" */}
        <div id="sky" aria-hidden>
          {/* Estrellas (solo 4, sin zoom, sin aparición brusca) */}
          <div id="stars">
            <span className="star" /><span className="star" />
            <span className="star" /><span className="star" />
          </div>

          {/* Nube superior */}
          <div className="cloud-track track-a">
            <div className="rise rise-a">
              <div className="cloud-wrap wrap-a">
                <canvas id="cloudA" className="cloud cloud-a" />
                <div className="core core-a" />
                <div className="veil veil-a" />
              </div>
            </div>
          </div>
          {/* Nube central (intermedia) */}
          <div className="cloud-track track-c">
            <div className="rise rise-c">
              <div className="cloud-wrap wrap-c">
                <canvas id="cloudC" className="cloud cloud-c" />
                <div className="core core-c" />
                <div className="veil veil-c" />
              </div>
            </div>
          </div>
          {/* Nube inferior */}
          <div className="cloud-track track-b">
            <div className="rise rise-b">
              <div className="cloud-wrap wrap-b">
                <canvas id="cloudB" className="cloud cloud-b" />
                <div className="core core-b" />
                <div className="veil veil-b" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* Oculta restos antiguos */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

/* Cielo visible siempre (evita cualquier "aparecer") */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; }

/* ---------- ESTRELLAS (4) ---------- */
#stars { position: absolute; inset: 0; pointer-events: none; }
.star{
  position: absolute;
  width: var(--sz, 4.5px); height: var(--sz, 4.5px);
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 28%, rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.55) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.45) 0%, rgba(244,114,182,0) 78%);
  filter: drop-shadow(0 0 12px rgba(255,255,255,.7)) drop-shadow(0 0 18px rgba(168,85,247,.5));
  opacity: .9; /* SIEMPRE visibles (no aparecen desde 0) */
  animation: twinkle var(--twDur, 14s) ease-in-out infinite;
}
/* titileo sutil: 0.8 ↔ 1, sin transform ni escalas (SIN zoom) */
@keyframes twinkle { 0% { opacity:.85; } 50% { opacity:1; } 100% { opacity:.82; } }

/* ---------- NUBES ---------- */
/* Loop continuo + visibilidad inmediata (delays negativos diferentes) */
.cloud-track {
  position: absolute; left: 0; width: 100%; will-change: transform;
}
.track-a { top: 10vh; animation: cloud-drift-a 110s linear infinite; animation-delay: -30s; }
.track-c { top: 50vh; animation: cloud-drift-c 120s linear infinite; animation-delay: -55s; }
.track-b { top: 88vh; animation: cloud-drift-b 130s linear infinite; animation-delay: -90s; }

@keyframes cloud-drift-a { 0% { transform: translateX(85vw); } 100% { transform: translateX(-100vw); } }
@keyframes cloud-drift-c { 0% { transform: translateX(90vw); } 100% { transform: translateX(-102vw); } }
@keyframes cloud-drift-b { 0% { transform: translateX(95vw); } 100% { transform: translateX(-105vw); } }

/* Ascenso (mantengo trayectorias; inferior épica) */
.rise { will-change: transform; }
.rise-a { animation: cloud-rise-a 110s linear infinite; animation-delay: -30s; }
.rise-c { animation: cloud-rise-c 120s linear infinite; animation-delay: -55s; }
.rise-b { animation: cloud-rise-b 130s linear infinite; animation-delay: -90s; }

@keyframes cloud-rise-a { 0% { transform: translateY(1.5vh); } 100% { transform: translateY(-2.4vh); } }
@keyframes cloud-rise-c { 0% { transform: translateY(8vh); } 100% { transform: translateY(-20vh); } }
@keyframes cloud-rise-b { 0% { transform: translateY(24vh); } 100% { transform: translateY(-80vh); } }

/* Flotación sutil independiente */
.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 14s ease-in-out infinite alternate; }
.wrap-c { animation: cloud-float-c 16s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 18s ease-in-out infinite alternate; }

@keyframes cloud-float-a { 0% { transform: translateY(0); } 100% { transform: translateY(0.9vh); } }
@keyframes cloud-float-c { 0% { transform: translateY(0); } 100% { transform: translateY(1.1vh); } }
@keyframes cloud-float-b { 0% { transform: translateY(0); } 100% { transform: translateY(1.5vh); } }

/* SIN visibilidad oculta: los canvas no tienen background ⇒ no hay "flash" previo */
.cloud{
  display:block;
  width: min(42vw, 700px);
  height: calc(min(42vw, 700px) * 0.40625);
  aspect-ratio: 16 / 6.5;
  background: transparent;                 /* <- clave para no ver nada antes de pintar */
  filter: blur(14px) drop-shadow(0 10px 22px rgba(0,0,0,.12)); /* blur ↓ para más solidez */
  border-radius: 9999px/60%;
}

/* Tamaños/opacidad */
.cloud-a { width: min(52vw, 860px); height: calc(min(52vw, 860px) * 0.40625); opacity: .82; }
.cloud-c { width: min(56vw, 920px); height: calc(min(56vw, 920px) * 0.40625); opacity: .86; transform: scale(1.01); }
.cloud-b { width: min(62vw, 980px); height: calc(min(62vw, 980px) * 0.40625); opacity: .88; transform: scale(1.02); }

/* Centro luminoso (vivo, pero sin “niebla” alrededor) */
.core{
  position:absolute; inset: 22% 24%;
  mix-blend-mode: screen;
  background:
    radial-gradient(40% 40% at 50% 50%, rgba(255,255,255,.38), rgba(255,255,255,0) 72%),
    radial-gradient(34% 34% at 45% 46%, rgba(168,85,247,.22), transparent 72%),
    radial-gradient(36% 36% at 55% 54%, rgba(244,114,182,.20), transparent 76%);
  filter: blur(8px);
  pointer-events:none;
}

/* Estela/halo en bordes (anillo fino morado/rosa, NO llena toda la nube) */
.veil{
  position:absolute; inset:-8% -4%;
  mix-blend-mode: screen;
  background:
    radial-gradient(60% 60% at 50% 52%, transparent 58%, rgba(168,85,247,0.42) 68%, transparent 82%),
    radial-gradient(64% 64% at 50% 52%, transparent 60%, rgba(244,114,182,0.34) 74%, transparent 86%),
    radial-gradient(86% 74% at 50% 52%, rgba(255,255,255,.12), transparent 88%);
  filter: blur(8px);
  pointer-events:none;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce){
  .cloud-track, .rise, .cloud-wrap, .star { animation: none !important; transform: translate3d(0,0,0) !important; }
}

/* Responsivo */
@media (max-width: 768px){
  .track-a { top: 8vh; }
  .track-c { top: 52vh; }
  .track-b { top: 90vh; }
  .cloud-a { width: 84vw; height: calc(84vw * 0.40625); opacity: .80; }
  .cloud-c { width: 92vw; height: calc(92vw * 0.40625); opacity: .84; }
  .cloud-b { width: 100vw; height: calc(100vw * 0.40625); opacity: .86; }
}
        `}</style>

        {/* ===== SCRIPT: pinta nubes sólidas y distribuye 4 estrellas sin aparición ===== */}
        <Script id="paint-sky" strategy="afterInteractive">{`
(function(){
  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function smoothstep(e0,e1,x){ var t=clamp((x-e0)/(e1-e0),0,1); return t*t*(3-2*t); }
  function mix(a,b,t){ return a + (b - a) * t; }

  // ---- Estrellas: 4 posiciones y timings (sin aparecer desde 0, sin zoom) ----
  function setupStars(){
    var stars = document.querySelectorAll('#stars .star');
    for (var i=0; i<stars.length; i++){
      var s = stars[i];
      var size = 3.5 + Math.random()*2.0;   // 3.5 - 5.5 px
      var top = Math.random()*100;          // vh
      var left = Math.random()*100;         // vw
      var dur = 12 + Math.random()*10;      // 12s - 22s
      var delay = -Math.random()*dur;       // desincroniza sin "aparecer"
      s.style.setProperty('--sz', size.toFixed(2)+'px');
      s.style.setProperty('--twDur', dur.toFixed(2)+'s');
      s.style.top = top.toFixed(2)+'vh';
      s.style.left = left.toFixed(2)+'vw';
      s.style.animationDelay = delay.toFixed(2)+'s';
    }
  }

  // ---- Perlin 2D para las nubes ----
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

    // escalas (estructura clara y firme)
    var s1=0.010, s2=0.020, s3=0.040;
    var w1=0.60, w2=0.28, w3=0.12, inv=1/(w1+w2+w3);

    // offsets para distinguir nubes
    var off = (variant===1) ? 5000 : (variant===2 ? 9000 : 0);

    // domain warp moderado (evita "niebla")
    var warpFreq = (variant===0) ? 0.0039 : (variant===1 ? 0.0043 : 0.0041);
    var warpAmp  = (variant===0) ? 2.0    : (variant===1 ? 2.2    : 2.1);

    // feather elíptico (bordes más firmes)
    var cx = canvas.width  * (variant===0?0.52 : variant===1?0.50 : 0.51);
    var cy = canvas.height * (variant===0?0.50 : variant===1?0.54 : 0.52);
    var rx = canvas.width  * (variant===0?0.60 : variant===1?0.58 : 0.59);
    var ry = canvas.height * (variant===0?0.46 : variant===1?0.44 : 0.45);
    var featherIn  = (variant===0?0.90 : variant===1?0.90 : 0.90); // ↑ más firme
    var featherOut = (variant===0?1.02 : variant===1?1.02 : 1.02); // banda estrecha

    // densidad base más alta (más solidez)
    var baseAlpha = (variant===0?0.86 : variant===1?0.88 : 0.87);

    var tiltX = (variant===0?0.06 : variant===1?0.07 : 0.065);
    var tiltY = (variant===0?-0.03: variant===1?-0.028 : -0.029);

    // color (centro vivo, bordes no invadidos)
    var PURPLE = [210,175,255];
    var PINK   = [255,125,205];

    for (var y=0; y<canvas.height; y++){
      for (var x=0; x<canvas.width; x++){
        var wx = perlin2((x+off)*warpFreq, (y+off)*warpFreq) * warpAmp;
        var wy = perlin2((x+1000+off)*warpFreq, (y-777+off)*warpFreq) * warpAmp;

        var nx = (x + y*tiltX + wx) * s1;
        var ny = (y + x*tiltY + wy) * s1;

        var n1 = perlin2(nx, ny);
        var n2 = perlin2(nx * (s2/s1), ny * (s2/s1));
        var n3 = perlin2(nx * (s3/s1), ny * (s3/s1));
        var n  = (w1*n1 + w2*n2 + w3*n3) * inv;
        n = (n + 1) * 0.5;

        var dx=(x-cx)/rx, dy=(y-cy)/ry, r=Math.sqrt(dx*dx+dy*dy);
        var mask = 1 - smoothstep(featherIn, featherOut, r);

        // más sólido (umbral corrido y centro reforzado)
        var center = Math.max(0, 1 - r);
        var centerBoost = 0.22 * center * center;
        var a = smoothstep(0.35, 0.70, n) * mask * baseAlpha;
        a *= (0.90 + centerBoost);

        // color solo donde hay nube
        var u = x / canvas.width, v = y / canvas.height;
        var wPurple = Math.exp(-(Math.pow((u-0.26)/0.24, 2) + Math.pow((v-0.38)/0.30, 2)));
        var wPink   = Math.exp(-(Math.pow((u-0.74)/0.26, 2) + Math.pow((v-0.60)/0.32, 2)));
        var t1 = Math.min(0.50, wPurple * 0.50) * a;
        var t2 = Math.min(0.42, wPink   * 0.42) * a;

        var rC = mix(255, PURPLE[0], t1);
        var gC = mix(255, PURPLE[1], t1);
        var bC = mix(255, PURPLE[2], t1);
        rC = mix(rC, PINK[0], t2);
        gC = mix(gC, PINK[1], t2);
        bC = mix(bC, PINK[2], t2);

        var i=(y*canvas.width + x)*4;
        data[i  ] = rC|0;
        data[i+1] = gC|0;
        data[i+2] = bC|0;
        data[i+3] = Math.max(0, Math.min(255, Math.floor(a*255)));
      }
    }
    ctx.putImageData(img,0,0);
  }

  function paintAll(){
    var a = document.getElementById('cloudA');
    var c = document.getElementById('cloudC');
    var b = document.getElementById('cloudB');
    if (a) paintCloud(a, 0);
    if (c) paintCloud(c, 2);
    if (b) paintCloud(b, 1);
  }

  function init(){
    // estrellas primero (sin efecto de "aparecer")
    (function setup(){
      var stars = document.querySelectorAll('#stars .star');
      // si el HTML cambiara, aseguro 4 estrellas máximo
      if (stars.length > 4) for (var i=4; i<stars.length; i++) stars[i].remove();
      setupStars();
    })();

    // pinto nubes
    paintAll();

    // repintar en resize
    var to=null;
    window.addEventListener('resize', function(){
      clearTimeout(to);
      to=setTimeout(paintAll, 120);
    }, {passive:true});
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
