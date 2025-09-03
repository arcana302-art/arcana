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
    const FEATURED = 10;    // estrellas brillantes (titilan despacio)
    const DISTANT  = 25;    // estrellas lejanas (SIN titilar, pequeñas, opacas)
    const twinkleMin = 80;  // s
    const twinkleMax = 120; // s
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // ----- Lejanas (detrás de nubes): más visibles pero sin glow -----
    for (let i = 0; i < DISTANT; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star-distant";
      const size = rand(1.6, 2.6);          // ↑ un poco para que sí se noten
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(3, 97)}vh`;     // evita bordes
      s.style.left = `${rand(3, 97)}vw`;
      s.style.opacity = `${rand(0.30, 0.55)}`; // opacas, sin glow
      far.appendChild(s);
    }

    // ----- Brillantes (encima de nubes): tamaño y glow reducidos -----
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(4, 6);              // más pequeñas que antes
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
/* Apaga starfields del template que puedan "ensuciar" el fondo */
#stars,#stars2,#stars3,
.stars,.stars2,.stars3,
[id*="stars"],[class*="stars"],
.starfield,.twinkle,.twinkling,
.bg-stars,.particles,.dots,
.background-stars,.layer-stars,canvas#stars{
  display:none!important;animation:none!important;transition:none!important;background:none!important;
}

/* Titileo MUY lento para destacadas */
@keyframes arcanaTwinkle {
  0%   { opacity: 0.92; transform: scale(1); }
  45%  { opacity: 0.56; transform: scale(0.94); }
  100% { opacity: 0.92; transform: scale(1); }
}

/* Estrellas brillantes (encima de nubes) — tamaño/glow reducidos */
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;will-change:opacity,transform;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 32%, rgba(255,255,255,0) 60%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.30) 0%, rgba(168,85,247,0) 68%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.16) 0%, rgba(244,114,182,0) 76%);
  /* glow suave (reducido) */
  filter:
    drop-shadow(0 0 4px rgba(255,255,255,.38))
    drop-shadow(0 0 8px rgba(168,85,247,.20))
    drop-shadow(0 0 10px rgba(244,114,182,.12));
  animation: arcanaTwinkle 100s linear infinite both;
}
.arcana-star::before{
  content:"";position:absolute;inset:-8px;border-radius:999px;filter:blur(8px);opacity:.4;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.24) 0%,
    rgba(168,85,247,.14) 46%,
    rgba(244,114,182,.08) 66%,
    rgba(255,255,255,0) 86%);
}

/* Estrellas lejanas — pequeñas, opacas, sin glow */
.arcana-star-distant{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.80) 0%, rgba(255,255,255,.40) 45%, rgba(255,255,255,0) 70%);
  filter:none; box-shadow:none; mix-blend-mode:normal;
}
      `}</style>
    </>
  );
}
