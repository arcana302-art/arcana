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
        {/* Escudo anti-flash y pre-nuke de starfields externos */}
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

          {/* Nubes (3 pistas) */}
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

/* Canvas de nubes: sin overlays rectangulares */
.cloud{
  display:block;
  width:min(52vw,860px);
  height:calc(min(52vw,860px)*0.40625);
  aspect-ratio:16/6.5;
  background:transparent;
  filter: drop-shadow(0 8px 18px rgba(0,0,0,.10));
}
.cloud-c{width:min(56vw,920px)}
.cloud-b{width:min(62vw,980px)}

/* Estrellas (con glow/estela sutiles) */
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

        {/* ===== SCRIPT: Nubes orgánicas (Poisson-ish, ruido, sin alineaciones) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // RNG determinista
  function rngFactory(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return (seed&0xffffffff)/4294967296}}
  // Gauss aproximado (Box-Muller)
  function gauss(rng){let u=0,v=0;while(u===0)u=rng();while(v===0)v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
  // 1D noise sencillo
  function makeNoise1(seed){
    const rng=rngFactory(seed), g=new Float32Array(512);
    for(let i=0;i<256;i++) g[i]=(rng()*2-1); for(let i=256;i<512;i++) g[i]=g[i-256];
    function fade(t){return t*t*t*(t*(t*6-15)+10)}
    return function(x){
      const X=Math.floor(x)|0, xf=x-X, u=fade(xf);
      const a=g[(X   )&255], b=g[(X+1)&255];
      const va=a*xf, vb=b*(xf-1);
      return va+(vb-va)*u; // [-1,1] aprox
    }
  }

  function drawPuff(ctx,x,y,r,bright){
    const g=ctx.createRadialGradient(x,y,0,x,y,r);
    g.addColorStop(0.00,'rgba(255,255,255,'+(0.26+0.12*bright).toFixed(3)+')'); // menos sólido
    g.addColorStop(0.45,'rgba(255,255,255,'+(0.16+0.08*bright).toFixed(3)+')');
    g.addColorStop(1.00,'rgba(255,255,255,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }

  // Luces color recortadas a la silueta
  function addColorLights(fx,mask){
    const W=fx.canvas.width,H=fx.canvas.height,pr=Math.min(W,H);
    const sc=document.createElement('canvas'); sc.width=W; sc.height=H; const cx=sc.getContext('2d');
    cx.globalCompositeOperation='lighter';
    let p1=cx.createRadialGradient(W*0.32,H*0.50,0,W*0.32,H*0.50,pr*0.44);
    p1.addColorStop(0,'rgba(168,85,247,0.14)'); p1.addColorStop(1,'rgba(168,85,247,0)');
    cx.fillStyle=p1; cx.fillRect(0,0,W,H);
    let p2=cx.createRadialGradient(W*0.68,H*0.60,0,W*0.68,H*0.60,pr*0.46);
    p2.addColorStop(0,'rgba(244,114,182,0.12)'); p2.addColorStop(1,'rgba(244,114,182,0)');
    cx.fillStyle=p2; cx.fillRect(0,0,W,H);
    cx.globalCompositeOperation='destination-in'; cx.drawImage(mask,0,0);
    fx.globalCompositeOperation='lighter'; fx.drawImage(sc,0,0); fx.globalCompositeOperation='source-over';
  }
  // Sombras y highlight recortados
  function addShading(fx,mask){
    const W=fx.canvas.width,H=fx.canvas.height;
    const sc=document.createElement('canvas'); sc.width=W; sc.height=H; const cx=sc.getContext('2d');
    let lg=cx.createLinearGradient(0,H*0.06,0,H*0.52);
    lg.addColorStop(0,'rgba(255,255,255,0.12)'); lg.addColorStop(1,'rgba(255,255,255,0)');
    cx.fillStyle=lg; cx.fillRect(0,0,W,H);
    cx.globalCompositeOperation='multiply';
    let sg=cx.createLinearGradient(0,H*0.52,0,H*0.98);
    sg.addColorStop(0,'rgba(10,18,30,0)');
    sg.addColorStop(1,'rgba(10,18,30,0.10)');
    cx.fillStyle=sg; cx.fillRect(0,0,W,H);
    cx.globalCompositeOperation='destination-in'; cx.drawImage(mask,0,0);
    fx.drawImage(sc,0,0);
  }
  // Limpia alfa para bordes algodonosos
  function cleanupAlpha(ctx){
    const W=ctx.canvas.width,H=ctx.canvas.height, img=ctx.getImageData(0,0,W,H), d=img.data;
    for(let i=0;i<d.length;i+=4){
      let a=d[i+3]/255; a=Math.pow(a,1.18);
      if(a<0.05){ d[i+3]=0; continue; }
      d[i+3]=Math.max(0,Math.min(255,Math.floor(a*255)));
    }
    ctx.putImageData(img,0,0);
  }

  function paintCloud(canvas,variant){
    try{
      const dpi=Math.max(1,Math.min(2,window.devicePixelRatio||1));
      const wCSS=canvas.offsetWidth||600, hCSS=canvas.offsetHeight||Math.round(wCSS*0.40625);
      const W=Math.floor(wCSS*dpi), H=Math.floor(hCSS*dpi);
      canvas.width=W; canvas.height=H;
      const ctx=canvas.getContext('2d'); if(!ctx) return; ctx.clearRect(0,0,W,H);

      const off=document.createElement('canvas'); off.width=W; off.height=H; const fx=off.getContext('2d');
      const mask=document.createElement('canvas'); mask.width=W; mask.height=H; const mx=mask.getContext('2d');

      const rng=rngFactory(variant===0?0xA11CE:variant===1?0xBADC0DE:0xC0FFEE);
      const noise=makeNoise1(variant===0?1337:variant===1?7331:4242);

      // Parámetros de forma
      const COUNT = (variant===0?120:variant===1?140:130); // muchos puffs pequeños
      const spineY = (variant===0?0.56:variant===1?0.58:0.57);
      const ampSin1 = 0.06, ampSin2 = 0.03;
      const ampNoise = 0.035;
      const baseR  = H * (variant===0?0.060:variant===1?0.062:0.061); // radios más chicos
      const spread = (variant===0?0.82:variant===1?0.86:0.84);
      const margin = (1-spread)/2;

      // Colocación tipo Poisson (rechazo con distancia mínima relativa)
      const pts=[]; const minK=0.55; let tries=0, maxTries=COUNT*30;

      while(pts.length<COUNT && tries<maxTries){
        tries++;
        const u = Math.min(1, Math.max(0, rng()**0.85)); // más densidad al centro
        const x = (margin + u*spread) * W + (rng()-0.5)*W*0.01; // jitter x extra
        const t = (x/W - margin)/spread; // 0..1 aproximado
        const yBase = spineY
          - ampSin1*Math.sin((t*2*Math.PI)+rng()*1.0)
          - ampSin2*Math.sin((t*4*Math.PI)+rng()*2.0)
          - ampNoise*noise(t*6 + rng()*10);
        const y = (yBase + gauss(rng)*0.035) * H;

        const r = baseR * (0.75 + 0.85*Math.abs(gauss(rng))) * (0.92 + 0.20*rng());
        const bright = 0.60 + 0.18*(1 - (y/H));

        // Distancia mínima vs. ya colocados
        let ok=true;
        for (let j=0;j<pts.length;j++){
          const p=pts[j]; const dx=p.x-x, dy=p.y-y, dist=Math.hypot(dx,dy);
          if (dist < minK*(p.r + r)) { ok=false; break; }
        }
        if(!ok) continue;

        pts.push({x,y,r,bright});
      }

      // Pintar puffs (mezcla aditiva) + máscara
      fx.globalCompositeOperation='lighter';
      for (let i=0;i<pts.length;i++){
        const p=pts[i];
        drawPuff(fx,p.x,p.y,p.r,p.bright);
        // secundarios (wisps) aleatorios
        if (rng()<0.45){
          const k=0.35+0.30*rng(), ang=rng()*Math.PI*2;
          drawPuff(fx, p.x+Math.cos(ang)*p.r*0.45, p.y+Math.sin(ang)*p.r*0.35, p.r*k, p.bright*0.9);
        }
        // máscara (borde suave)
        const g=mx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
        g.addColorStop(0,'rgba(255,255,255,0.9)');
        g.addColorStop(1,'rgba(255,255,255,0)');
        mx.fillStyle=g; mx.beginPath(); mx.arc(p.x,p.y,p.r,0,Math.PI*2); mx.fill();
      }
      fx.globalCompositeOperation='source-over';

      // Unificación leve y limpieza de alfa
      fx.filter='blur(0.35px)'; fx.drawImage(off,0,0); fx.filter='none';
      cleanupAlpha(fx);

      // Luces/sombras y color, recortadas a la silueta
      addShading(fx,mask);
      addColorLights(fx,mask);

      // Volcar al canvas final
      ctx.drawImage(off,0,0);
    }catch(e){}
  }

  function paintAll(){
    const a=document.getElementById('cloudA');
    const c=document.getElementById('cloudC');
    const b=document.getElementById('cloudB');
    if(a) paintCloud(a,0);
    if(c) paintCloud(c,2);
    if(b) paintCloud(b,1);
    const sky=document.getElementById('sky'); if(sky) sky.classList.add('ready');
  }
  function init(){
    paintAll();
    let to=null;
    window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(paintAll,120)},{passive:true});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else{init();}
})();
        `}</Script>

        {/* ===== Estrellas: igual que antes ===== */}
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
