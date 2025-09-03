// app/components/Stars.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Stars() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current!;
    root.innerHTML = "";

    // Config
    const FEATURED = 10;   // estrellas brillantes (titilan)
    const DISTANT  = 20;   // estrellas lejanas (sin titilar)
    const twinkleMin = 80; // duración mínima del titileo (s)
    const twinkleMax = 120;// duración máxima del titileo (s)
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const holder = document.createElement("div");
    holder.style.position = "absolute";
    holder.style.inset = "0";
    holder.style.pointerEvents = "none";
    root.appendChild(holder);

    // Estrellas brillantes (titilan muy lento)
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(4, 6);
      const top = rand(0, 100);
      const left = rand(0, 100);
      const dur = rand(twinkleMin, twinkleMax);
      const delay = -rand(0, dur);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${top}vh`;
      s.style.left = `${left}vw`;
      s.style.animationDuration = `${dur}s`;
      s.style.animationDelay = `${delay}s`;
      holder.appendChild(s);
    }

    // Estrellas lejanas (sin titilar)
    for (let i = 0; i < DISTANT; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star-distant";
      const size = rand(1, 2.2);
      const top = rand(0, 100);
      const left = rand(0, 100);
      const alpha = rand(0.35, 0.58);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${top}vh`;
      s.style.left = `${left}vw`;
      s.style.opacity = `${alpha}`;
      holder.appendChild(s);
    }
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,          // detrás de las nubes
        pointerEvents: "none",
      }}
    >
      <style>{`
/* Desactiva starfields externos del template */
#stars2,#stars3,.stars2,.stars3,.starfield,.twinkle,.twinkling,.bg-stars,.particles,.dots{
  display:none!important;animation:none!important;transition:none!important;
}

/* Titileo muy lento y con glow sutil */
@keyframes arcanaTwinkle {
  0%   { opacity: 0.90; transform: scale(1); }
  45%  { opacity: 0.50; transform: scale(0.92); }
  100% { opacity: 0.90; transform: scale(1); }
}
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 34%, rgba(255,255,255,0) 62%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.45) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.28) 0%, rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 10px rgba(255,255,255,.55))
    drop-shadow(0 0 16px rgba(168,85,247,.30))
    drop-shadow(0 0 20px rgba(244,114,182,.18));
  animation: arcanaTwinkle 100s linear infinite both;
}
.arcana-star::before{
  content:"";position:absolute;inset:-12px;border-radius:999px;filter:blur(10px);opacity:.6;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.35) 0%,
    rgba(168,85,247,.22) 45%,
    rgba(244,114,182,.12) 65%,
    rgba(255,255,255,0) 85%);
}

/* Estrellas lejanas (no titilan) */
.arcana-star-distant{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.82) 0%, rgba(255,255,255,.55) 30%, rgba(255,255,255,0) 65%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.14) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.08) 0%, rgba(244,114,182,0) 80%);
  filter: drop-shadow(0 0 5px rgba(255,255,255,.28)) drop-shadow(0 0 7px rgba(168,85,247,.16));
}
      `}</style>
    </div>
  );
}
