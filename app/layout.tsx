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
        <div id="sky" aria-hidden>
          <div id="stars"></div>
          {/* 1 sola nube */}
          <div className="cloud-track track-main">
            <div className="rise rise-main">
              <canvas id="cloudMain" className="cloud cloud-main" />
            </div>
          </div>
        </div>

        <div className="relative z-10">{children}</div>

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

/* Pista y movimiento */
.cloud-track{position:absolute;left:0;width:100%;will-change:transform;}
.track-main{top:36vh;animation:cloud-drift 320s linear infinite;animation-delay:-40s;}
@keyframes cloud-drift{0%{transform:translateX(110vw)}100%{transform:translateX(-100vw)}}
.rise-main{animation:cloud-rise 320s linear infinite;}
@keyframes cloud-rise{0%{transform:translateY(1vh)}100%{transform:translateY(-8vh)}}

/* ⬆️ Más grande: 30vw (tope 600px) */
.cloud{
  display:block;
  width:min(30vw, 600px);
  height:calc(min(30vw, 600px) * 0.36);
  aspect-ratio:16/5.8;
  background:transparent;
  filter: drop-shadow(0 8px 18px rgba(0,0,0,.06));
}
@media (max-width:768px){
  .track-main{top:42vh}
  .cloud{width:56vw;height:calc(56vw*0.36)}
}

/* Estrellas — como ya te gustan */
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

        {/* ===== NUBE: núcleo compacto + halo etéreo (2 capas) ===== */}
        <Script id="paint-clouds" strategy="afterInteractive">{`
(function(){
  function fade(t){return t*t*t*(t*(t*6-15)+10)}
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
  function clamp(x,a,b){return x<a?a:x>b?b:x}

  function paintCloud(canvas){
    const dpr=Math.max(1,Math.min(2,window.devicePixelRatio||1));
    const wCSS=canvas.offsetWidth||600, hCSS=canvas.offsetHeight||Math.round(wCSS*0.36);
    const W=Math.floor(wCSS*dpr), H=Math.floor(hCSS*dpr);
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext('2d'); if(!ctx) return;

    // ---------- Parámetros (más amorfa y densa) ----------
    const seed=4040;
    const baseS = Math.min(W,H)*0.0140;
    const detS  = baseS*3.2;
    const warpS = Math.min(W,H)*0.0060;
    const warpA = 3.2;

    const c1={x:W*0.50,y:H*0.52,a:W*0.28,b:H*0.20};
    const c2={x:W*0.61,y:H*0.56,a:W*0.23,b:H*0.18};
    const c3={x:W*0.39,y:H*0.58,a:W*0.22,b:H*0.17};
    const c4={x:W*0.48,y:H*0.64,a:W*0.20,b:H*0.16};
    const lobe=(cx,cy,a,b,x,y)=>{const dx=(x-cx)/a, dy=(y-cy)/b; return Math.max(0,1-(dx*dx+dy*dy))};
    const su=(e1,e2)=>1-(1-e1)*(1-e2);

    function fieldAt(x,y){
      const wx = fbm(x/warpS, y/warpS, seed+501);
      const wy = fbm((x+90)/warpS, (y-60)/warpS, seed+907);
      const sx = x/baseS + (wx-0.5)*warpA;
      const sy = y/baseS + (wy-0.5)*warpA;

      const n1 = fbm(sx*0.7, sy*0.7, seed+11);
      const n2 = fbm(x/detS, y/detS, seed+77);
      let n = n1*0.72 + n2*0.55;

      const e = su(su(lobe(c1.x,c1.y,c1.a,c1.b,x,y), lobe(c2.x,c2.y,c2.a,c2.b,x,y)),
                   su(lobe(c3.x,c3.y,c3.a,c3.b,x,y), lobe(c4.x,c4.y,c4.a,c4.b,x,y)));

      const edge = fbm(sx*0.20, sy*0.20, seed+7);
      n = n * Math.pow(e,0.62) * (0.78 + edge*0.32);
      return { n, e };
    }

    const img=ctx.createImageData(W,H); const d=img.data;

    // Núcleo (denso) + Halo (etéreo)
    const thCore=0.47, softCore=0.24, curveCore=0.95, densCore=0.66;
    const thMist=0.56, softMist=0.50, curveMist=1.05, densMist=0.26;

    for(let y=0,k=0;y<H;y++){
      for(let x=0;x<W;x++,k+=4){
        const f0=fieldAt(x,y);
        const fN=fieldAt(x,y-2), fS=fieldAt(x,y+2), fE=fieldAt(x+2,y), fW=fieldAt(x-2,y);
        const n = (f0.n*0.64) + ((fN.n+fS.n+fE.n+fW.n)*0.09);
        const e = (f0.e*0.64) + ((fN.e+fS.e+fE.e+fW.e)*0.09);

        let aCore = clamp((n - thCore) / softCore, 0, 1);
        aCore = Math.pow(aCore, curveCore) * densCore;

        let aMist = clamp((n - thMist) / (softMist + (1-e)*0.25), 0, 1);
        aMist = Math.pow(aMist, curveMist) * densMist;

        const alpha = clamp(aCore + aMist, 0, 1);
        if(alpha<=0){ d[k+3]=0; continue; }
        d[k]=255; d[k+1]=255; d[k+2]=255; d[k+3]=Math.floor(alpha*255);
      }
    }
    ctx.putImageData(img,0,0);

    // Tono sutil
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

        {/* Estrellas (sin cambios) */}
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
