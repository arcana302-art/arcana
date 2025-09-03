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
        {/* Bloqueo de starfields externos en el primer paint */}
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

          {/* UNA sola nube orgánica (sin bandas apiladas) */}
          <div className="cloud-track track-main">
            <div className="rise rise-main">
              <canvas id="cloudMain" className="cloud cloud-main" />
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

/* Una pista de nube, movimiento muy suave */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-main{top:38vh;animation:cloud-drift 320s linear infinite;animation-delay:-40s;}
@keyframes cloud-drift{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}

.rise-main{animation:cloud-rise 320s linear infinite;}
@keyframes cloud-rise{0%{transform:translateY(1vh)}100%{transform:translateY(-8vh)}}

/* Canvas único de nubes */
.cloud{
  display:block;
  width:min(86vw,1400px);
  height:calc(min(86vw,1400px)*0.36);
  aspect-ratio:16/5.8;
  background:transparent;
  filter: drop-shadow(0 8px 18px rgba(0,0,0,.06));
}

/* Estrellas (mantenemos las que ya gustaron) */
.featured-star{
  position:absolute;width:var(--sz,4.5px);height:var(--sz,4.5px);border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%,rgba(255,255,255,1) 0%,rgba(255,255,255,.95) 28%,rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%,rgba(168,85,247,.50) 0%,rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%,rgba(244,114,182,.38) 0%,rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,.65))
    drop-shadow(0 0 18px rgba(168,85,247,.40))
    drop-shadow(0 0 22px rgba(244,114,182,.26));
  animation:featuredTwinkle var(--ftDur,80s) cubic-bezier(.42,0,.58,1) infinite both;
  animation-delay:var(--twDelay,0s);
}
#sky .featured-star::before{content:"";position:absolute;inset:-14px;border-radius:999px;filter:blur(14px);opacity:.72;
  background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.45) 0%,rgba(168,85,247,.26) 45%,rgba(244,114,182,.18) 65%,rgba(255,255,255,0) 85%);
}
@keyframes featuredTwinkle{0%{opacity:0}30%{opacity:.18}55%{opacity:.95}75%{opacity:.90}100%{opacity:0}}
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
  .track-main{top:44vh}
  .cloud{width:96vw;height:calc(96vw*0.36)}
}
        `}</style>

        {/* ===== NUBE ORGÁNICA con ruido 2D (UNA sola, sin “filas”) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // --- Valor ruido 2D + fBm (semilla estable) ---
  function rng(seed){return function(){seed=(seed*1664525+1013904223)>>>0;return (seed&0xffffffff)/4294967296}}
  function hash(i,j,seed){
    // hash determinista basado en seno (rápido)
    const s = Math.sin(i*127.1 + j*311.7 + seed*0.123) * 43758.5453;
    return s - Math.floor(s);
  }
  function fade(t){return t*t*t*(t*(t*6-15)+10)}
  function valueNoise2(x,y,seed){
    const xi=Math.floor(x), yi=Math.floor(y);
    const xf=x-xi, yf=y-yi;
    const v00=hash(xi,yi,seed),   v10=hash(xi+1,yi,seed);
    const v01=hash(xi,yi+1,seed), v11=hash(xi+1,yi+1,seed);
    const u=fade(xf), v=fade(yf);
    const x1=v00+(v10-v00)*u, x2=v01+(v11-v01)*u;
    return x1+(x2-x1)*v; // 0..1
  }
  function fbm(x,y,seed){
    // 4 octavas de valor-ruido rotado
    let total=0, amp=0.5, freq=1.0;
    // rotación leve para evitar direcciones marcadas
    const rot=0.5, cs=Math.cos(rot), sn=Math.sin(rot);
    for(let o=0;o<4;o++){
      const rx = x*freq*cs - y*freq*sn;
      const ry = x*freq*sn + y*freq*cs;
      total += valueNoise2(rx,ry,seed+o*17) * amp;
      freq *= 2.0; amp *= 0.5;
    }
    return total; // ~0..1
  }

  function paintCloud(canvas){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||1200, hCSS=canvas.offsetHeight||Math.round(wCSS*0.36);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;
    const img=ctx.createImageData(W,H); const d=img.data;

    // Escalas y parámetros: ajustan densidad y “algodón”
    const seed=1234;
    const scaleBase = (Math.min(W,H) * 0.0105); // escala del ruido
    const scaleDetail = scaleBase*2.1;
    const th=0.58, soft=0.22; // umbral y suavidad (menos sólido)
    const curve = 1.10; // gamma para suavizar más

    // Máscara de forma general (no banda recta): elipse+ruido grande
    const cx=W*0.52, cy=H*0.48;
    const a=W*0.62, b=H*0.42; // elipse amplia

    for(let y=0, k=0; y<H; y++){
      for(let x=0; x<W; x++, k+=4){
        // Coordenadas normalizadas
        const nx = x/scaleBase, ny = y/scaleBase;
        const n1 = fbm(nx*0.6, ny*0.6, seed);        // estructura grande
        const n2 = fbm(x/scaleDetail, y/scaleDetail, seed+99); // detalle fino
        let n = (n1*0.7 + n2*0.6); // combinación

        // máscara elíptica suave + ruido grande para bordes irregulares
        const dx=(x-cx)/a, dy=(y-cy)/b;
        const ell = Math.max(0, 1 - (dx*dx + dy*dy));
        const edge = fbm(nx*0.18, ny*0.18, seed+7); // ondulación del borde
        n = n * Math.pow(ell, 0.65) * (0.75 + edge*0.35);

        // umbral suave
        let alpha = (n - th) / soft;
        alpha = Math.max(0, Math.min(1, alpha));
        alpha = Math.pow(alpha, curve) * 0.36; // densidad final (ligera)

        if(alpha<=0){ d[k+3]=0; continue; }

        // color base + leve tinte frío
        d[k  ] = 255;
        d[k+1] = 255;
        d[k+2] = 255;
        d[k+3] = Math.floor(alpha*255);
      }
    }
    ctx.putImageData(img,0,0);

    // Toques de color y brillo, recortados al alfa existente
    ctx.globalCompositeOperation='lighter';
    const pr=Math.min(W,H);
    const mag=ctx.createRadialGradient(W*0.35,H*0.45,0,W*0.35,H*0.45,pr*0.55);
    mag.addColorStop(0,'rgba(168,85,247,0.10)');
    mag.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle=mag; ctx.fillRect(0,0,W,H);

    const pink=ctx.createRadialGradient(W*0.65,H*0.60,0,W*0.65,H*0.60,pr*0.58);
    pink.addColorStop(0,'rgba(244,114,182,0.08)');
    pink.addColorStop(1,'rgba(244,114,182,0)');
    ctx.fillStyle=pink; ctx.fillRect(0,0,W,H);

    ctx.globalCompositeOperation='source-over';
  }

  function init(){
    const c=document.getElementById('cloudMain');
    if(c) paintCloud(c);
    const sky=document.getElementById('sky'); if(sky) sky.classList.add('ready');
    let to=null;
    window.addEventListener('resize',()=>{clearTimeout(to);to=setTimeout(()=>c&&paintCloud(c),120)},{passive:true});
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else{init();}
})();
        `}</Script>

        {/* ===== Estrellas (igual que tenías) ===== */}
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
