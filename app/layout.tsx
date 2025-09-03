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
      <head>
        {/* Escudo anti-flash y pre-nuke (igual que antes) */}
        <style id="arcana-star-shield">{`
#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots,
[id^="star"],[id$="star"],[id*="star-"],[id*="-star"],[class^="star"],[class$="star"],[class*=" star "],
[class*="star-"],[class*="-star"]{display:none!important;animation:none!important;transition:none!important;}
#sky .featured-star,#sky .distant-star{display:block!important;}
        `}</style>
        <Script id="pre-nuke-stars" strategy="beforeInteractive">{`
(function(){
  function nuke(){
    var sky = document.getElementById('sky');
    var killSel = '#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots';
    document.querySelectorAll(killSel).forEach(function(n){ if(!sky||!sky.contains(n)) try{n.remove()}catch(e){} });
    document.querySelectorAll('[id*="star"],[class*="star"]').forEach(function(n){
      if(sky&&sky.contains(n)) return;
      if(n.classList&&(n.classList.contains('featured-star')||n.classList.contains('distant-star'))) return;
      try{n.remove()}catch(e){}
    });
  }
  nuke();
  var mo=new MutationObserver(nuke);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',function(){setTimeout(function(){mo.disconnect()},2000)});
})();
        `}</Script>
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}
      >
        {/* CIELO */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

          {/* Nubes */}
          <div className="cloud-track track-a">
            <div className="rise rise-a">
              <div className="cloud-wrap wrap-a">
                <canvas id="cloudA" className="cloud cloud-a" />
                <div className="veil veil-a" />
                <div className="glow glow-a" />
              </div>
            </div>
          </div>
          <div className="cloud-track track-c">
            <div className="rise rise-c">
              <div className="cloud-wrap wrap-c">
                <canvas id="cloudC" className="cloud cloud-c" />
                <div className="veil veil-c" />
                <div className="glow glow-c" />
              </div>
            </div>
          </div>
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
#bg-root,.belt,.bank,.puffs,.cloud-svg,.nebula,.grain,.vignette{display:none!important;}
html::before,html::after,body::before,body::after{content:none!important;display:none!important;}
:where(.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots){display:none!important;}
:where([id^="stars"],[class^="stars"],[class*=" stars"],[id*="starfield"],[class*="starfield"]){display:none!important;}
:where([id*="star"],[class*="star"])::before,:where([id*="star"],[class*="star"])::after{content:none!important;background:none!important;box-shadow:none!important;}
:where(.star){display:none!important;}
#sky #stars{display:block!important;}
#sky .featured-star,#sky .distant-star{display:block!important;}

#sky{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible;visibility:hidden;}
#sky.ready{visibility:visible;}

.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-a{top:12vh;animation:cloud-drift-a 150s linear infinite;animation-delay:-24s;}
.track-c{top:42vh;animation:cloud-drift-c 165s linear infinite;animation-delay:-36s;}
.track-b{top:72vh;animation:cloud-drift-b 180s linear infinite;animation-delay:-48s;}
@keyframes cloud-drift-a{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}
@keyframes cloud-drift-c{0%{transform:translateX(112vw)}100%{transform:translateX(-102vw)}}
@keyframes cloud-drift-b{0%{transform:translateX(115vw)}100%{transform:translateX(-105vw)}}

.rise-a{animation:cloud-rise-a 150s linear infinite;}
.rise-c{animation:cloud-rise-c 165s linear infinite;}
.rise-b{animation:cloud-rise-b 180s linear infinite;}
@keyframes cloud-rise-a{0%{transform:translateY(1.5vh)}100%{transform:translateY(-2.4vh)}}
@keyframes cloud-rise-c{0%{transform:translateY(10vh)}100%{transform:translateY(-22vh)}}
@keyframes cloud-rise-b{0%{transform:translateY(24vh)}100%{transform:translateY(-80vh)}}

.cloud-wrap{position:relative;will-change:transform;}
.wrap-a{animation:cloud-float-a 17s ease-in-out infinite alternate;}
.wrap-c{animation:cloud-float-c 19s ease-in-out infinite alternate;}
.wrap-b{animation:cloud-float-b 22s ease-in-out infinite alternate;}
@keyframes cloud-float-a{0%{transform:translateY(0)}100%{transform:translateY(0.9vh)}}
@keyframes cloud-float-c{0%{transform:translateY(0)}100%{transform:translateY(1.1vh)}}
@keyframes cloud-float-b{0%{transform:translateY(0)}100%{transform:translateY(1.5vh)}}

/* Canvas: ahora SIN fondo rectangular; todo sale pintado con “puffs” */
.cloud,.veil,.glow{visibility:hidden;}
.cloud{
  display:block;
  width:min(52vw,860px);
  height:calc(min(52vw,860px)*0.40625);
  aspect-ratio:16/6.5;
  background:none;               /* <— quitamos el gradiente base que hacía bloque */
  filter: blur(8px) drop-shadow(0 10px 22px rgba(0,0,0,.10));
}
.cloud-c{width:min(56vw,920px)}
.cloud-b{width:min(62vw,980px)}

.veil{
  position:absolute;inset:-10% -6%;
  mix-blend-mode:screen;
  background:
    radial-gradient(60% 60% at 50% 52%,transparent 58%,rgba(168,85,247,.26) 68%,transparent 82%),
    radial-gradient(64% 64% at 50% 52%,transparent 60%,rgba(244,114,182,.22) 74%,transparent 86%),
    radial-gradient(86% 74% at 50% 52%,rgba(255,255,255,.08),transparent 88%);
  filter:blur(7px);pointer-events:none;
}
.glow{
  position:absolute;inset:-22% -14%;
  mix-blend-mode:screen;
  background:
    radial-gradient(45% 55% at 30% 40%,rgba(168,85,247,.22),transparent 70%),
    radial-gradient(48% 58% at 70% 64%,rgba(244,114,182,.18),transparent 72%);
  filter:blur(18px);animation:glowPulse 6.2s ease-in-out infinite alternate;
  pointer-events:none;opacity:.42;
}
@keyframes glowPulse{0%{opacity:.36;transform:scale(1)}100%{opacity:.50;transform:scale(1.03)}}

/* Estrellas (como ya las tenías, con glow bajito y estela) */
.featured-star{
  position:absolute;width:var(--sz,4.5px);height:var(--sz,4.5px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,1) 0%,rgba(255,255,255,.95) 28%,rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.58) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.48) 0%,rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 12px rgba(255,255,255,.68))
    drop-shadow(0 0 22px rgba(168,85,247,.48))
    drop-shadow(0 0 28px rgba(244,114,182,.30));
  will-change:opacity;animation:featuredTwinkle var(--ftDur,80s) cubic-bezier(.42,0,.58,1) infinite both;
  animation-delay:var(--twDelay,0s);
}
#sky .featured-star::before,#sky .featured-star::after{
  content:"";position:absolute;inset:-14px;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,.54) 0%,rgba(255,255,255,.38) 24%,rgba(168,85,247,.32) 44%,rgba(244,114,182,.24) 60%,rgba(255,255,255,0) 80%);
  filter:blur(14px);opacity:.86;animation:starHalo var(--ftDur,80s) cubic-bezier(.42,0,.58,1) infinite;
  animation-delay:var(--twDelay,0s);
}
#sky .featured-star::after{inset:-24px;filter:blur(24px);opacity:.66;}
#sky .featured-star .tail{
  position:absolute;left:50%;top:50%;width:var(--trailW,48px);height:var(--trailH,10px);
  transform:translate(-24%,-50%) rotate(var(--trailRot,-18deg)) scaleX(1);transform-origin:0% 50%;
  border-radius:999px;pointer-events:none;mix-blend-mode:screen;
  background:
    radial-gradient(140% 90% at 0% 50%,rgba(255,255,255,.46) 0%,rgba(255,255,255,.16) 38%,rgba(255,255,255,0) 72%),
    linear-gradient(90deg,rgba(168,85,247,.18) 0%,rgba(244,114,182,.14) 45%,rgba(255,255,255,0) 100%);
  filter:blur(9px);opacity:var(--trailAlpha,.48);
  animation:tailPulse var(--ftDur,80s) cubic-bezier(.42,0,.58,1) infinite;animation-delay:var(--twDelay,0s);
}
@keyframes featuredTwinkle{0%{opacity:0}30%{opacity:.18}55%{opacity:.95}75%{opacity:.92}100%{opacity:0}}
@keyframes starHalo{0%{opacity:.22;transform:scale(.96)}35%{opacity:.54;transform:scale(1)}60%{opacity:.88;transform:scale(1.06)}80%{opacity:.64;transform:scale(1.02)}100%{opacity:.26;transform:scale(.96)}}
@keyframes tailPulse{0%{opacity:calc(var(--trailAlpha,.48)*.18);transform:translate(-26%,-50%) rotate(var(--trailRot,-18deg)) scaleX(.92)}40%{opacity:calc(var(--trailAlpha,.48)*.56)}60%{opacity:calc(var(--trailAlpha,.48)*.78)}100%{opacity:calc(var(--trailAlpha,.48)*.20);transform:translate(-26%,-50%) rotate(var(--trailRot,-18deg)) scaleX(.92)}}

.distant-star{
  position:absolute;width:var(--dsz,2px);height:var(--dsz,2px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,.75) 0%,rgba(255,255,255,.55) 30%,rgba(255,255,255,0) 65%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.18) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.12) 0%,rgba(244,114,182,0) 80%);
  filter:drop-shadow(0 0 6px rgba(255,255,255,.35)) drop-shadow(0 0 10px rgba(168,85,247,.20));
  opacity:var(--dalpha,.52);
}

@media (max-width:768px){
  .track-a{top:10vh}.track-c{top:48vh}.track-b{top:78vh}
  .cloud-a{width:84vw}.cloud-c{width:92vw}.cloud-b{width:100vw}
}
        `}</style>

        {/* ===== SCRIPT: NUEVO PINTADO DE NUBES "CÚMULO" ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // RNG determinista por variante (para que cada nube tenga “forma propia” estable)
  function makeRng(seed){ return function(){ seed=(seed*1664525+1013904223)>>>0; return (seed&0xffffffff)/4294967296; } }

  function drawPuff(ctx, x, y, r, bright){
    // “Puff” con gradiente suave: más brillante arriba
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.00, 'rgba(255,255,255,'+(0.35+0.15*bright).toFixed(3)+')');
    g.addColorStop(0.35,'rgba(255,255,255,'+(0.22+0.10*bright).toFixed(3)+')');
    g.addColorStop(1.00,'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  function drawShading(ctx, W, H){
    // Highlight en la parte superior + sombra sutil en la base (volumen)
    ctx.globalCompositeOperation = 'lighter';
    let lg = ctx.createLinearGradient(0, H*0.08, 0, H*0.55);
    lg.addColorStop(0.00,'rgba(255,255,255,0.18)');
    lg.addColorStop(1.00,'rgba(255,255,255,0)');
    ctx.fillStyle = lg; ctx.fillRect(0,0,W,H);

    ctx.globalCompositeOperation = 'multiply';
    let sg = ctx.createLinearGradient(0, H*0.45, 0, H*0.95);
    sg.addColorStop(0.00,'rgba(10,18,30,0)');
    sg.addColorStop(1.00,'rgba(10,18,30,0.10)');
    ctx.fillStyle = sg; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation = 'source-over';
  }

  function paintCloud(canvas, variant){
    try{
      // Tamaño canvas (retina)
      const dpi = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const wCSS = canvas.offsetWidth  || 600;
      const hCSS = canvas.offsetHeight || Math.round(wCSS * 0.40625);
      const W = Math.floor(wCSS * dpi);
      const H = Math.floor(hCSS * dpi);
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d'); if(!ctx) return;
      ctx.clearRect(0,0,W,H);

      // Config por variante
      const rng = makeRng( (variant===0? 0xA11CE : variant===1? 0xBADC0DE : 0xC0FFEE) );
      const COUNT = (variant===0? 28 : variant===1? 34 : 30);  // nº de “puffs”
      const spineY = (variant===0? 0.56 : variant===1? 0.58 : 0.57); // línea base
      const amp    = (variant===0? 0.10 : variant===1? 0.12 : 0.11); // amplitud vertical
      const baseR  = H * (variant===0? 0.085 : variant===1? 0.090 : 0.088); // radio medio
      const spread = (variant===0? 0.78 : variant===1? 0.82 : 0.80);        // longitud relativa

      // Mezclamos puffs con "lighter" para efecto metaball
      ctx.globalCompositeOperation = 'lighter';

      // Distribución: más grandes en el centro; arriba más brillantes
      for(let i=0;i<COUNT;i++){
        const t = i/(COUNT-1);                         // 0..1
        const x = ( (0.5 - spread/2) + t*spread ) * W; // recorre horizontal
        const hump = Math.sin(t*Math.PI);              // “panza” central
        const y = (spineY - amp*hump + (rng()-0.5)*0.06) * H;

        // Radio: más grande al centro, con jitter
        const r = baseR * (0.70 + 0.65*hump) * (0.88 + 0.24*rng());

        // Brillo: arriba un poco más
        const bright = 0.6 + 0.2*(1 - (y/H)); // 0.6–0.8 aprox.

        // Offset aleatorio para romper alineación
        const ox = (rng()-0.5) * (W*0.018);
        const oy = (rng()-0.5) * (H*0.028);

        drawPuff(ctx, x+ox, y+oy, r, bright);

        // Algunos puffs secundarios alrededor (bordes “algodonosos”)
        if (rng() < 0.7){
          const k = 0.45 + 0.25*rng();
          const ang = rng()*Math.PI*2;
          drawPuff(ctx, x+ox + Math.cos(ang)*r*0.45, y+oy + Math.sin(ang)*r*0.35, r*k, bright*0.9);
        }
      }

      // Suavizar un toque (sin perder forma)
      ctx.globalCompositeOperation = 'source-over';
      ctx.filter = 'blur(0.6px)';
      const tmp = ctx.getImageData(0,0,W,H);
      ctx.putImageData(tmp,0,0);
      ctx.filter = 'none';

      // Sombras y luz globales
      drawShading(ctx, W, H);

      // Pequeño recorte curvo arriba/abajo para evitar sensación rectangular
      ctx.globalCompositeOperation = 'destination-in';
      const mask = ctx.createLinearGradient(0, 0, 0, H);
      mask.addColorStop(0.00,'rgba(0,0,0,0)');
      mask.addColorStop(0.08,'rgba(0,0,0,0.8)');
      mask.addColorStop(0.85,'rgba(0,0,0,0.95)');
      mask.addColorStop(1.00,'rgba(0,0,0,0)');
      ctx.fillStyle = mask; ctx.fillRect(0,0,W,H);
      ctx.globalCompositeOperation = 'source-over';
    }catch(e){}
  }

  function paintAll(){
    const a = document.getElementById('cloudA');
    const c = document.getElementById('cloudC');
    const b = document.getElementById('cloudB');
    if(a) paintCloud(a,0);
    if(c) paintCloud(c,2);
    if(b) paintCloud(b,1);
    const sky = document.getElementById('sky');
    if (sky){
      sky.classList.add('ready');
      sky.querySelectorAll('.cloud,.veil,.glow').forEach(el=>{ el.style.visibility='visible'; });
    }
  }

  function init(){
    paintAll();
    let to=null;
    window.addEventListener('resize',()=>{ clearTimeout(to); to=setTimeout(paintAll,120); },{passive:true});
  }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',init,{once:true}); }
  else { init(); }
})();
        `}</Script>

        {/* ===== SCRIPT: estrellas (idéntico a tu versión anterior) ===== */}
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

  function ensureFeatured(N){
    const sky = document.getElementById('sky'); if (!sky) return;
    const holder = document.getElementById('stars') || sky;
    const curr = holder.querySelectorAll('.featured-star');
    const need = N - curr.length;
    if (need <= 0) return;
    for (let i=0; i<need; i++){
      const s = document.createElement('span');
      s.className = 'featured-star';
      const dur   = 45 + Math.random()*45;
      const size  = 4 + Math.random()*1.8;
      const top   = Math.random()*100;
      const left  = Math.random()*100;
      const delay = -Math.random()*dur;
      const tW = 40 + Math.random()*34;
      const tH = 6  + Math.random()*6;
      const tR = -22 + Math.random()*44;
      const tA = 0.42 + Math.random()*0.22;

      s.style.setProperty('--sz', size.toFixed(2)+'px');
      s.style.top  = top.toFixed(2)+'vh';
      s.style.left = left.toFixed(2)+'vw';
      s.style.setProperty('--ftDur', dur.toFixed(2)+'s');
      s.style.setProperty('--twDelay', delay.toFixed(2)+'s');
      s.style.animationDelay = delay.toFixed(2)+'s';
      s.style.setProperty('--trailW', tW.toFixed(2)+'px');
      s.style.setProperty('--trailH', tH.toFixed(2)+'px');
      s.style.setProperty('--trailRot', tR.toFixed(2)+'deg');
      s.style.setProperty('--trailAlpha', tA.toFixed(2));

      const tail = document.createElement('span'); tail.className='tail'; s.appendChild(tail);
      holder.appendChild(s);
    }
  }

  function ensureDistant(M){
    const sky = document.getElementById('sky'); if (!sky) return;
    const holder = document.getElementById('stars') || sky;
    const curr = holder.querySelectorAll('.distant-star');
    const need = M - curr.length;
    if (need <= 0) return;
    for (let i=0; i<need; i++){
      const s = document.createElement('span');
      s.className = 'distant-star';
      const size  = 1.4 + Math.random()*1.4;
      const alpha = 0.35 + Math.random()*0.25;
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
    ensureFeatured(10);
    ensureDistant(20);
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
