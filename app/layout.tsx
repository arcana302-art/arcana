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
      {/* ===== HEAD: ESCUDO ANTI-FLASH DE STARFIELDS ===== */}
      <head>
        <style id="arcana-star-shield">{`
/* Oculta cualquier starfield ajeno desde el primer milisegundo */
#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots,
[id^="star"],[id$="star"],[id*="star-"],[id*="-star"],[class^="star"],[class$="star"],[class*=" star "],
[class*="star-"],[class*="-star"]{
  display: none !important;
  animation: none !important;
  transition: none !important;
}
/* Permitimos explícitamente nuestras estrellas */
#sky .featured-star{ display:block !important; }
#sky .distant-star{ display:block !important; }
        `}</style>

        {/* Pre-nuke ultra temprano para borrar inyecciones antes de pintar */}
        <Script id="pre-nuke-stars" strategy="beforeInteractive">{`
(function(){
  function nuke(){
    var sky = document.getElementById('sky');
    var killSel = '#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots';
    document.querySelectorAll(killSel).forEach(function(n){
      if (!sky || !sky.contains(n)) { try{ n.remove(); }catch(e){} }
    });
    document.querySelectorAll('[id*="star"],[class*="star"]').forEach(function(n){
      if (sky && sky.contains(n)) return;
      if (n.classList && (n.classList.contains('featured-star') || n.classList.contains('distant-star'))) return;
      try{ n.remove(); }catch(e){}
    });
  }
  nuke();
  var mo = new MutationObserver(nuke);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load', function(){ setTimeout(function(){ mo.disconnect(); }, 2000); });
})();
        `}</Script>
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}
      >
        {/* ===== CIELO (nubes + estrellas) ===== */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

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
          {/* Nube central */}
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
/* Limpieza de overlays que puedan interferir */
#bg-root, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

/* BLOQUEO AGRESIVO DE STARFIELDS EXTERNOS (refuerzo en runtime) */
html::before, html::after, body::before, body::after { content: none !important; display: none !important; }
:where(.starfield, .bg-stars, .twinkle, .twinkling, .particles, .particle, .dots){ display:none !important; }
:where([id^="stars"], [class^="stars"], [class*=" stars"], [id*="starfield"], [class*="starfield"]){ display:none !important; }
:where([id*="star"], [class*="star"])::before,
:where([id*="star"], [class*="star"])::after { content:none !important; background:none !important; box-shadow:none !important; }
:where(.star){ display:none !important; }

/* Rehabilitar nuestras estrellas */
#sky #stars { display:block !important; }
#sky .featured-star{ display:block !important; }
#sky .distant-star{ display:block !important; }

/* SKY y NUBES */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; visibility: hidden; }
#sky.ready { visibility: visible; }

.cloud-track { position: absolute; left: 0; width: 100%; will-change: transform; }
.track-a { top: 12vh; animation: cloud-drift-a 150s linear infinite; animation-delay: -24s; }
.track-c { top: 42vh; animation: cloud-drift-c 165s linear infinite; animation-delay: -36s; }
.track-b { top: 72vh; animation: cloud-drift-b 180s linear infinite; animation-delay: -48s; }

@keyframes cloud-drift-a { 0% { transform: translateX(110vw); } 100% { transform: translateX(-100vw); } }
@keyframes cloud-drift-c { 0% { transform: translateX(112vw); } 100% { transform: translateX(-102vw); } }
@keyframes cloud-drift-b { 0% { transform: translateX(115vw); } 100% { transform: translateX(-105vw); } }

.rise-a { animation: cloud-rise-a 150s linear infinite; }
.rise-c { animation: cloud-rise-c 165s linear infinite; }
.rise-b { animation: cloud-rise-b 180s linear infinite; }
@keyframes cloud-rise-a { 0% { transform: translateY(1.5vh); } 100% { transform: translateY(-2.4vh); } }
@keyframes cloud-rise-c { 0% { transform: translateY(10vh); } 100% { transform: translateY(-22vh); } }
@keyframes cloud-rise-b { 0% { transform: translateY(24vh); } 100% { transform: translateY(-80vh); } }

.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 17s ease-in-out infinite alternate; }
.wrap-c { animation: cloud-float-c 19s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 22s ease-in-out infinite alternate; }
@keyframes cloud-float-a { 0% { transform: translateY(0); } 100% { transform: translateY(0.9vh); } }
@keyframes cloud-float-c { 0% { transform: translateY(0); } 100% { transform: translateY(1.1vh); } }
@keyframes cloud-float-b { 0% { transform: translateY(0); } 100% { transform: translateY(1.5vh); } }

/* Canvas de nube */
.cloud, .veil, .glow { visibility: hidden; }
.cloud {
  display:block;
  width: min(42vw, 700px);
  height: calc(min(42vw, 700px) * 0.40625);
  aspect-ratio: 16 / 6.5;
  background:
    radial-gradient(60% 50% at 50% 52%, rgba(255,255,255,.24) 0%, rgba(255,255,255,.12) 45%, rgba(255,255,255,0) 72%);
  filter: blur(18px) drop-shadow(0 10px 22px rgba(0,0,0,.12));
  border-radius: 9999px/60%;
}
.cloud-a { width: min(52vw, 860px); height: calc(min(52vw, 860px) * 0.40625); opacity: .78; }
.cloud-c { width: min(56vw, 920px); height: calc(min(56vw, 920px) * 0.40625); opacity: .80; transform: scale(1.01); }
.cloud-b { width: min(62vw, 980px); height: calc(min(62vw, 980px) * 0.40625); opacity: .82; transform: scale(1.02); }

.veil {
  position:absolute; inset:-10% -6%;
  mix-blend-mode: screen;
  background:
    radial-gradient(60% 60% at 50% 52%, transparent 58%, rgba(168,85,247,0.30) 68%, transparent 82%),
    radial-gradient(64% 64% at 50% 52%, transparent 60%, rgba(244,114,182,0.26) 74%, transparent 86%),
    radial-gradient(86% 74% at 50% 52%, rgba(255,255,255,.10), transparent 88%);
  filter: blur(8px);
  pointer-events:none;
}
.glow{
  position:absolute; inset:-22% -14%;
  mix-blend-mode: screen;
  background:
    radial-gradient(45% 55% at 30% 40%, rgba(168,85,247,0.26), transparent 70%),
    radial-gradient(48% 58% at 70% 64%, rgba(244,114,182,0.22), transparent 72%);
  filter: blur(20px);
  animation: glowPulse 6.2s ease-in-out infinite alternate;
  pointer-events:none;
  opacity:.45;
}
@keyframes glowPulse{ 0% { opacity:.38; transform: scale(1); } 100% { opacity:.52; transform: scale(1.03); } }

/* ===== Estrellas cercanas — DIM LENTO + HALO + ESTELA (glow ligeramente reducido) ===== */
.featured-star{
  position:absolute;
  width: var(--sz, 4.5px); height: var(--sz, 4.5px);
  border-radius: 999px;
  pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 28%, rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.58) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.48) 0%, rgba(244,114,182,0) 78%);
  /* ↓ glow un poquito menor */
  filter:
    drop-shadow(0 0 12px rgba(255,255,255,.68))
    drop-shadow(0 0 22px rgba(168,85,247,.48))
    drop-shadow(0 0 28px rgba(244,114,182,.30));
  will-change: opacity;
  animation-name: featuredTwinkle !important;
  animation-duration: var(--ftDur, 80s) !important;
  animation-timing-function: cubic-bezier(.42,0,.58,1);
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: var(--twDelay, 0s);
}
/* Halos (ligeramente menos intensos) */
#sky .featured-star::before,
#sky .featured-star::after{
  content: "" !important;
  position: absolute;
  inset: -14px;
  border-radius: 999px;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 50%,
      rgba(255,255,255,.54) 0%,
      rgba(255,255,255,.38) 24%,
      rgba(168,85,247,.32) 44%,
      rgba(244,114,182,.24) 60%,
      rgba(255,255,255,0) 80%);
  filter: blur(14px);
  opacity: .86; /* antes .92 */
  animation: starHalo var(--ftDur, 80s) cubic-bezier(.42,0,.58,1) infinite;
  animation-delay: var(--twDelay, 0s);
}
#sky .featured-star::after{
  inset: -24px;
  filter: blur(24px);
  opacity: .66; /* antes .72 */
}
/* Estela (ligeramente más sutil) */
#sky .featured-star .tail{
  position:absolute;
  left:50%; top:50%;
  width: var(--trailW, 48px);
  height: var(--trailH, 10px);
  transform:
    translate(-24%,-50%)
    rotate(var(--trailRot,-18deg))
    scaleX(1);
  transform-origin: 0% 50%;
  border-radius: 999px;
  pointer-events: none;
  mix-blend-mode: screen;
  background:
    radial-gradient(140% 90% at 0% 50%, rgba(255,255,255,.46) 0%, rgba(255,255,255,.16) 38%, rgba(255,255,255,0) 72%),
    linear-gradient(90deg, rgba(168,85,247,.18) 0%, rgba(244,114,182,.14) 45%, rgba(255,255,255,0) 100%);
  filter: blur(9px);
  opacity: var(--trailAlpha,.48); /* antes .55 */
  animation: tailPulse var(--ftDur, 80s) cubic-bezier(.42,0,.58,1) infinite;
  animation-delay: var(--twDelay, 0s);
}
@keyframes tailPulse{
  0%   { opacity: calc(var(--trailAlpha,.48) * .18); transform: translate(-26%,-50%) rotate(var(--trailRot,-18deg)) scaleX(.92); }
  40%  { opacity: calc(var(--trailAlpha,.48) * .56); transform: translate(-24%,-50%) rotate(var(--trailRot,-18deg)) scaleX(1); }
  60%  { opacity: calc(var(--trailAlpha,.48) * .78); }
  100% { opacity: calc(var(--trailAlpha,.48) * .20); transform: translate(-26%,-50%) rotate(var(--trailRot,-18deg)) scaleX(.92); }
}

/* ===== Estrellas lejanas — sin titileo ===== */
.distant-star{
  position:absolute;
  width: var(--dsz, 2px); height: var(--dsz, 2px);
  border-radius: 999px;
  pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.75) 0%, rgba(255,255,255,.55) 30%, rgba(255,255,255,0) 65%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.18) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.12) 0%, rgba(244,114,182,0) 80%);
  filter:
    drop-shadow(0 0 6px rgba(255,255,255,.35))
    drop-shadow(0 0 10px rgba(168,85,247,.20));
  opacity: var(--dalpha, .52);
}

/* Curvas de animación (para las cercanas) */
@keyframes featuredTwinkle {
  0%   { opacity: 0;   }
  30%  { opacity: .18; }
  55%  { opacity: .95; }
  75%  { opacity: .92; }
  100% { opacity: 0;   }
}
@keyframes starHalo {
  0%   { opacity: .22; transform: scale(0.96); }
  35%  { opacity: .54; transform: scale(1.00); }
  60%  { opacity: .88; transform: scale(1.06); } /* antes .96 */
  80%  { opacity: .64; transform: scale(1.02); }
  100% { opacity: .26; transform: scale(0.96); }
}

/* Responsivo */
@media (max-width: 768px){
  .track-a { top: 10vh; }
  .track-c { top: 48vh; }
  .track-b { top: 78vh; }
  .cloud-a { width: 84vw; height: calc(84vw * 0.40625); opacity: .76; }
  .cloud-c { width: 92vw; height: calc(92vw * 0.40625); opacity: .78; }
  .cloud-b { width: 100vw; height: calc(100vw * 0.40625); opacity: .80; }
}
        `}</style>

        {/* ===== SCRIPT: Pinta nubes ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  function smoothstep(e0,e1,x){ var t=Math.max(0,Math.min(1,(x-e0)/(e1-e0))); return t*t*(3-2*t); }
  var p=new Uint8Array(512);
  (function(){ var perm=new Uint8Array(256); for(var i=0;i<256;i++) perm[i]=i;
    var seed=1337; function rnd(){ seed=(seed*1664525+1013904223)>>>0; return seed/4294967296; }
    for(var i=255;i>0;i--){ var r=Math.floor(rnd()*(i+1)); var t=perm[i]; perm[i]=perm[r]; perm[r]=t; }
    for(var j=0;j<512;j++) p[j]=perm[j&255];
  })();
  function fade(t){ return t*t*t*(t*(t*6-15)+10); }
  function lerp(a,b,t){ return a+t*(b-a); }
  function grad(h,x,y){ var g=h&3, u=g<2?x:y, v=g<2?y:x; return ((g&1)?-u:u)+((g&2)?-v:v); }
  function perlin2(x,y){ var X=Math.floor(x)&255, Y=Math.floor(y)&255, xf=x-Math.floor(x), yf=y-Math.floor(y);
    var u=fade(xf), v=fade(yf);
    var aa=p[X+p[Y]], ab=p[X+p[Y+1]], ba=p[X+1+p[Y]], bb=p[X+1+p[Y+1]];
    return lerp( lerp(grad(aa,xf,yf),   grad(ba,xf-1,yf),   u),
                 lerp(grad(ab,xf,yf-1), grad(bb,xf-1,yf-1), u), v );
  }
  function paintCloud(canvas, variant){
    try{
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

      var s1=0.010, s2=0.020, s3=0.040;
      var w1=0.60, w2=0.28, w3=0.12, inv=1/(w1+w2+w3);
      var off = (variant===1) ? 5000 : (variant===2 ? 9000 : 0);
      var warpFreq = (variant===0) ? 0.0039 : (variant===1 ? 0.0043 : 0.0041);
      var warpAmp  = (variant===0) ? 2.0    : (variant===1 ? 2.2    : 2.1);
      var cx = canvas.width  * (variant===0?0.52 : variant===1?0.50 : 0.51);
      var cy = canvas.height * (variant===0?0.50 : variant===1?0.54 : 0.52);
      var rx = canvas.width  * (variant===0?0.60 : variant===1?0.58 : 0.59);
      var ry = canvas.height * (variant===0?0.46 : variant===1?0.44 : 0.45);
      var baseAlpha = (variant===0?0.82 : variant===1?0.84 : 0.83);
      var PURPLE=[210,175,255], PINK=[255,125,205];

      for (var y=0; y<canvas.height; y++){
        for (var x=0; x<canvas.width; x++){
          var wx = perlin2((x+off)*warpFreq, (y+off)*warpFreq) * warpAmp;
          var wy = perlin2((x+1000+off)*warpFreq, (y-777+off)*warpFreq) * warpAmp;

          var nx = (x + y*0.06 + wx) * s1;
          var ny = (y - x*0.03 + wy) * s1;

          var n1 = perlin2(nx, ny), n2 = perlin2(nx*(s2/s1), ny*(s2/s1)), n3 = perlin2(nx*(s3/s1), ny*(s3/s1));
          var n  = (w1*n1 + w2*n2 + w3*n3) * inv; n = (n + 1) * 0.5;

          var dx=(x-cx)/rx, dy=(y-cy)/ry, r=Math.sqrt(dx*dx+dy*dy);
          var mask = 1 - smoothstep(0.90, 1.02, r);
          var center = Math.max(0, 1 - r), centerBoost = 0.18 * center * center;

          var a = (function(v){ v = (v + 1) * 0.5; v = v*v*(3-2*v); return v; })(n);
          a = a * mask * baseAlpha * (0.90 + centerBoost);

          var u = x / canvas.width, v = y / canvas.height;
          var wPurple = Math.exp(-(Math.pow((u-0.26)/0.24, 2) + Math.pow((v-0.38)/0.30, 2)));
          var wPink   = Math.exp(-(Math.pow((u-0.74)/0.26, 2) + Math.pow((v-0.60)/0.32, 2)));
          var t1 = Math.min(0.50, wPurple * 0.50) * a;
          var t2 = Math.min(0.42, wPink   * 0.42) * a;

          var rC = 255 + (PURPLE[0]-255)*t1; rC = rC + (PINK[0]-rC)*t2;
          var gC = 255 + (PURPLE[1]-255)*t1; gC = gC + (PINK[1]-gC)*t2;
          var bC = 255 + (PURPLE[2]-255)*t1; bC = bC + (PINK[2]-bC)*t2;

          var i=(y*canvas.width + x)*4;
          data[i  ] = rC|0; data[i+1] = gC|0; data[i+2] = bC|0;
          data[i+3] = Math.max(0, Math.min(255, Math.floor(a*255)));
        }
      }
      ctx.putImageData(img,0,0);
    }catch(e){}
  }
  function paintAll(){
    var a = document.getElementById('cloudA');
    var c = document.getElementById('cloudC');
    var b = document.getElementById('cloudB');
    if (a) paintCloud(a, 0);
    if (c) paintCloud(c, 2);
    if (b) paintCloud(b, 1);
    var sky = document.getElementById('sky');
    if (sky){
      sky.classList.add('ready');
      sky.querySelectorAll('.cloud, .veil, .glow').forEach(function(el){ el.style.visibility = 'visible'; });
    }
  }
  function init(){
    paintAll();
    var to=null;
    window.addEventListener('resize', function(){ clearTimeout(to); to=setTimeout(paintAll, 120); }, {passive:true});
  }
  if (document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', init, {once:true}); } else { init(); }
})();
        `}</Script>

        {/* ===== SCRIPT: Limpiar starfields y crear 10 cercanas + 20 lejanas ===== */}
        <Script id="tune-stars" strategy="afterInteractive">{`
(function () {
  function nukeForeign(){
    const sky = document.getElementById('sky');
    const killSel = '#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots';
    document.querySelectorAll(killSel).forEach(n => { if (!sky || !sky.contains(n)) try{ n.remove(); }catch(e){} });
    document.querySelectorAll('[id*="star"], [class*="star"]').forEach(n => {
      if (sky && sky.contains(n)) return;
      if (n.classList && (n.classList.contains('featured-star') || n.classList.contains('distant-star'))) return;
      try { n.remove(); } catch(e){}
    });
  }

  // Crea N estrellas cercanas (titilan) si faltan — no borra existentes
  function ensureFeatured(N){
    const sky = document.getElementById('sky'); if (!sky) return;
    const holder = document.getElementById('stars') || sky;
    const curr = holder.querySelectorAll('.featured-star');
    const need = N - curr.length;
    if (need <= 0) return;
    for (let i=0; i<need; i++){
      const s = document.createElement('span');
      s.className = 'featured-star';

      // Timing y tamaño
      const dur   = 45 + Math.random()*45;  // 45–90s
      const size  = 4 + Math.random()*1.8;  // 4–5.8px
      const top   = Math.random()*100;
      const left  = Math.random()*100;
      const delay = -Math.random()*dur;

      // Estela (random suave por estrella)
      const tW = 40 + Math.random()*34;     // 40–74px
      const tH = 6  + Math.random()*6;      // 6–12px
      const tR = -22 + Math.random()*44;    // -22° a +22°
      const tA = 0.42 + Math.random()*0.22; // 0.42–0.64

      // tamaño/posicion
      s.style.setProperty('--sz', size.toFixed(2)+'px');
      s.style.top  = top.toFixed(2)+'vh';
      s.style.left = left.toFixed(2)+'vw';

      // tiempo
      s.style.setProperty('--ftDur', dur.toFixed(2)+'s');
      s.style.setProperty('--twDelay', delay.toFixed(2)+'s');
      s.style.animationDelay = delay.toFixed(2)+'s';

      // variables de estela
      s.style.setProperty('--trailW', tW.toFixed(2)+'px');
      s.style.setProperty('--trailH', tH.toFixed(2)+'px');
      s.style.setProperty('--trailRot', tR.toFixed(2)+'deg');
      s.style.setProperty('--trailAlpha', tA.toFixed(2));

      // hijo .tail
      const tail = document.createElement('span');
      tail.className = 'tail';
      s.appendChild(tail);

      holder.appendChild(s);
    }
  }

  // Crea M estrellas lejanas (NO titilan) — pequeñas y menos brillantes
  function ensureDistant(M){
    const sky = document.getElementById('sky'); if (!sky) return;
    const holder = document.getElementById('stars') || sky;
    const curr = holder.querySelectorAll('.distant-star');
    const need = M - curr.length;
    if (need <= 0) return;
    for (let i=0; i<need; i++){
      const s = document.createElement('span');
      s.className = 'distant-star';
      const size  = 1.4 + Math.random()*1.4;    // 1.4–2.8px
      const alpha = 0.35 + Math.random()*0.25;  // 0.35–0.60
      const top   = Math.random()*100;
      const left  = Math.random()*100;
      s.style.setProperty('--dsz', size.toFixed(2)+'px');
      s.style.setProperty('--dalpha', alpha.toFixed(2));
      s.style.top  = top.toFixed(2)+'vh';
      s.style.left = left.toFixed(2)+'vw';
      holder.appendChild(s);
    }
  }

  function init(){
    ensureFeatured(10); // 10 que titilan (con halo + estela)
    ensureDistant(20);  // 20 lejanas sin titilar
    nukeForeign();
    const mo = new MutationObserver(() => { nukeForeign(); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(nukeForeign, 800);
    setTimeout(nukeForeign, 2500);
    const shield = document.getElementById('arcana-star-shield');
    if (shield) { setTimeout(() => { try{ shield.remove(); }catch(e){} }, 1200); }
  }

  if (document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', init, { once:true }); } else { init(); }
})();
        `}</Script>
      </body>
    </html>
  );
}
