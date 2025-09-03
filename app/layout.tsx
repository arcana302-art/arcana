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

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS ===== */}
        <style>{`
#sky{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:visible;}

/* Pistas / movimiento (más suave y con posiciones actualizadas) */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-main{ top:48vh; animation:cloud-drift-main 300s linear infinite; animation-delay:-40s; }
@keyframes cloud-drift-main{ 0%{transform:translateX(110vw)} 100%{transform:translateX(-100vw)} }
.track-top { top:14vh; animation:cloud-drift-top  280s linear infinite; animation-delay:-30s; }
@keyframes cloud-drift-top { 0%{transform:translateX(115vw)} 100%{transform:translateX(-105vw)} }

.rise-main{ animation:cloud-rise-main 300s linear infinite; }
@keyframes cloud-rise-main{ 0%{transform:translateY(0.2vh)} 100%{transform:translateY(-4vh)} }
.rise-top { animation:cloud-rise-top  280s linear infinite; }
@keyframes cloud-rise-top { 0%{transform:translateY(0.2vh)} 100%{transform:translateY(-3vh)} }

/* Tamaños y opacidades */
.cloud{ display:block; background:transparent; filter:drop-shadow(0 10px 18px rgba(0,0,0,.05)); }
.cloud-main{ width:min(60vw,1100px); height:calc(min(60vw,1100px)*0.38); aspect-ratio:16/6.1; opacity:.82; }
.cloud-top { width:min(25vw,520px);  height:calc(min(25vw,520px)*0.38);  aspect-ratio:16/6.1; opacity:.80; }

@media (max-width:768px){
  .track-main{ top:54vh }
  .track-top { top:22vh }
  .cloud-main{ width:90vw; height:calc(90vw*0.38) }
  .cloud-top { width:58vw; height:calc(58vw*0.38) }
}

/* Estrellas — titileo MUY lento con glow sutil (no se borran) */
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
#sky .featured-star::before{
  content:"";position:absolute;inset:-14px;border-radius:999px;filter:blur(12px);opacity:.6;
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

        {/* ===== NUBES (gradientes elípticos + puffs + halo + sombra) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  const clamp=(x,a,b)=>x<a?a:(x>b?b:x);
  const fract=x=>x-Math.floor(x);
  const prng=(i,s)=>fract(Math.sin(i*133.3 + s*0.73)*43758.5453);

  // Banco base + domos (más bajo y ancho, para evitar "plasta")
  function buildBank(W,H,seed,opts){
    const o=Object.assign({
      baseY:0.64, baseA:0.58, baseB:0.22,
      domes:6, spread:0.68, yJitter:0.06,
      aMin:0.17,aMax:0.23, bMin:0.28,bMax:0.34
    },opts||{});
    const L=[];
    L.push({x:W*0.50,y:H*o.baseY,a:W*o.baseA,b:H*o.baseB});
    const start=0.5-o.spread/2;
    for(let i=0;i<o.domes;i++){
      const u=i/(o.domes-1), px=start+u*o.spread;
      const a=W*(o.aMin+(o.aMax-o.aMin)*(0.45+0.55*prng(i+11,seed)));
      const b=H*(o.bMin+(o.bMax-o.bMin)*(0.45+0.55*prng(i+33,seed)));
      const y=H*(o.baseY-0.11-o.yJitter*(0.5-prng(i+77,seed)));
      const x=W*(0.12+px*0.76+(prng(i+55,seed)-0.5)*0.03);
      L.push({x,y,a,b});
    }
    return L;
  }

  // Gradiente radial ELÍPTICO suave (menos intensidad)
  function fillEllipseGradient(ctx, cx, cy, rx, ry, alpha=1){
    ctx.save(); ctx.translate(cx, cy); ctx.scale(rx, ry);
    const g=ctx.createRadialGradient(0,0,0, 0,0,1);
    g.addColorStop(0.00, \`rgba(255,255,255,\${0.75*alpha})\`);
    g.addColorStop(0.45, \`rgba(255,255,255,\${0.32*alpha})\`);
    g.addColorStop(1.00, \`rgba(255,255,255,0)\`);
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(0,0,1,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  // Puffs irregulares en la corona (dan "cabezas" de cúmulo)
  function addScallops(ctx, l, seed, count=7, alpha=0.26){
    for(let i=0;i<count;i++){
      const th=(-110 + 80*prng(i+19,seed)) * Math.PI/180;
      const r  = 0.42 + 0.25*prng(i+41,seed);
      const jx = (prng(i+73,seed)-0.5)*0.12;
      const jy = (prng(i+97,seed)-0.5)*0.10;
      const dx = Math.cos(th) * l.a * r * (0.55 + 0.25*prng(i+5,seed)) + l.a*jx;
      const dy = Math.sin(th) * l.b * r * (0.55 + 0.25*prng(i+7,seed)) + l.b*jy;
      const rx = l.a * (0.52 + 0.22*prng(i+13,seed));
      const ry = l.b * (0.52 + 0.22*prng(i+17,seed));
      fillEllipseGradient(ctx, l.x+dx, l.y+dy, rx, ry, alpha*(0.9+0.2*prng(i+23,seed)));
    }
  }

  // Sombra sutil en la base
  function baseShade(ctx, l, alpha=0.14){
    const grad=ctx.createLinearGradient(l.x, l.y, l.x, l.y + l.b*0.9);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, \`rgba(0,0,0,\${alpha})\`);
    ctx.save();
    ctx.globalCompositeOperation='multiply';
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.ellipse(l.x, l.y + l.b*0.24, l.a*0.96, l.b*0.82, 0, 0, Math.PI*2);
    ctx.fill(); ctx.restore();
  }

  function renderCloud(canvas, cfg){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||800, hCSS=canvas.offsetHeight||Math.round(wCSS*0.38);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    const seed=cfg.seed??8001;
    const lobes=buildBank(W,H,seed,cfg.bankOpts);
    ctx.clearRect(0,0,W,H);

    // Masa + puffs (menos opaca que antes)
    ctx.globalCompositeOperation='lighter';
    for(const l of lobes){
      fillEllipseGradient(ctx, l.x, l.y + l.b*0.05, l.a*1.02, l.b*0.88, 0.36); // base plana
      fillEllipseGradient(ctx, l.x, l.y,             l.a*0.98, l.b*0.95, 0.40); // cuerpo
      fillEllipseGradient(ctx, l.x, l.y - l.b*0.15,  l.a*0.78, l.b*0.70, 0.36); // domo
      addScallops(ctx, l, seed, 7, 0.26);
      baseShade(ctx, l, 0.14);
    }

    // Halo (más bajo) y tinte frío sutil
    const snap=document.createElement('canvas'); snap.width=W; snap.height=H;
    const sctx=snap.getContext('2d'); sctx.drawImage(canvas,0,0);
    ctx.save();
    ctx.globalCompositeOperation='destination-over';
    ctx.globalAlpha=0.18;       // antes más alto; ahora más discreto
    ctx.filter='blur(5px)';     // menos blur para no tapar UI
    ctx.drawImage(snap,-2,-2,W+4,H+4);
    ctx.restore(); ctx.filter='none';

    // Luz central muy sutil
    ctx.globalCompositeOperation='lighter';
    const pr=Math.min(W,H);
    const glow=ctx.createRadialGradient(W*0.50,H*0.52,0,W*0.50,H*0.52,pr*0.34);
    glow.addColorStop(0,'rgba(255,255,255,0.06)');
    glow.addColorStop(0.7,'rgba(255,255,255,0.02)');
    glow.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);

    // Tinte frío leve para evitar blanco puro
    ctx.globalCompositeOperation='multiply';
    ctx.fillStyle='rgba(224,236,255,0.06)';
    ctx.fillRect(0,0,W,H);
    ctx.globalCompositeOperation='source-over';
  }

  function paintAll(){
    const main=document.getElementById('cloudMain');
    const top =document.getElementById('cloudTop');
    if(main) renderCloud(main,{ seed: 8123, bankOpts:{ domes:6, spread:0.68, baseY:0.64 }});
    if(top ) renderCloud(top ,{ seed: 9057, bankOpts:{ domes:5, spread:0.60, baseY:0.58 }});
  }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', paintAll, {once:true}); }
  else { paintAll(); }

  let to=null;
  window.addEventListener('resize',()=>{ clearTimeout(to); to=setTimeout(paintAll,120); }, {passive:true});
})();
        `}</Script>

        {/* ===== ESTRELLAS (creación simple, sin borrar nada) ===== */}
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
