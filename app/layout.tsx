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
        {/* Escudo y limpieza temprana de starfields/particles de terceros */}
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
        {/* Backdrop fijo */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

          {/* Nube principal (60vw) */}
          <div className="cloud-track track-main">
            <div className="rise rise-main">
              <canvas id="cloudMain" className="cloud cloud-main" />
            </div>
          </div>

          {/* Nube superior (25vw) */}
          <div className="cloud-track track-top">
            <div className="rise rise-top">
              <canvas id="cloudTop" className="cloud cloud-top" />
            </div>
          </div>
        </div>

        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
/* Desactivar efectos externos */
#bg-root,.belt,.bank,.puffs,.cloud-svg,.nebula,.grain,.vignette{display:none!important;}
:where(.starfield,.bg-stars,.twinkle,.twinkling,.particles,.particle,.dots){display:none!important;}
:where([id^="stars"],[class^="stars"],[class*=" stars"],[id*="starfield"],[class*="starfield"]){display:none!important;}
:where([id*="star"],[class*="star"])::before,:where([id*="star"],[class*="star"])::after{content:none!important;background:none!important;box-shadow:none!important;}

#sky{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible;visibility:visible;} /* visible YA */

/* Movimiento */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-main{top:46vh;animation:cloud-drift-main 300s linear infinite;animation-delay:-40s;}
@keyframes cloud-drift-main{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}
.track-top{top:22vh;animation:cloud-drift-top 280s linear infinite;animation-delay:-30s;}
@keyframes cloud-drift-top{0%{transform:translateX(115vw)}100%{transform:translateX(-105vw)}}

.rise-main{animation:cloud-rise-main 300s linear infinite;}
@keyframes cloud-rise-main{0%{transform:translateY(0.4vh)}100%{transform:translateY(-6vh)}}
.rise-top{animation:cloud-rise-top 280s linear infinite;}
@keyframes cloud-rise-top{0%{transform:translateY(0.5vh)}100%{transform:translateY(-4vh)}}

/* Tamaños */
.cloud{display:block;background:transparent;filter:drop-shadow(0 10px 20px rgba(0,0,0,.05));}
.cloud-main{width:min(60vw,1100px);height:calc(min(60vw,1100px)*0.42);aspect-ratio:16/6.7;opacity:.92;}
.cloud-top {width:min(25vw,520px); height:calc(min(25vw,520px)*0.42); aspect-ratio:16/6.7;opacity:.90;}

@media (max-width:768px){
  .track-main{top:54vh}
  .track-top{top:26vh}
  .cloud-main{width:90vw;height:calc(90vw*0.42)}
  .cloud-top{width:58vw;height:calc(58vw*0.42)}
}

/* Estrellas (titileo MUY lento + glow sutil) */
@keyframes featuredTwinkle{0%{opacity:.85}50%{opacity:.45}100%{opacity:.85}}
.featured-star{
  position:absolute;width:var(--sz,4.5px);height:var(--sz,4.5px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,1) 0%,rgba(255,255,255,.95) 28%,rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.45) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.30) 0%,rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,.55))
    drop-shadow(0 0 16px rgba(168,85,247,.32))
    drop-shadow(0 0 20px rgba(244,114,182,.18));
  animation:featuredTwinkle var(--ftDur,90s) linear infinite both;
  animation-delay:var(--twDelay,0s);
}
#sky .featured-star::before{content:"";position:absolute;inset:-14px;border-radius:999px;filter:blur(12px);opacity:.6;
  background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.35) 0%,rgba(168,85,247,.20) 45%,rgba(244,114,182,.12) 65%,rgba(255,255,255,0) 85%);
}
.distant-star{
  position:absolute;width:var(--dsz,2px);height:var(--dsz,2px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,.75) 0%,rgba(255,255,255,.55) 30%,rgba(255,255,255,0) 65%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.16) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.10) 0%,rgba(244,114,182,0) 80%);
  filter:drop-shadow(0 0 6px rgba(255,255,255,.32)) drop-shadow(0 0 9px rgba(168,85,247,.18));
  opacity:var(--dalpha,.50);
}
        `}</style>

        {/* ===== NUBES SUAVES (cumulus) — SIN GRANULADO y SIN DELAY ===== */}
        <Script id="paint-clouds" strategy="beforeInteractive">{`
(function(){
  // -------- util ----------
  const clamp=(x,a,b)=>x<a?a:(x>b?b:x);
  const fade=t=>t*t*t*(t*(t*6-15)+10);
  const fract=x=>x-Math.floor(x);
  const prng=(i,s)=>fract(Math.sin(i*133.3 + s*0.73)*43758.5453);

  function hash(i,j,seed){const s=Math.sin(i*127.1 + j*311.7 + seed*0.123)*43758.5453;return s-Math.floor(s)}
  function v2(x,y,seed){
    const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi, u=fade(xf), v=fade(yf);
    const v00=hash(xi,yi,seed), v10=hash(xi+1,yi,seed), v01=hash(xi,yi+1,seed), v11=hash(xi+1,yi+1,seed);
    const x1=v00+(v10-v00)*u, x2=v01+(v11-v01)*u; return x1+(x2-x1)*v;
  }
  function fbm(x,y,seed){
    let t=0, amp=0.55, freq=1.0; const rot=0.35, cs=Math.cos(rot), sn=Math.sin(rot);
    for(let o=0;o<4;o++){ const rx=x*freq*cs - y*freq*sn, ry=x*freq*sn + y*freq*cs;
      t += v2(rx,ry,seed+o*19)*amp; freq*=2.0; amp*=0.5; }
    return t;
  }
  const smoothstep=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1); return t*t*(3-2*t);};

  // Banco de nubes (base + domos amplios)
  function buildBankLobes(W,H,seed,opts){
    const o=Object.assign({
      baseY:0.66, baseA:0.55, baseB:0.26,  // base más grande para volumen
      domes:4,  spread:0.70, yJitter:0.05,
      aMin:0.18,aMax:0.24, bMin:0.30,bMax:0.36
    },opts||{});
    const L=[];
    L.push({x:W*0.50,y:H*o.baseY,a:W*o.baseA,b:H*o.baseB});
    const start=0.5-o.spread/2;
    for(let i=0;i<o.domes;i++){
      const u=i/(o.domes-1), px=start+u*o.spread;
      const a=W*(o.aMin+(o.aMax-o.aMin)*(0.45+0.55*prng(i+11,seed)));
      const b=H*(o.bMin+(o.bMax-o.bMin)*(0.45+0.55*prng(i+33,seed)));
      const y=H*(o.baseY-0.10-o.yJitter*(0.5-prng(i+77,seed)));
      const x=W*(0.12+px*0.76+(prng(i+55,seed)-0.5)*0.02);
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

    const seed=cfg.seed??7001;
    const L=buildBankLobes(W,H,seed,cfg.bankOpts);

    const lobe=(cx,cy,a,b,x,y)=>{const dx=(x-cx)/a, dy=(y-cy)/b; return Math.max(0,1-(dx*dx+dy*dy))};
    const su=(e1,e2)=>1-(1-e1)*(1-e2);
    const silhouette=(x,y)=>{let e=0; for(let i=0;i<L.length;i++){const li=L[i]; e=su(e,lobe(li.x,li.y,li.a,li.b,x,y));} return e};

    // Escalas de ruido muy BAJAS (solo para borde)
    const edgeScale = Math.min(W,H)*0.020;
    const mistScale = Math.min(W,H)*0.012;

    const img=ctx.createImageData(W,H); const d=img.data;
    for(let y=0,k=0;y<H;y++){
      for(let x=0;x<W;x++,k+=4){
        const e = silhouette(x,y);                // 0..1 masa base
        // Bordes: ruido low-freq que solo afecta cerca del borde
        const nEdge = fbm(x/edgeScale, y/edgeScale, seed+123);
        const edgeMask = smoothstep(0.20, 0.65, e);    // dentro sólido
        const rim = (1-edgeMask);                      // cerca del borde
        const rimNoise = rim * (0.45 + 0.55*nEdge);    // ondulación suave

        // Alfa por capas: núcleo liso + cuerpo + halo etéreo
        const core = smoothstep(0.58, 0.78, e) * 0.68;
        const body = smoothstep(0.38, 0.65, e) * 0.34;
        const mist = smoothstep(0.22, 0.38 + 0.10*fbm(x/mistScale,y/mistScale,seed+333), e) * 0.18 * (0.85 + 0.15*nEdge);

        let alpha = core + body + mist + rimNoise*0.25;
        alpha = clamp(alpha, 0, 1);

        if(alpha <= 0.003){ d[k+3]=0; continue; }
        d[k]=255; d[k+1]=255; d[k+2]=255; d[k+3]=Math.floor(alpha*255);
      }
    }
    ctx.putImageData(img,0,0);

    // Halo borroso detrás (niebla suave)
    const tmp=document.createElement('canvas'); tmp.width=W; tmp.height=H;
    const tctx=tmp.getContext('2d'); tctx.putImageData(img,0,0);
    ctx.save();
    ctx.globalCompositeOperation='destination-over';
    ctx.globalAlpha=0.50; ctx.filter='blur(9px)';
    ctx.drawImage(tmp,-4,-4,W+8,H+8);
    ctx.restore();
    ctx.filter='none';

    // Luz central sutil + tinte mágico ligero
    ctx.globalCompositeOperation='lighter';
    const pr=Math.min(W,H);
    const glow=ctx.createRadialGradient(W*0.50,H*0.54,0,W*0.50,H*0.54,pr*0.40);
    glow.addColorStop(0,'rgba(255,255,255,0.14)');
    glow.addColorStop(0.6,'rgba(255,255,255,0.05)');
    glow.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

    const mag=ctx.createRadialGradient(W*0.44,H*0.50,0,W*0.44,H*0.50,pr*0.50);
    mag.addColorStop(0,'rgba(168,85,247,0.06)'); mag.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle=mag; ctx.fillRect(0,0,W,H);

    const pink=ctx.createRadialGradient(W*0.60,H*0.60,0,W*0.60,H*0.60,pr*0.52);
    pink.addColorStop(0,'rgba(244,114,182,0.05)'); pink.addColorStop(1,'rgba(244,114,182,0)');
    ctx.fillStyle=pink; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
  }

  function paintAll(){
    const main=document.getElementById('cloudMain');
    const top =document.getElementById('cloudTop');
    if(main) renderCloud(main,{ seed: 8123, bankOpts:{ domes:4, spread:0.72, baseY:0.66 } });
    if(top ) renderCloud(top ,{ seed: 9057, bankOpts:{ domes:3, spread:0.62, baseY:0.62 } });
  }

  // Pintar en DOMContentLoaded (antes de la hidratación) para evitar "tiempo muerto"
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',paintAll,{once:true});
  }else{
    paintAll();
  }

  // Repaint en resize
  let to=null;
  window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(paintAll,120)},{passive:true});
})();
        `}</Script>

        {/* ===== Estrellas inmediatas (sin delay) ===== */}
        <Script id="tune-stars" strategy="beforeInteractive">{`
(function () {
  function ensureFeatured(N){
    const sky=document.getElementById('sky'); if(!sky) return;
    const holder=document.getElementById('stars')||sky;
    const curr=holder.querySelectorAll('.featured-star'); const need=N-curr.length; if(need<=0) return;
    for(let i=0;i<need;i++){
      const s=document.createElement('span'); s.className='featured-star';
      const dur=50+Math.random()*50, size=4+Math.random()*1.6;
      const top=Math.random()*100, left=Math.random()*100, delay=-Math.random()*dur;
      const tW=38+Math.random()*30, tH=6+Math.random()*6, tR=-22+Math.random()*44, tA=0.40+Math.random()*0.20;
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
      const size=1.2+Math.random()*1.5, alpha=0.32+Math.random()*0.25;
      const top=Math.random()*100, left=Math.random()*100;
      s.style.setProperty('--dsz',size.toFixed(2)+'px'); s.style.setProperty('--dalpha',alpha.toFixed(2));
      s.style.top=top.toFixed(2)+'vh'; s.style.left=left.toFixed(2)+'vw';
      holder.appendChild(s);
    }
  }
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

  function start(){
    ensureFeatured(10); ensureDistant(20); nukeForeign();
    const mo=new MutationObserver(nukeForeign);
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(nukeForeign,600); setTimeout(nukeForeign,2000);
    const shield=document.getElementById('arcana-star-shield'); if(shield){setTimeout(()=>{try{shield.remove()}catch(e){}},1000);}
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }
})();
        `}</Script>
      </body>
    </html>
  );
}
