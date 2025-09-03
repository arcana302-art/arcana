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
        <style id="arcana-star-shield">{`
#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots,
[id^="star"],[id$="star"],[id*="star-"],[id*="-star"],[class^="star"],[class$="star"],[class*=" star "],
[class*="star-"],[class*="-star"]{display:none!important;animation:none!important;transition:none!important;}
#sky .featured-star,#sky .distant-star{display:block!important;}
        `}</style>
        <Script id="pre-nuke-stars" strategy="beforeInteractive">{`
(function(){
  function nuke(){
    var sky=document.getElementById('sky');
    var kill='#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots';
    document.querySelectorAll(kill).forEach(n=>{if(!sky||!sky.contains(n))try{n.remove()}catch(e){}});
    document.querySelectorAll('[id*="star"],[class*="star"]').forEach(n=>{
      if(sky&&sky.contains(n))return;
      if(n.classList&&(n.classList.contains('featured-star')||n.classList.contains('distant-star')))return;
      try{n.remove()}catch(e){}
    });
  }
  nuke(); var mo=new MutationObserver(nuke);
  mo.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',()=>setTimeout(()=>mo.disconnect(),2000));
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

          {/* TRES PISTAS DE NUBES */}
          <div className="cloud-track track-a"><div className="rise rise-a"><div className="cloud-wrap wrap-a"><canvas id="cloudA" className="cloud cloud-a"/></div></div></div>
          <div className="cloud-track track-c"><div className="rise rise-c"><div className="cloud-wrap wrap-c"><canvas id="cloudC" className="cloud cloud-c"/></div></div></div>
          <div className="cloud-track track-b"><div className="rise rise-b"><div className="cloud-wrap wrap-b"><canvas id="cloudB" className="cloud cloud-b"/></div></div></div>
        </div>

        <div className="relative z-10">{children}</div>

        {/* ====== CSS ====== */}
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
/* Velocidad LENTA y suave */
.track-a{top:12vh;animation:cloud-drift-a 280s linear infinite;animation-delay:-40s;}
.track-c{top:42vh;animation:cloud-drift-c 320s linear infinite;animation-delay:-60s;}
.track-b{top:72vh;animation:cloud-drift-b 360s linear infinite;animation-delay:-80s;}
@keyframes cloud-drift-a{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}
@keyframes cloud-drift-c{0%{transform:translateX(112vw)}100%{transform:translateX(-102vw)}}
@keyframes cloud-drift-b{0%{transform:translateX(115vw)}100%{transform:translateX(-105vw)}}

.rise-a{animation:cloud-rise-a 280s linear infinite;}
.rise-c{animation:cloud-rise-c 320s linear infinite;}
.rise-b{animation:cloud-rise-b 360s linear infinite;}
@keyframes cloud-rise-a{0%{transform:translateY(1.2vh)}100%{transform:translateY(-2.0vh)}}
@keyframes cloud-rise-c{0%{transform:translateY(9vh)}100%{transform:translateY(-18vh)}}
@keyframes cloud-rise-b{0%{transform:translateY(22vh)}100%{transform:translateY(-70vh)}}

.cloud-wrap{position:relative;will-change:transform;}
.wrap-a{animation:cloud-float-a 18s ease-in-out infinite alternate;}
.wrap-c{animation:cloud-float-c 20s ease-in-out infinite alternate;}
.wrap-b{animation:cloud-float-b 22s ease-in-out infinite alternate;}
@keyframes cloud-float-a{0%{transform:translateY(0)}100%{transform:translateY(1.0vh)}}
@keyframes cloud-float-c{0%{transform:translateY(0)}100%{transform:translateY(1.2vh)}}
@keyframes cloud-float-b{0%{transform:translateY(0)}100%{transform:translateY(1.4vh)}}

/* Canvas de nubes */
.cloud{
  display:block;
  width:min(60vw,980px);
  height:calc(min(60vw,980px)*0.38);
  aspect-ratio:16/6.1;
  background:transparent;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,.08));
}
.cloud-c{width:min(64vw,1060px)}
.cloud-b{width:min(68vw,1140px)}

/* Estrellas (sin cambios) */
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
  .cloud-a{width:88vw}.cloud-c{width:96vw}.cloud-b{width:104vw}
}
        `}</style>

        {/* ===== NUBES: sin columnas y menos sólidas ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  function rng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return (seed&0xffffffff)/4294967296}}
  function noise1(seed){
    const r=rng(seed), g=new Float32Array(512);
    for(let i=0;i<256;i++) g[i]=r()*2-1; for(let i=256;i<512;i++) g[i]=g[i-256];
    const f=t=>t*t*t*(t*(t*6-15)+10);
    return x=>{const X=Math.floor(x)|0, xf=x-X, u=f(xf); const a=g[X&255], b=g[(X+1)&255]; return a*(1-u)+b*u;}
  }
  function puff(ctx,x,y,r,a){
    const g=ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0,'rgba(255,255,255,'+a.toFixed(3)+')');
    g.addColorStop(0.45,'rgba(255,255,255,'+(a*0.55).toFixed(3)+')');
    g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fill();
  }

  function paint(canvas, variant){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||800, hCSS=canvas.offsetHeight||Math.round(wCSS*0.38);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;
    ctx.clearRect(0,0,W,H);

    const rnd=rng(variant===0?0xA11CE:variant===1?0xBADC0DE:0xC0FFEE);
    const nz =noise1(variant===0?1337:variant===1?7331:4242);

    // Más segmentos + radios más pequeños + alfa más baja = nube menos sólida
    const SEG   =(variant===0?170:variant===1?190:180);
    const spread=(variant===0?0.86:variant===1?0.90:0.88);
    const baseY =(variant===0?0.56:variant===1?0.58:0.57);
    const baseR = H*(variant===0?0.038:variant===1?0.040:0.039);
    const margin=(1-spread)/2;

    // Tres hileras con FASE distinta (rompe columnas)
    const rows=[
      {dy:-0.055, scale:0.92, jig:0.014, phase:rnd(), sinp:rnd()*6.283},
      {dy: 0.000, scale:1.00, jig:0.018, phase:rnd(), sinp:rnd()*6.283},
      {dy:+0.060, scale:0.88, jig:0.015, phase:rnd(), sinp:rnd()*6.283},
    ];

    ctx.globalCompositeOperation='lighter';

    rows.forEach(row=>{
      for(let i=0;i<SEG;i++){
        // t con desplazamiento de fase + jitter → NO hay alineación vertical
        const t = ((i + row.phase) / (SEG-1)) % 1;
        // x con jitter y una ondita sutil para romper la rectitud
        const xBase = (margin + t*spread) * W;
        const x = xBase
          + (rnd()-0.5)*W*row.jig
          + Math.sin(t*10 + row.sinp)*W*0.004;

        const hump = Math.sin(t*Math.PI);
        const y = (baseY + row.dy
                  - 0.045*Math.sin(t*2*Math.PI + row.sinp*0.6)
                  - 0.022*Math.sin(t*4*Math.PI + row.sinp*1.1)
                  - 0.028*nz(t*5 + row.sinp)
                  + (rnd()-0.5)*0.018) * H;

        const r = baseR * row.scale * (0.70 + 0.60*hump) * (0.92 + 0.20*rnd());
        const a = 0.30 + 0.10*(1-(y/H)); // ↓ menos sólido que antes

        puff(ctx,x,y,r,a);

        // Wisps secundarios (más sutiles)
        if (rnd()<0.45){
          const ang=rnd()*6.283, k=0.30+0.26*rnd();
          puff(ctx, x+Math.cos(ang)*r*0.42, y+Math.sin(ang)*r*0.34, r*k, a*0.80);
        }
      }
    });

    ctx.globalCompositeOperation='source-over';
  }

  function all(){
    const a=document.getElementById('cloudA');
    const c=document.getElementById('cloudC');
    const b=document.getElementById('cloudB');
    if(a) paint(a,0); if(c) paint(c,2); if(b) paint(b,1);
    const sky=document.getElementById('sky'); if(sky) sky.classList.add('ready');
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',all,{once:true});}else{all();}
})();
        `}</Script>

        {/* ===== Estrellas ===== */}
        <Script id="tune-stars" strategy="afterInteractive">{`
(function () {
  function nukeForeign(){
    const sky=document.getElementById('sky');
    const kill='#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots';
    document.querySelectorAll(kill).forEach(n=>{if(!sky||!sky.contains(n))try{n.remove()}catch(e){}});
    document.querySelectorAll('[id*="star"], [class*="star"]').forEach(n=>{
      if(sky&&sky.contains(n))return;
      if(n.classList&&(n.classList.contains('featured-star')||n.classList.contains('distant-star')))return;
      try{n.remove()}catch(e){}
    });
  }
  function ensureFeatured(N){
    const sky=document.getElementById('sky'); if(!sky) return;
    const holder=document.getElementById('stars')||sky;
    const curr=holder.querySelectorAll('.featured-star'); const need=N-curr.length; if(need<=0) return;
    for(let i=0;i<need;i++){
      const s=document.createElement('span'); s.className='featured-star';
      const dur=45+Math.random()*45, size=4+Math.random()*1.8;
      const top=Math.random()*100, left=Math.random()*100, delay=-Math.random()*dur;
      const tW=40+Math.random()*34, tH=6+Math.random()*6, tR=-22+Math.random()*44, tA=0.42+Math.random()*0.22;
      s.style.setProperty('--sz',size.toFixed(2)+'px');
      s.style.top=top.toFixed(2)+'vh'; s.style.left=left.toFixed(2)+'vw';
      s.style.setProperty('--ftDur',dur.toFixed(2)+'s'); s.style.setProperty('--twDelay',delay.toFixed(2)+'s');
      s.style.animationDelay=delay.toFixed(2)+'s';
      s.style.setProperty('--trailW',tW.toFixed(2)+'px'); s.style.setProperty('--trailH',tH.toFixed(2)+'px');
      s.style.setProperty('--trailRot',tR.toFixed(2)+'deg'); s.style.setProperty('--trailAlpha',tA.toFixed(2));
      const tail=document.createElement('span'); tail.className='tail'; s.appendChild(tail);
      holder.appendChild(s);
    }
  }
  function ensureDistant(M){
    const sky=document.getElementById('sky'); if(!sky) return;
    const holder=document.getElementById('stars')||sky;
    const curr=holder.querySelectorAll('.distant-star'); const need=M-curr.length; if(need<=0) return;
    for(let i=0;i<need;i++){
      const s=document.createElement('span'); s.className='distant-star';
      const size=1.4+Math.random()*1.4, alpha=0.35+Math.random()*0.25;
      const top=Math.random()*100, left=Math.random()*100;
      s.style.setProperty('--dsz',size.toFixed(2)+'px'); s.style.setProperty('--dalpha',alpha.toFixed(2));
      s.style.top=top.toFixed(2)+'vh'; s.style.left=left.toFixed(2)+'vw';
      holder.appendChild(s);
    }
  }
  function init(){
    ensureFeatured(10); ensureDistant(20); nukeForeign();
    const mo=new MutationObserver(()=>nukeForeign());
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(nukeForeign,800); setTimeout(nukeForeign,2500);
    const shield=document.getElementById('arcana-star-shield'); if(shield){setTimeout(()=>{try{shield.remove()}catch(e){}},1200);}
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else{init();}
})();
        `}</Script>
      </body>
    </html>
  );
}
