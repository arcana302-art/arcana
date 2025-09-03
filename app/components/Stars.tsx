// app/components/Stars.tsx
"use client";

import { useEffect, useRef } from "react";

export default function Stars() {
  const farRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const far = farRef.current!;
    const feat = featuredRef.current!;
    far.innerHTML = "";
    feat.innerHTML = "";

    // ===== Config =====
    const FEATURED = 10;     // estrellas brillantes (titilan)
    const DISTANT  = 25;     // estrellas lejanas (sin titilar)  << aumentado
    const twinkleMin = 80;   // s
    const twinkleMax = 120;  // s
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Lejanas — pequeñas, opacas y SIN glow (detrás de las nubes)
    for (let i = 0; i < DISTANT; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star-distant";
      const size = rand(0.8, 1.6);    // más pequeñas
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(0, 100)}vh`;
      s.style.left = `${rand(0, 100)}vw`;
      s.style.opacity = `${rand(0.18, 0.32)}`; // más opacas
      far.appendChild(s);
    }

    // Brillantes — tamaño y glow REDUCIDOS (encima de las nubes)
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(4, 6); // antes 6–9
      const dur = rand(twinkleMin, twinkleMax);
      const delay = -rand(0, dur);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(5, 95)}vh`;
      s.style.left = `${rand(5, 95)}vw`;
      s.style.animationDuration = `${dur}s`;
      s.style.animationDelay = `${delay}s`;
      feat.appendChild(s);
    }
  }, []);

  return (
    <>
      {/* Capa de estrellas lejanas (detrás de nubes) */}
      <div
        ref={farRef}
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />
      {/* Capa de estrellas brillantes (encima de nubes) */}
      <div
        ref={featuredRef}
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}
      />

      <style>{`
/* Apaga cualquier starfield del template */
#stars,#stars2,#stars3,
.stars,.stars2,.stars3,
[id*="stars"],[class*="stars"],
.starfield,.twinkle,.twinkling,
.bg-stars,.particles,.dots,
.background-stars,.layer-stars,canvas#stars{
  display:none!important;animation:none!important;transition:none!important;background:none!important;
}

/* Titileo MUY lento */
@keyframes arcanaTwinkle {
  0%   { opacity: 0.92; transform: scale(1); }
  45%  { opacity: 0.56; transform: scale(0.94); }
  100% { opacity: 0.92; transform: scale(1); }
}

/* Estrellas brillantes (encima de nubes) — tamaño y glow reducidos */
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 32%, rgba(255,255,255,0) 60%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.35) 0%, rgba(168,85,247,0) 68%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.20) 0%, rgba(244,114,182,0) 76%);
  /* glow más bajo */
  filter:
    drop-shadow(0 0 6px rgba(255,255,255,.45))
    drop-shadow(0 0 10px rgba(168,85,247,.25))
    drop-shadow(0 0 14px rgba(244,114,182,.15));
  animation: arcanaTwinkle 100s linear infinite both;
}
.arcana-star::before{
  /* halo interno reducido */
  content:"";position:absolute;inset:-10px;border-radius:999px;filter:blur(10px);opacity:.5;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.30) 0%,
    rgba(168,85,247,.18) 46%,
    rgba(244,114,182,.10) 66%,
    rgba(255,255,255,0) 86%);
}

/* Estrellas lejanas — sin glow (solo un pequeño fade) */
.arcana-star-distant{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.75) 0%, rgba(255,255,255,.42) 40%, rgba(255,255,255,0) 65%);
  /* sin drop-shadow => sin glow */
}
      `}</style>
    </>
  );
}
