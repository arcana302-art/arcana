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
        {/* Escudo para neutralizar starfields/partículas de cualquier lib antes del primer paint */}
        <style id="arcana-star-shield">{`
#stars2,#stars3,.stars2,.stars3,.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots,
[id^="star"],[id$="star"],[id*="star-"],[id*="-star"],[class^="star"],[class$="star"],[class*=" star "],
[class*="star-"],[class*="-star"]{display:none!important;animation:none!important;transition:none!important;}
#sky .featured-star,#sky .distant-star{display:block!important;}
        `}</style>

        {/* Limpieza temprana de nodos de terceros */}
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
        {/* CIELO / BACKDROP */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

          {/* Nube principal (60vw) */}
          <div className="cloud-track track-main">
            <div className="rise rise-main">
              <canvas id="cloudMain" className="cloud cloud-main" />
            </div>
          </div>

          {/* Nube superior (25vw) que aparece en la mitad superior */}
          <div className="cloud-track track-top">
            <div className="rise rise-top">
              <canvas id="cloudTop" className="cloud cloud-top" />
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
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

/* Pistas y movimiento */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-main{top:46vh;animation:cloud-drift-main 320s linear infinite;animation-delay:-40s;}
@keyframes cloud-drift-main{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}
.track-top{top:22vh;animation:cloud-drift-top 300s linear infinite;animation-delay:-30s;}
@keyframes cloud-drift-top{0%{transform:translateX(115vw)}100%{transform:translateX(-105vw)}}

.rise-main{animation:cloud-rise-main 320s linear infinite;}
@keyframes cloud-rise-main{0%{transform:translateY(0.4vh)}100%{transform:translateY(-6.5vh)}}
.rise-top{animation:cloud-rise-top 300s linear infinite;}
@keyframes cloud-rise-top{0%{transform:translateY(0.6vh)}100%{transform:translateY(-4.5vh)}}

/* Tamaños (más altos para dar volumen) */
.cloud{display:block;background:transparent;filter:drop-shadow(0 10px 22px rgba(0,0,0,.06));}
.cloud-main{width:min(60vw,1100px);height:calc(min(60vw,1100px)*0.42);aspect-ratio:16/6.7;opacity:.92;}
.cloud-top{width:min(25vw,520px); height:calc(min(25vw,520px)*0.42); aspect-ratio:16/6.7; opacity:.88;}

@media (max-width:768px){
  .track-main{top:54vh}
  .track-top{top:26vh}
  .cloud-main{width:90vw;height:calc(90vw*0.42)}
  .cloud-top{width:58vw;height:calc(58vw*0.42)}
}

/* Estrellas (brillantes con glow sutil y titileo muy lento) */
@keyframes featuredTwinkle{0%{opacity:.85}50%{opacity:.35}100%{opacity:.85}}
.featured-star{
  position:absolute;width:var(--sz,4.5px);height:var(--sz,4.5px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,1) 0%,rgba(255,255,255,.95) 28%,rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.50) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.38) 0%,rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,.60))
    drop-shadow(0 0 18px rgba(168,85,247,.38))
    drop-shadow(0 0 22px rgba(244,114,182,.22));
  animation:featuredTwinkle var(--ftDur,80s) cubic-bezier(.42,0,.58,1) infinite both;
  animation-delay:var(--twDelay,0s);
}
#sky .featured-star::before{content:"";position:absolute;inset:-14px;border-radius:999px;filter:blur(14px);opacity:.68;
  background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.40) 0%,rgba(168,85,247,.24) 45%,rgba(244,114,182,.16) 65%,rgba(255,255,255,0) 85%);
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
        `}</style>

        {/* ===== PINTADO DE NUBES (banco cumulus + halo etéreo + centro luminoso) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // ---------- util ruido ----------
  const fade=t=>t*t*t*(t*(t*6-15)+10);
  const clamp=(x,a,b)=>x<a?a:(x>b?b:x);
  const fract=x=>x-Math.floor(x);
  const prng=(i,s)=>fract(Math.sin(i*133.3 + s*0.73)*43758.5453);

  function hash(i,j,seed){const s=Math.sin(i*127.1 + j*311.7 + seed*0.123)*43758.5453;return s-Math.floor(s)}
  function v2(x,y,seed){
    const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi, u=fade(xf), v=fade(yf);
    const v00=hash(xi,yi,seed), v10=hash(xi+1,yi,seed), v01=hash(xi,yi+1,seed), v11=hash(xi+1,yi+1,seed);
    const x1=v00+(v10-v00)*u, x2=v01+(v11-v01)*u; return x1+(x2-x1)*v;
  }
  function fbm(x,y,seed){
    let t=0, amp=0.55, freq=1.0; const rot=0.42, cs=Math.cos(rot), sn=Math.sin(rot);
    for(let o=0;o<5;o++){ const rx=x*freq*cs - y*freq*sn, ry=x*freq*sn + y*freq*cs;
      t += v2(rx,ry,seed+o*19)*amp; freq*=2.0; amp*=0.5; }
    return t;
  }

  // banco de nubes (base + domos)
  function buildBankLobes(W,H,seed,opts){
    const o=Object.assign({
      baseY:0.66, baseA:0.52, baseB:0.24,   // base ancha/alta
      domes:5, spread:0.72, yJitter:0.05,
      aMin:0.14, aMax:0.20,                 // domos grandes
      bMin:0.26, bMax:0.34
    },opts||{});
    const L=[];
    L.push({x:W*0.50,y:H*o.baseY,a:W*o.baseA,b:H*o.baseB});
    const start=0.5-o.spread/2;
    for(let i=0;i<o.domes;i++){
      const u=i/(o.domes-1), px=start+u*o.spread;
      const a=W*(o.aMin+(o.aMax-o.aMin)*(0.45+0.55*prng(i+11,seed)));
      const b=H*(o.bMin+(o.bMax-o.bMin)*(0.45+0.55*prng(i+33,seed)));
      const y=H*(o.baseY-0.09-o.yJitter*(0.5-prng(i+77,seed)));
      const x=W*(0.12+px*0.76+(prng(i+55,seed)-0.5)*0.025);
      L.push({x,y,a,b});
    }
    return L;
  }

  function renderCloud(canvas,cfg){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||800, hCSS=canvas.offsetHeight||Math.round(wCSS*0.42);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    // ---- tuning anti-grano y bordes suaves ----
    const seed=cfg.seed??6501;
    const baseS=Math.min(W,H)*(cfg.baseS??0.0148); // escala mayor => menos puntitos
    const detS =baseS*(cfg.detMul??2.1);          // menos detalle fino
    const warpS=Math.min(W,H)*(cfg.warpS??0.0060);
    const warpA=cfg.warpA??2.8;                   // menos “desgarro”

    const L=cfg.lobes??buildBankLobes(W,H,seed,cfg.bankOpts);
    const lobe=(cx,cy,a,b,x,y)=>{const dx=(x-cx)/a, dy=(y-cy)/b; return Math.max(0,1-(dx*dx+dy*dy))};
    const su=(e1,e2)=>1-(1-e1)*(1-e2);
    const silhouette=(x,y)=>{let e=0; for(let i=0;i<L.length;i++){const li=L[i]; e=su(e,lobe(li.x,li.y,li.a,li.b,x,y));} return e};

    function fieldAt(x,y){
      const wx=fbm(x/warpS,y/warpS,seed+501), wy=fbm((x+90)/warpS,(y-60)/warpS,seed+907);
      const sx=x/baseS+(wx-0.5)*warpA, sy=y/baseS+(wy-0.5)*warpA;
      const n1=fbm(sx*0.7,sy*0.7,seed+11), n2=fbm(x/detS,y/detS,seed+77);
      let n=n1*0.72+n2*0.55;
      const e=silhouette(x,y);
      const edge=fbm(sx*0.18,sy*0.18,seed+7);
      const baseMask=clamp(1- (y/H-0.74)*2.2,0,1); // suaviza base
      n=n*Math.pow(e,0.60)*(0.78+edge*0.28)*(0.88+0.12*baseMask);
      return {n,e};
    }

    // capas con menos dureza y más cuerpo
    const thCore=0.46, softCore=0.24, curveCore=0.96, densCore=0.66;
    const thBody=0.51, softBody=0.34, curveBody=1.00, densBody=0.32;
    const thMist=0.57, softMist=0.70, curveMist=1.05, densMist=0.18;

    // pintado con suavizado 9-samples (menos “popcorn”)
    const img=ctx.createImageData(W,H); const d=img.data;
    for(let y=0,k=0;y<H;y++){
      for(let x=0;x<W;x++,k+=4){
        const p=[fieldAt(x,y),
                 fieldAt(x+2,y),fieldAt(x-2,y),fieldAt(x,y+2),fieldAt(x,y-2),
                 fieldAt(x+2,y+2),fieldAt(x-2,y-2),fieldAt(x+2,y-2),fieldAt(x-2,y+2)];
        let n=p[0].n*0.44, e=p[0].e*0.44;
        for(let i=1;i<p.length;i++){ n+=p[i].n*0.07; e+=p[i].e*0.07; }

        let aCore = Math.pow(clamp((n-thCore)/softCore,0,1),curveCore)*densCore;
        let aBody = Math.pow(clamp((n-thBody)/softBody,0,1),curveBody)*densBody;
        let aMist = Math.pow(clamp((n-thMist)/(softMist+(1-e)*0.30),0,1),curveMist)*densMist;

        const alpha=clamp(aCore+aBody+aMist,0,1);
        if(alpha<=0){d[k+3]=0; continue;}
        d[k]=255; d[k+1]=255; d[k+2]=255; d[k+3]=Math.floor(alpha*255);
      }
    }
    ctx.putImageData(img,0,0);

    // ---- halo borroso detrás (verdadera neblina de borde) ----
    const tmp=document.createElement('canvas'); tmp.width=W; tmp.height=H;
    const tctx=tmp.getContext('2d'); tctx.putImageData(img,0,0);
    ctx.save();
    ctx.globalCompositeOperation='destination-over';
    ctx.globalAlpha=0.55; ctx.filter='blur(10px)'; // halo suave
    ctx.drawImage(tmp,-4,-4,W+8,H+8);
    ctx.restore();
    ctx.filter='none';

    // ---- luz central sutil + tinte muy ligero ----
    ctx.globalCompositeOperation='lighter';
    const pr=Math.min(W,H);
    const glow=ctx.createRadialGradient(W*0.50,H*0.54,0,W*0.50,H*0.54,pr*0.40);
    glow.addColorStop(0,'rgba(255,255,255,0.16)');
    glow.addColorStop(0.6,'rgba(255,255,255,0.06)');
    glow.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

    const mag=ctx.createRadialGradient(W*0.44,H*0.50,0,W*0.44,H*0.50,pr*0.52);
    mag.addColorStop(0,'rgba(168,85,247,0.07)'); mag.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle=mag; ctx.fillRect(0,0,W,H);

    const pink=ctx.createRadialGradient(W*0.60,H*0.60,0,W*0.60,H*0.60,pr*0.54);
    pink.addColorStop(0,'rgba(244,114,182,0.06)'); pink.addColorStop(1,'rgba(244,114,182,0)');
    ctx.fillStyle=pink; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
  }

  function paintAll(){
    const main=document.getElementById('cloudMain');
    const top =document.getElementById('cloudTop');

    if(main) renderCloud(main,{
      seed: 8101, warpA: 2.8,
      bankOpts:{ domes:5, spread:0.74, baseY:0.66, aMin:0.14, aMax:0.20, bMin:0.26, bMax:0.34 }
    });

    if(top) renderCloud(top,{
      seed: 9053, warpA: 2.9,
      bankOpts:{ domes:4, spread:0.64, baseY:0.62, aMin:0.12, aMax:0.18, bMin:0.24, bMax:0.30 }
    });
  }

  function init(){
    paintAll();
    const sky=document.getElementById('sky'); if(sky) sky.classList.add('ready');
    let to=null;
    window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(paintAll,140)},{passive:true});
  }

  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else{init();}
})();
        `}</Script>

        {/* ===== Estrellas (tuning lento + limpieza de intrusos) ===== */}
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
