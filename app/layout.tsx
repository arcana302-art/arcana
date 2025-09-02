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
        {/* ===== CIELO: 3 nubes (sólidas) ===== */}
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
/* Limpieza de restos previos molestos */
#bg-root, .belt, .bank, .puffs, .cloud-svg, .nebula, .grain, .vignette { display: none !important; }

/* --- SKY --- */
#sky { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: visible; visibility: hidden; }
#sky.ready { visibility: visible; }

/* --- NUBES: loop continuo, visibles al instante con delays negativos --- */
.cloud-track { position: absolute; left: 0; width: 100%; will-change: transform; }
.track-a { top: 12vh; animation: cloud-drift-a 150s linear infinite; animation-delay: -24s; }
.track-c { top: 42vh; animation: cloud-drift-c 165s linear infinite; animation-delay: -36s; }
.track-b { top: 72vh; animation: cloud-drift-b 180s linear infinite; animation-delay: -48s; }

@keyframes cloud-drift-a { 0% { transform: translateX(110vw); } 100% { transform: translateX(-100vw); } }
@keyframes cloud-drift-c { 0% { transform: translateX(112vw); } 100% { transform: translateX(-102vw); } }
@keyframes cloud-drift-b { 0% { transform: translateX(115vw); } 100% { transform: translateX(-105vw); } }

/* Ascenso (la inferior recorre más) */
.rise-a { animation: cloud-rise-a 150s linear infinite; }
.rise-c { animation: cloud-rise-c 165s linear infinite; }
.rise-b { animation: cloud-rise-b 180s linear infinite; }

@keyframes cloud-rise-a { 0% { transform: translateY(1.5vh); } 100% { transform: translateY(-2.4vh); } }
@keyframes cloud-rise-c { 0% { transform: translateY(10vh); } 100% { transform: translateY(-22vh); } }
@keyframes cloud-rise-b { 0% { transform: translateY(24vh); } 100% { transform: translateY(-80vh); } }

/* Flotación sutil */
.cloud-wrap { position: relative; will-change: transform; }
.wrap-a { animation: cloud-float-a 17s ease-in-out infinite alternate; }
.wrap-c { animation: cloud-float-c 19s ease-in-out infinite alternate; }
.wrap-b { animation: cloud-float-b 22s ease-in-out infinite alternate; }
@keyframes cloud-float-a { 0% { transform: translateY(0); } 100% { transform: translateY(0.9vh); } }
@keyframes cloud-float-c { 0% { transform: translateY(0); } 100% { transform: translateY(1.1vh); } }
@keyframes cloud-float-b { 0% { transform: translateY(0); } 100% { transform: translateY(1.5vh); } }

/* Canvas de nube: base nítida (sin niebla), halo leve morado/rosa */
.cloud, .veil, .glow { visibility: hidden; } /* se muestran cuando #sky está listo */
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

/* Velo de luz (contorno morado/rosa, NO niebla) */
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

/* Glow suave */
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

/* ====== ESTRELLAS (tuning global, sin tocar tu marcado) ====== */
/* 10 destacadas con dim lento (sí desaparecen) */
.featured-star{
  filter: drop-shadow(0 0 12px rgba(255,255,255,.85)) drop-shadow(0 0 22px rgba(168,85,247,.55));
  animation: featuredTwinkle var(--ftDur, 16s) ease-in-out infinite !important;
}
@keyframes featuredTwinkle {
  0%, 10%  { opacity: 0; }
  35%      { opacity: 1; }
  70%      { opacity: .92; }
  100%     { opacity: 0; }
}
/* Las demás NO desaparecen; pulso sutil 0.86–1.0 */
.star:not(.featured-star){
  animation: starPulse var(--stDur, 14s) ease-in-out infinite !important;
  opacity: .92 !important;
}
@keyframes starPulse { 0% { opacity:.86; } 50% { opacity:1; } 100% { opacity:.86; } }

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

        {/* ===== SCRIPT: Pinta nubes y muestra #sky (sin flash) ===== */}
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
      var featherIn  = (variant===0?0.90 : variant===1?0.90 : 0.90);
      var featherOut = (variant===0?1.02 : variant===1?1.02 : 1.02);

      var baseAlpha = (variant===0?0.82 : variant===1?0.84 : 0.83);

      var tiltX = (variant===0?0.06 : variant===1?0.07 : 0.065);
      var tiltY = (variant===0?-0.03: variant===1?-0.028 : -0.029);

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

          var center = Math.max(0, 1 - r);
          var centerBoost = 0.18 * center * center;
          var a = smoothstep(0.38, 0.72, n) * mask * baseAlpha;
          a *= (0.90 + centerBoost);

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

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
        `}</Script>

        {/* ===== SCRIPT: Ajuste de ESTRELLAS (conserva ~20%, 10 featured con dim; resto no desaparecen) ===== */}
        <Script id="tune-stars" strategy="afterInteractive">{`
(function(){
  function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0; [a[i],a[j]]=[a[j],a[i]];} return a; }
  function isStarLike(el){
    var w = el.offsetWidth, h = el.offsetHeight;
    if (!w || !h) return false;
    return w <= 14 && h <= 14; // puntitos
  }

  function adjustStars(){
    var list = document.querySelectorAll('#stars .star, .stars .star, .star');
    var stars = Array.prototype.slice.call(list).filter(isStarLike);
    if (!stars.length) return;

    // 1) Conservar ~20% (un quinto). Siempre al menos 10.
    shuffle(stars);
    var keep = Math.max(10, Math.ceil(stars.length * 0.20));
    var survivors = stars.slice(0, keep);
    var toRemove  = stars.slice(keep);
    toRemove.forEach(function(el){
      if (!el.classList.contains('featured-star')){ try{ el.remove(); }catch(e){} }
    });

    // 2) Asegurar EXACTAMENTE 10 featured
    var currentFeatured = survivors.filter(function(el){ return el.classList && el.classList.contains('featured-star'); });
    var need = 10 - currentFeatured.length;
    if (need > 0){
      var candidates = survivors.filter(function(el){ return !el.classList.contains('featured-star'); });
      shuffle(candidates);
      candidates.slice(0, need).forEach(function(el){ el.classList.add('featured-star'); });
    } else if (need < 0){
      shuffle(currentFeatured);
      currentFeatured.slice(10).forEach(function(el){ el.classList.remove('featured-star'); });
    }

    // 3) Duraciones y delays (desincronizadas)
    var featured = document.querySelectorAll('.featured-star');
    featured.forEach(function(el){
      var dur = 12 + Math.random()*10; // 12–22s
      var delay = -Math.random()*dur;
      el.style.setProperty('--ftDur', dur.toFixed(2)+'s');
      el.style.animationDelay = delay.toFixed(2)+'s';
      el.style.removeProperty('opacity');
    });
    var steady = document.querySelectorAll('.star:not(.featured-star)');
    steady.forEach(function(el){
      var dur = 14 + Math.random()*8; // 14–22s
      var delay = -Math.random()*dur;
      el.style.setProperty('--stDur', dur.toFixed(2)+'s');
      el.style.animationDelay = delay.toFixed(2)+'s';
      el.style.opacity = '0.92'; // no desaparecen
    });
  }

  function init(){
    adjustStars();
    var root = document.getElementById('sky') || document.body;
    if (!root) return;
    var t;
    new MutationObserver(function(){
      clearTimeout(t);
      t = setTimeout(adjustStars, 250);
    }).observe(root, {childList: true, subtree: true});
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
