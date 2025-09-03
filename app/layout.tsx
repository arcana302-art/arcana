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
      <head>{/* sin scripts de borrado */}</head>

      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}
      >
        {/* BACKDROP */}
        <div id="sky" aria-hidden>
          <div id="stars"></div>

          {/* Nube principal */}
          <div className="cloud-track track-main">
            <div className="rise rise-main">
              <canvas id="cloudMain" className="cloud cloud-main" />
            </div>
          </div>

          {/* Nube superior */}
          <div className="cloud-track track-top">
            <div className="rise rise-top">
              <canvas id="cloudTop" className="cloud cloud-top" />
            </div>
          </div>
        </div>

        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
#sky{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible;}

/* Pistas / movimiento suave */
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
.cloud{display:block;background:transparent;filter:drop-shadow(0 10px 18px rgba(0,0,0,.05));}
.cloud-main{width:min(60vw,1100px);height:calc(min(60vw,1100px)*0.42);aspect-ratio:16/6.7;opacity:.92;}
.cloud-top {width:min(25vw,520px); height:calc(min(25vw,520px)*0.42); aspect-ratio:16/6.7;opacity:.90;}

@media (max-width:768px){
  .track-main{top:54vh}
  .track-top{top:26vh}
  .cloud-main{width:90vw;height:calc(90vw*0.42)}
  .cloud-top{width:58vw;height:calc(58vw*0.42)}
}

/* Estrellas — titileo lento con glow sutil */
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

        {/* ===== NUBES (gradientes elípticos suaves, sin granulado) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // util
  const clamp=(x,a,b)=>x<a?a:(x>b?b:x);
  const fract=x=>x-Math.floor(x);
  const prng=(i,s)=>fract(Math.sin(i*133.3 + s*0.73)*43758.5453);

  // Construye base + domos (como cumulus)
  function buildBank(W,H,seed,opts){
    const o=Object.assign({
      baseY:0.66, baseA:0.55, baseB:0.26,
      domes:5, spread:0.72, yJitter:0.05,
      aMin:0.18,aMax:0.24, bMin:0.30,bMax:0.36
    },opts||{});
    const L=[];
    L.push({x:W*0.50,y:H*o.baseY,a:W*o.baseA,b:H*o.baseB, core:.55});
    const start=0.5-o.spread/2;
    for(let i=0;i<o.domes;i++){
      const u=i/(o.domes-1), px=start+u*o.spread;
      const a=W*(o.aMin+(o.aMax-o.aMin)*(0.45+0.55*prng(i+11,seed)));
      const b=H*(o.bMin+(o.bMax-o.bMin)*(0.45+0.55*prng(i+33,seed)));
      const y=H*(o.baseY-0.10-o.yJitter*(0.5-prng(i+77,seed)));
      const x=W*(0.12+px*0.76+(prng(i+55,seed)-0.5)*0.02);
      L.push({x,y,a,b, core:.75});
    }
    return L;
  }

  // Dibuja un gradiente radial ELÍPTICO (suave)
  function fillEllipseGradient(ctx, cx, cy, rx, ry, alpha=1){
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(rx, ry);
    const g=ctx.createRadialGradient(0,0,0, 0,0,1);
    g.addColorStop(0.00, \`rgba(255,255,255,\${0.90*alpha})\`);
    g.addColorStop(0.45, \`rgba(255,255,255,\${0.45*alpha})\`);
    g.addColorStop(1.00, \`rgba(255,255,255,0)\`);
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(0,0,1,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  // Renderiza una nube tipo banco: masa + halo + highlights
  function renderCloud(canvas, cfg){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||800, hCSS=canvas.offsetHeight||Math.round(wCSS*0.42);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    const seed=cfg.seed??7001;
    const lobes=buildBank(W,H,seed,cfg.bankOpts);

    ctx.clearRect(0,0,W,H);

    // Cuerpo principal (unión de domos)
    ctx.globalCompositeOperation='lighter';
    for(const l of lobes){
      // cuerpo
      fillEllipseGradient(ctx, l.x, l.y, l.a*0.98, l.b*0.98, 0.55);
      // pequeño detalle para evitar borde perfecto
      const dx=(prng(l.x+3,seed)-0.5)*l.a*0.12;
      const dy=(prng(l.y+9,seed)-0.5)*l.b*0.10;
      fillEllipseGradient(ctx, l.x+dx, l.y+dy, l.a*0.85, l.b*0.85, 0.35);
      // “domo” superior más luminoso
      fillEllipseGradient(ctx, l.x, l.y-l.b*0.18, l.a*0.75, l.b*0.70, 0.42);
    }

    // Halo etéreo (niebla) por detrás
    const snap=document.createElement('canvas'); snap.width=W; snap.height=H;
    const sctx=snap.getContext('2d');
    sctx.drawImage(canvas,0,0);
    ctx.save();
    ctx.globalCompositeOperation='destination-over';
    ctx.globalAlpha=0.50; ctx.filter='blur(10px)';
    ctx.drawImage(snap,-4,-4,W+8,H+8);
    ctx.restore(); ctx.filter='none';

    // Luz central sutil + tintes mágicos ligeros
    const pr=Math.min(W,H);
    const glow=ctx.createRadialGradient(W*0.50,H*0.54,0,W*0.50,H*0.54,pr*0.42);
    glow.addColorStop(0,'rgba(255,255,255,0.12)');
    glow.addColorStop(0.7,'rgba(255,255,255,0.04)');
    glow.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

    const mag=ctx.createRadialGradient(W*0.44,H*0.50,0,W*0.44,H*0.50,pr*0.55);
    mag.addColorStop(0,'rgba(168,85,247,0.05)'); mag.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle=mag; ctx.fillRect(0,0,W,H);
    const pink=ctx.createRadialGradient(W*0.60,H*0.60,0,W*0.60,H*0.60,pr*0.55);
    pink.addColorStop(0,'rgba(244,114,182,0.04)'); pink.addColorStop(1,'rgba(244,114,182,0)');
    ctx.fillStyle=pink; ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
  }

  function paintAll(){
    const main=document.getElementById('cloudMain');
    const top =document.getElementById('cloudTop');
    if(main) renderCloud(main,{ seed: 8123, bankOpts:{ domes:5, spread:0.72, baseY:0.66 }});
    if(top ) renderCloud(top ,{ seed: 9057, bankOpts:{ domes:4, spread:0.64, baseY:0.62 }});
  }

  // Pintar lo antes posible y recalcular cuando haya layout
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', paintAll, {once:true});
  }else{
    paintAll();
  }
  let to=null;
  window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(paintAll,120)},{passive:true});
})();
        `}</Script>

        {/* ===== ESTRELLAS (sin borrarlas nunca) ===== */}
        <Script id="stars" strategy="afterInteractive">{`
(function () {
  function addFeatured(N){
    const sky=document.getElementById('sky'); if(!sky) return;
    const holder=document.getElementById('stars')||sky;
    const curr=holder.querySelectorAll('.featured-star'); const need=N-curr.length; if(need<=0) return;
    for(let i=0;i<need;i++){
      const s=document.createElement('span'); s.className='featured-star';
      const dur=50+Math.random()*50, size=4+Math.random()*1.6;
      const top=Math.random()*100, left=Math.random()*100, delay=-Math.random()*dur;
      s.style.setProperty('--sz',size.toFixed(2)+'px');
      s.style.top=top.toFixed(2)+'vh'; s.style.left=left.toFixed(2)+'vw';
      s.style.setProperty('--ftDur',dur.toFixed(2)+'s'); s.style.setProperty('--twDelay',delay.toFixed(2)+'s');
      s.style.animationDelay=delay.toFixed(2)+'s';
      holder.appendChild(s);
    }
  }
  function addDistant(M){
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
  function start(){ addFeatured(10); addDistant(20); }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start,{once:true});}else{start();}
})();
        `}</Script>
      </body>
    </html>
  );
}
