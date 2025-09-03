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

          {/* UNA sola nube—más pequeña, compacta y amorfa */}
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

/* Una pista, movimiento suave */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
/* Colócala un poco más alta para despegarla de cards */
.track-main{top:36vh;animation:cloud-drift 320s linear infinite;animation-delay:-40s;}
@keyframes cloud-drift{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}

.rise-main{animation:cloud-rise 320s linear infinite;}
@keyframes cloud-rise{0%{transform:translateY(1vh)}100%{transform:translateY(-8vh)}}

/* Canvas de la nube — TAMAÑO ~MITAD DEL ANTERIOR */
.cloud{
  display:block;
  width:min(45vw, 800px);             /* ↓ antes ~90vw → ahora ~45vw */
  height:calc(min(45vw, 800px)*0.36);
  aspect-ratio:16/5.8;
  background:transparent;
  filter: drop-shadow(0 8px 20px rgba(0,0,0,.06));
}

@media (max-width:768px){
  .track-main{top:42vh}
  .cloud{width:72vw;height:calc(72vw*0.36)}
}

/* Estrellas (como estaban) */
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

        {/* ===== NUBE ORGÁNICA — más densa, amorfa y etérea ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  // --------- Ruido 2D y fBm ----------
  function fade(t){return t*t*t*(t*(t*6-15)+10)}
  function hash(i,j,seed){const s=Math.sin(i*127.1 + j*311.7 + seed*0.123)*43758.5453;return s-Math.floor(s)}
  function value2(x,y,seed){
    const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi, u=fade(xf), v=fade(yf);
    const v00=hash(xi,yi,seed), v10=hash(xi+1,yi,seed), v01=hash(xi,yi+1,seed), v11=hash(xi+1,yi+1,seed);
    const x1=v00+(v10-v00)*u, x2=v01+(v11-v01)*u; return x1+(x2-x1)*v;
  }
  function fbm(x,y,seed){
    let t=0, amp=0.55, freq=1.0; const rot=0.42, cs=Math.cos(rot), sn=Math.sin(rot);
    for(let o=0;o<5;o++){
      const rx=x*freq*cs - y*freq*sn, ry=x*freq*sn + y*freq*cs;
      t += value2(rx,ry,seed+o*19)*amp; freq*=2.0; amp*=0.5;
    }
    return t;
  }

  function paintCloud(canvas){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||800, hCSS=canvas.offsetHeight||Math.round(wCSS*0.36);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    // ---------- Parámetros de diseño ----------
    const seed=2025;
    const baseS = Math.min(W,H)*0.0135;     // ↑ tamaño de features → menos "granito"
    const detS  = baseS*3.0;                // detalle más suave
    const warpS = Math.min(W,H)*0.0060;     // domain warp (baja freq)
    const warpA = 2.8;                      // ↑ amorfo sin romper bordes
    const th=0.49;      // ↓ umbral → más densa
    const soft=0.30;    // ↑ suavidad de borde → etérea
    const curve=0.95;   // gamma (> densidad media)
    const dens=0.56;    // multiplicador final de alfa (más compacta)

    // Lóbulos (forma orgánica no cuadrada)
    const c1={x:W*0.50,y:H*0.52,a:W*0.42,b:H*0.30};
    const c2={x:W*0.62,y:H*0.58,a:W*0.36,b:H*0.28};
    const c3={x:W*0.38,y:H*0.60,a:W*0.34,b:H*0.26};
    const c4={x:W*0.47,y:H*0.64,a:W*0.30,b:H*0.24}; // lóbulo extra pequeño para evitar “rectángulo”
    const smoothUnion=(e1,e2)=>1-(1-e1)*(1-e2);
    const lobe=(cx,cy,a,b,x,y)=>{const dx=(x-cx)/a, dy=(y-cy)/b; return Math.max(0,1-(dx*dx+dy*dy))};

    // Campo de densidad encapsulado (nos permite suavizado local)
    function fieldAt(x,y){
      const wx = fbm(x/warpS, y/warpS, seed+501);
      const wy = fbm((x+90)/warpS, (y-60)/warpS, seed+907);
      const sx = x/baseS + (wx-0.5)*warpA;
      const sy = y/baseS + (wy-0.5)*warpA;
      const n1 = fbm(sx*0.7, sy*0.7, seed+11);
      const n2 = fbm(x/detS, y/detS, seed+77);
      let n = n1*0.72 + n2*0.55;

      // unión suave de 4 lóbulos
      const e = smoothUnion(
                  smoothUnion(lobe(c1.x,c1.y,c1.a,c1.b,x,y), lobe(c2.x,c2.y,c2.a,c2.b,x,y)),
                  smoothUnion(lobe(c3.x,c3.y,c3.a,c3.b,x,y), lobe(c4.x,c4.y,c4.a,c4.b,x,y))
                );

      // ondulación de borde grande
      const edge = fbm(sx*0.20, sy*0.20, seed+7);
      n = n * Math.pow(e,0.62) * (0.78 + edge*0.32);
      return n;
    }

    // Pintado con suavizado local (reduce “grano” y da look crema)
    const img=ctx.createImageData(W,H); const d=img.data;
    for(let y=0,k=0;y<H;y++){
      for(let x=0;x<W;x++,k+=4){
        // mezcla con vecinos cercanos para evitar pixelado/arena
        const n0 = fieldAt(x,y);
        const nN = fieldAt(x, y-2);
        const nS = fieldAt(x, y+2);
        const nE = fieldAt(x+2, y);
        const nW = fieldAt(x-2, y);
        let n = (n0*0.64) + ((nN+nS+nE+nW)*0.09); // 0.64 + 4*0.09 = 1.0

        let a = (n - th) / soft;
        a = Math.max(0, Math.min(1, a));
        a = Math.pow(a, curve) * dens;

        if(a<=0){ d[k+3]=0; continue; }
        d[k  ] = 255; d[k+1] = 255; d[k+2] = 255; d[k+3] = Math.floor(a*255);
      }
    }
    ctx.putImageData(img,0,0);

    // Luz/tono muy sutil (solo para “vida”)
    ctx.globalCompositeOperation='lighter';
    const pr=Math.min(W,H);
    const mag=ctx.createRadialGradient(W*0.40,H*0.50,0,W*0.40,H*0.50,pr*0.55);
    mag.addColorStop(0,'rgba(168,85,247,0.10)'); mag.addColorStop(1,'rgba(168,85,247,0)');
    ctx.fillStyle=mag; ctx.fillRect(0,0,W,H);
    const pink=ctx.createRadialGradient(W*0.58,H*0.60,0,W*0.58,H*0.60,pr*0.58);
    pink.addColorStop(0,'rgba(244,114,182,0.08)'); pink.addColorStop(1,'rgba(244,114,182,0)');
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

        {/* ===== Estrellas (igual) ===== */}
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
