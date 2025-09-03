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
    const DISTANT  = 18;     // estrellas lejanas (sin titilar)
    const twinkleMin = 80;   // s
    const twinkleMax = 120;  // s
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Distant (detrás de las nubes)
    for (let i = 0; i < DISTANT; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star-distant";
      const size = rand(1, 2.2);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(0, 100)}vh`;
      s.style.left = `${rand(0, 100)}vw`;
      s.style.opacity = `${rand(0.35, 0.58)}`;
      far.appendChild(s);
    }

    // Featured (ENCIMA de las nubes)
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(6, 9); // más grandes para que destaquen
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
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Capa de estrellas brillantes (encima de nubes) */}
      <div
        ref={featuredRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <style>{`
/* Apaga starfields externos del template */
#stars2,#stars3,.stars2,.stars3,.starfield,.twinkle,.twinkling,.bg-stars,.particles,.dots{
  display:none!important;animation:none!important;transition:none!important;
}

/* Titileo MUY lento */
@keyframes arcanaTwinkle {
  0%   { opacity: 0.95; transform: scale(1); }
  45%  { opacity: 0.55; transform: scale(0.94); }
  100% { opacity: 0.95; transform: scale(1); }
}

/* Estrellas brillantes (encima de nubes) */
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.96) 34%, rgba(255,255,255,0) 64%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.50) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.32) 0%, rgba(244,114,182,0) 78%);
  filter:
    drop-shadow(0 0 12px rgba(255,255,255,.65))
    drop-shadow(0 0 18px rgba(168,85,247,.40))
    drop-shadow(0 0 26px rgba(244,114,182,.24));
  animation: arcanaTwinkle 100s linear infinite both;
}
.arcana-star::before{
  content:"";position:absolute;inset:-14px;border-radius:999px;filter:blur(12px);opacity:.7;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.40) 0%,
    rgba(168,85,247,.26) 46%,
    rgba(244,114,182,.16) 66%,
    rgba(255,255,255,0) 86%);
}

/* Estrellas lejanas (detrás de nubes, sin titilar) */
.arcana-star-distant{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.86) 0%, rgba(255,255,255,.58) 32%, rgba(255,255,255,0) 66%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.14) 0%, rgba(168,85,247,0) 70%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.08) 0%, rgba(244,114,182,0) 80%);
  filter: drop-shadow(0 0 6px rgba(255,255,255,.30)) drop-shadow(0 0 9px rgba(168,85,247,.18));
}
      `}</style>
    </>
  );
}
