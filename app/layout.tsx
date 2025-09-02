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
        {/* ===== CIELO (tres nubes; inferior con ascenso épico; color intenso + glow) ===== */}
        {/* Importante: #sky inicia oculto; se muestra solo cuando los 3 canvas están pintados */}
        <div id="sky" aria-hidden>
          {/* Nube superior */}
          <div className="cloud-track track-a">
            <div className="rise rise-a">
              <div className="cloud-wrap wrap-a">
                <canvas id="cloudA" className="cloud cloud-a" />
                <div className="veil veil-a" />
                <div className="glow glow-a" />
              </div>
            </div>
          </div>
          {/* Nube central (tamaño intermedio y separada de la inferior) */}
          <div className="cloud-track track-c">
            <div className="rise rise-c">
              <div className="cloud-wrap wrap-c">
                <canvas id="cloudC" className="cloud cloud-c" />
                <div className="veil veil-c" />
                <div className="glow glow-c" />
              </div>
            </div>
          </div>
          {/* Nube inferior */}
          <div className="cloud-track track-b">
            <div className="rise rise-b">
              <div className="cloud-wrap wrap-b">
                <canvas id="cloudB" className="cloud cloud-b" />
                <div className="veil veil-b" />
                <div className="glow glow-b" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* Limpia restos antiguos */
#bg-root, .stars, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

/* #sky arranca oculto para evitar CUALQUIER flash */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; visibility: hidden; }
#sky.ready { visibility: visible; } /* sin transiciones, aparece cuando ya está pintado */

/* ------ Deriva horizontal (solo X); inician fuera de pantalla ------ */
.cloud-track {
  position: absolute; left: 0; width: 100%;
  will-change: transform;
  transform: translateX(120vw); /* offscreen de inicio */
}
.track-a { top: 12vh; animation: cloud-drift-a 150s linear infinite; }
.track-c { top: 42vh; animation: cloud-drift-c 165s linear infinite; animation-delay: 2s; }
.track-b { top: 72vh; animation: cloud-drift-b 180s linear infinite; animation-delay: 4s; }

@keyframes cloud-drift-a {
  0%   { transform: translateX(110vw); }
  100% { transform: translateX(-100vw); }
}
@keyframes cloud-drift-c {
  0%   { transform: translateX(112vw); }
  100% { transform: translateX(-102vw); }
}
@keyframes cloud-drift-b {
  0%   { transform: translateX(115vw); }
  100% { transform: translateX(-105vw); }
}

/* ------ Ascenso vertical (solo Y) ------ */
.rise { will-change: transform; }
.rise-a { animation: cloud-rise-a 150s linear infinite; }
.rise-c { animation: cloud-rise-c 165s linear infinite; animation-delay: 2s; }
.rise-b { animation: cloud-rise-b 180s linear infinite; animation-delay: 4s; }

@keyframes cloud-rise-a {
  0%   { transform: translateY(1.5vh); }
  100% { transform: translateY(-2.4vh); }
}
/* Central: ascenso moderado y separada de la inferior */
@keyframes cloud-rise-c {
  0%   { transform: translateY(10vh); }
  100% { transform: translateY(-22vh); }
}
/* Inferior: ascenso épico (~104vh) */
@keyframes cloud-rise-b {
  0%   { transform: translateY(24vh); }
  100% { transform: translateY(-80vh); }
}

/* Flotación sutil (independiente) */
.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 17s ease-in-out infinite alternate; }
.wrap-c { animation: cloud-float-c 19s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 22s ease-in-out infinite alternate; }

@keyframes cloud-float-a { 0% { transform: translateY(0); } 100% { transform: translateY(0.9vh); } }
@keyframes cloud-float-c { 0% { transform: translateY(0); } 100% { transform: translateY(1.1vh); } }
@keyframes cloud-float-b { 0% { transform: translateY(0); } 100% { transform: translateY(1.5vh); } }

/* Los canvas y velos también empiezan ocultos hasta que el script declara ready */
.cloud, .veil, .glow { visibility: hidden; }

.cloud {
  display:block;
  width: min(42vw, 700px);
  height: calc(min(42vw, 700px) * 0.40625);
  aspect-ratio: 16 / 6.5;
  background:
    radial-gradient(60% 50% at 50% 52%, rgba(255,255,255,.26) 0%, rgba(255,255,255,.13) 45%, rgba(255,255,255,0) 72%),
    radial-gradient(40% 50% at 28% 40%, rgba(210,175,255,0.12), transparent 70%),
    radial-gradient(42% 52% at 72% 62%, rgba(255,125,205,0.10), transparent 72%);
  filter: blur(24px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  border-radius: 9999px/60%;
}

/* Tamaños */
.cloud-a {
  width: min(52vw, 860px);
  height: calc(min(52vw, 860px) * 0.40625);
  opacity: 0.70;
}
.cloud-c { /* intermedia entre A y B */
  width: min(56vw, 920px);
  height: calc(min(56vw, 920px) * 0.40625);
  opacity: 0.74;
  transform: scale(1.01);
}
.cloud-b {
  width: min(62vw, 980px);
  height: calc(min(62vw, 980px) * 0.40625);
  opacity: 0.76;
  transform: scale(1.02);
}

/* Velo de luz intenso (blend SCREEN) */
.veil {
  position:absolute; inset: -14% -8%;
  background:
    radial-gradient(50% 62% at 24% 42%, rgba(168,85,247,0.44), transparent 66%),
    radial-gradient(54% 64% at 74% 62%, rgba(244,114,182,0.36), transparent 68%),
    radial-gradient(88% 76% at 50% 52%, rgba(255,255,255,.14), transparent 84%);
  mix-blend-mode: screen;
  filter: blur(12px);
  pointer-events:none;
}

/* Glow extra (pulso suave) */
.glow{
  position:absolute; inset:-26% -18%;
  mix-blend-mode: screen;
  background:
    radial-gradient(45% 55% at 30% 40%, rgba(168,85,247,0.40), transparent 70%),
    radial-gradient(48% 58% at 70% 64%, rgba(244,114,182,0.34), transparent 72%);
  filter: blur(26px);
  animation: glowPulse 5.8s ease-in-out infinite alternate;
  pointer-events:none;
}
.glow-a{ opacity:.55; }
.glow-c{ opacity:.60; }
.glow-b{ opacity:.62; }
@keyframes glowPulse{ 0% { opacity:.45; transform: scale(1); } 100% { opacity:.75; transform: scale(1.04); } }

/* Reduce motion */
@media (prefers-reduced-motion: reduce){
  .cloud-track, .rise, .cloud-wrap, .glow { animation: none !important; transform: translate3d(0,0,0) !important; }
}

/* Responsivo */
@media (max-width: 768px){
  .track-a { top: 10vh; }
  .track-c { top: 48vh; }
  .track-b { top: 78vh; }
  .cloud-a { width: 84vw; height: calc(84vw * 0.40625); opacity: .68; }
  .cloud-c { width: 90vw; height: calc(90vw * 0.40625); opacity: .70; }
  .cloud-b { width: 98vw; height: calc(98vw * 0.40625); opacity: .72; }
  .cloud  { filter: blur(22px) drop-shadow(0 8px 18px rgba(0,0,0,.10)); }
}
        `}</style>

        {/* ===== SCRIPT: pinta 3 nubes y muestra #sky SOLO cuando todo está listo ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function smoothstep(e0,e1,x){ var t=clamp((x-e0)/(e1-e0),0,1); return t*t*(3-2*t); }
  function mix(a,b,t){ return a + (b - a) * t; }

  // Perlin 2D
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
    // Dibuja una nube en su canvas (sin mostrar aún)
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

    // offsets por variante para que no sean iguales
    var off = (variant===1) ? 5000 : (variant===2 ? 9000 : 0);

    // domain warp (rompe alineaciones)
    var warpFreq = (variant===0) ? 0.0039 : (variant===1 ? 0.0043 : 0.0041);
    var warpAmp  = (variant===0) ? 2.0    : (variant===1 ? 2.2    : 2.1);

    // feather elíptico
    var cx = canvas.width  * (variant===0?0.52 : variant===1?0.50 : 0.51);
    var cy = canvas.height * (variant===0?0.50 : variant===1?0.54 : 0.52);
    var rx = canvas.width  * (variant===0?0.60 : variant===1?0.58 : 0.59);
    var ry = canvas.height * (variant===0?0.46 : variant===1?0.44 : 0.45);
    var featherIn  = (variant===0?0.84 : variant===1?0.82 : 0.83);
    var featherOut = (variant===0?1.06 : variant===1?1.04 : 1.05);

    var baseAlpha = (variant===0?0.72 : variant===1?0.75 : 0.735);

    var tiltX = (variant===0?0.06 : variant===1?0.07 : 0.065);
    var tiltY = (variant===0?-0.03: variant===1?-0.028 : -0.029);

    // Colores intensos
    var PURPLE = [210,175,255];  // #D2AFFF
    var PINK   = [255,125,205];  // #FF7DCD

    for (var y=0; y<canvas.height; y++){
      for (var x=0; x<canvas.width; x++){
        var wx = perlin2((x+off)*warpFreq, (y+off)*warpFreq) * warpAmp;
        var wy = perlin2((x+1000+off)*warpFreq, (y-777+off)*warpFreq) * warpAmp;

        var nx = (x + y*tiltX + wx) * s1;
        var ny = (y + x*tiltY + wy) * s1;

        var n1 = perlin2(nx, ny);
        var n2 = perlin2(nx * (s2/s1), ny * (s2/s1));
        var n3 = perlin2(nx * (s3/s1), ny * (s3/s1));
        var n  = (w1*n1 + w2*n2 + w3*n3) * inv; // [-1,1] → [0,1]
        n = (n + 1) * 0.5;

        var dx=(x-cx)/rx, dy=(y-cy)/ry, r=Math.sqrt(dx*dx+dy*dy);
        var mask = 1 - smoothstep(featherIn, featherOut, r);

        var a = smoothstep(0.40, 0.75, n) * mask * baseAlpha;

        // Toques de color ligados a densidad
        var u = x / canvas.width, v = y / canvas.height;
        var wPurple = Math.exp(-(
          Math.pow((u-0.26)/0.24, 2) + Math.pow((v-0.38)/0.30, 2)
        ));
        var wPink   = Math.exp(-(
          Math.pow((u-0.74)/0.26, 2) + Math.pow((v-0.60)/0.32, 2)
        ));

        var t1 = Math.min(0.65, wPurple * 0.65) * a;
        var t2 = Math.min(0.56, wPink   * 0.56) * a;

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
        data[i+3] = Math.floor(clamp(a,0,1)*255);
      }
    }
    ctx.putImageData(img,0,0);
  }

  function paintAll(){
    var a = document.getElementById('cloudA');
    var c = document.getElementById('cloudC'); // central
    var b = document.getElementById('cloudB');
    if (a) paintCloud(a, 0);
    if (c) paintCloud(c, 2);
    if (b) paintCloud(b, 1);
  }

  function showSky(){
    // Cuando todo está pintado, mostramos #sky y los elementos internos
    var sky = document.getElementById('sky');
    if (sky){ 
      sky.classList.add('ready');
      // Mostrar hijos visibles
      sky.querySelectorAll('.cloud, .veil, .glow').forEach(function(el){ el.style.visibility = 'visible'; });
    }
  }

  function init(){
    // Asegura que #sky esté oculto hasta terminar
    var sky = document.getElementById('sky');
    if (sky) sky.classList.remove('ready');

    paintAll(); // pinta sin mostrar

    // Mostrar inmediatamente tras pintar (sin transición)
    showSky();

    // Re-pintado tras resize
    var to=null;
    window.addEventListener('resize', function(){ clearTimeout(to); to=setTimeout(function(){ 
      // ocultar, repintar, mostrar
      if (sky) sky.classList.remove('ready');
      paintAll();
      showSky();
    }, 120); }, {passive:true});

    window.addEventListener('pageshow', function(){ paintAll(); showSky(); }, {passive:true});
    window.addEventListener('load', function(){ paintAll(); showSky(); }, {passive:true});
  }

  if (typeof document !== 'undefined'){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', init, {once:true});
    } else {
      init();
    }
  }
})();
        `}</Script>
      </body>
    </html>
  );
}
