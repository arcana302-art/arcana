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
        {/* Escudo anti-flash y pre-nuke (evita mar de estrellitas al cargar) */}
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
        {/* CIELO: nubes + estrellas */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

          {/* Nubes en tres pistas */}
          <div className="cloud-track track-a">
            <div className="rise rise-a">
              <div className="cloud-wrap wrap-a">
                <canvas id="cloudA" className="cloud cloud-a" />
              </div>
            </div>
          </div>
          <div className="cloud-track track-c">
            <div className="rise rise-c">
              <div className="cloud-wrap wrap-c">
                <canvas id="cloudC" className="cloud cloud-c" />
              </div>
            </div>
          </div>
          <div className="cloud-track track-b">
            <div className="rise rise-b">
              <div className="cloud-wrap wrap-b">
                <canvas id="cloudB" className="cloud cloud-b" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== ESTILOS ===== */}
        <style>{`
/* Limpieza y bloqueo de starfields externos */
#bg-root,.belt,.bank,.puffs,.cloud-svg,.nebula,.grain,.vignette{display:none!important;}
html::before,html::after,body::before,body::after{content:none!important;display:none!important;}
:where(.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots){display:none!important;}
:where([id^="stars"],[class^="stars"],[class*=" stars"],[id*="starfield"],[class*="starfield"]){display:none!important;}
:where([id*="star"],[class*="star"])::before,:where([id*="star"],[class*="star"])::after{content:none!important;background:none!important;box-shadow:none!important;}
:where(.star){display:none!important;}
#sky #stars{display:block!important;}
#sky .featured-star,#sky .distant-star{display:block!important;}

/* SKY */
#sky{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible;visibility:hidden;}
#sky.ready{visibility:visible;}

/* Pistas y movimiento de nubes */
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

/* Canvas de nube — sin fondo rectangular ni overlays */
.cloud{
  display:block;
  width:min(52vw,860px);
  height:calc(min(52vw,860px)*0.40625);
  aspect-ratio:16/6.5;
  background:transparent;
  /* blur bajito + sombra suave solo de la forma pintada */
  filter: blur(4px) drop-shadow(0 8px 18px rgba(0,0,0,.10));
}
.cloud-c{width:min(56vw,920px)}
.cloud-b{width:min(62vw,980px)}

/* Estrellas (tu versión con glow sutil y estela, sin cambios) */
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

        {/* ===== SCRIPT: Nubes cúmulo sin “bloques” ni bandas ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // RNG determinista por variante
  function rngFactory(seed){ return function(){ seed=(seed*1664525+1013904223)>>>0; return (seed&0xffffffff)/4294967296; } }

  function drawPuff(ctx, x, y, r, bright){
    // Gradiente radial suave con núcleo levemente más brillante
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0.00, 'rgba(255,255,255,'+(0.36+0.14*bright).toFixed(3)+')');
    g.addColorStop(0.42,'rgba(255,255,255,'+(0.22+0.10*bright).toFixed(3)+')');
    g.addColorStop(1.00,'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }

  // Color-lights internos (morado/rosa) dentro del MISMO canvas
  function colorLights(ctx, W, H){
    ctx.globalCompositeOperation = 'lighter';
    const pr = Math.min(W,H);
    const p1 = ctx.createRadialGradient(W*0.32, H*0.48, pr*0.00, W*0.32, H*0.48, pr*0.42);
    p1.addColorStop(0,'rgba(168,85,247,0.18)'); p1.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle = p1; ctx.fillRect(0,0,W,H);
    const p2 = ctx.createRadialGradient(W*0.70, H*0.60, pr*0.00, W*0.70, H*0.60, pr*0.46);
    p2.addColorStop(0,'rgba(244,114,182,0.16)'); p2.addColorStop(1,'rgba(244,114,182,0)');
    ctx.fillStyle = p2; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation = 'source-over';
  }

  // Suaviza alfa y elimina neblina fuera de la nube (umbral suave)
  function alphaTidy(img){
    const d = img.data; const n = d.length;
    for(let i=0;i<n;i+=4){
      let a = d[i+3]/255;
      // realce suave + umbral
      a = Math.pow(a, 1.16);
      if (a < 0.06){ d[i+3] = 0; continue; }
      d[i+3] = Math.max(0, Math.min(255, Math.floor(a*255)));
    }
  }

  function paintCloud(canvas, variant){
    try{
      const dpi = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const wCSS = canvas.offsetWidth  || 600;
      const hCSS = canvas.offsetHeight || Math.round(wCSS * 0.40625);
      const W = Math.floor(wCSS * dpi), H = Math.floor(hCSS * dpi);
      canvas.width=W; canvas.height=H;
      const ctx = canvas.getContext('2d'); if(!ctx) return;
      ctx.clearRect(0,0,W,H);

      // Pintamos en offscreen para poder “limpiar” el alfa
      const off = document.createElement('canvas'); off.width=W; off.height=H;
      const fx = off.getContext('2d');

      const rng = rngFactory( variant===0?0xA11CE : variant===1?0xBADC0DE : 0xC0FFEE );

      const COUNT = (variant===0? 32 : variant===1? 38 : 34);
      const spineY = (variant===0? 0.56 : variant===1? 0.58 : 0.57);
      const amp    = (variant===0? 0.12 : variant===1? 0.13 : 0.12);
      const baseR  = H * (variant===0? 0.085 : variant===1? 0.090 : 0.088);
      const spread = (variant===0? 0.80 : variant===1? 0.84 : 0.82);

      fx.globalCompositeOperation = 'lighter';

      for(let i=0;i<COUNT;i++){
        const t = i/(COUNT-1);
        const x = ((0.5 - spread/2) + t*spread) * W;
        const hump = Math.sin(t*Math.PI);
        const y = (spineY - amp*hump + (rng()-0.5)*0.05) * H;

        const r = baseR * (0.70 + 0.65*hump) * (0.90 + 0.22*rng());
        const bright = 0.60 + 0.20*(1 - (y/H));

        const ox = (rng()-0.5) * (W*0.016);
        const oy = (rng()-0.5) * (H*0.024);

        drawPuff(fx, x+ox, y+oy, r, bright);

        if (rng() < 0.75){
          const k = 0.42 + 0.28*rng();
          const ang = rng()*Math.PI*2;
          drawPuff(fx, x+ox + Math.cos(ang)*r*0.46, y+oy + Math.sin(ang)*r*0.36, r*k, bright*0.9);
        }
        if (rng() < 0.35){
          drawPuff(fx, x+ox + r*(rng()*0.3-0.15), y+oy - r*(0.18+0.22*rng()), r*(0.30+0.25*rng()), bright*1.0);
        }
      }

      // Luz/sombra global sutil (en el MISMO offscreen)
      fx.globalCompositeOperation = 'lighter';
      let lg = fx.createLinearGradient(0, H*0.05, 0, H*0.55);
      lg.addColorStop(0,'rgba(255,255,255,0.16)');
      lg.addColorStop(1,'rgba(255,255,255,0)');
      fx.fillStyle = lg; fx.fillRect(0,0,W,H);
      fx.globalCompositeOperation = 'source-over';

      // Color-lights (morado/rosa)
      colorLights(fx, W, H);

      // Anti-banding: ligero blur y limpieza de alfa
      fx.filter = 'blur(0.5px)';
      const snap = fx.getImageData(0,0,W,H);
      fx.putImageData(snap,0,0);
      fx.filter = 'none';

      const img = fx.getImageData(0,0,W,H);
      alphaTidy(img);

      // Volcamos al canvas final
      ctx.putImageData(img,0,0);
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

        {/* ===== SCRIPT: estrellas (igual que antes) ===== */}
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
