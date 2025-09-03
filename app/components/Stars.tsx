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
    const FEATURED = 10;    // estrellas brillantes (titilan)
    const DISTANT  = 25;    // estrellas lejanas (fijas, pequeñas y opacas)
    const twinkleMin = 110; // s  ← más lento
    const twinkleMax = 160; // s
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // ----- Lejanas (detrás de nubes) -----
    for (let i = 0; i < DISTANT; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star-distant";
      const size = rand(1.6, 2.6);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(3, 97)}vh`;
      s.style.left = `${rand(3, 97)}vw`;
      s.style.opacity = `${rand(0.30, 0.55)}`;
      far.appendChild(s);
    }

    // ----- Brillantes (encima de nubes) -----
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(3.5, 5.2); // ↓ un poco más pequeñas
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
/* Apaga starfields del template */
#stars,#stars2,#stars3,
.stars,.stars2,.stars3,
[id*="stars"],[class*="stars"],
.starfield,.twinkle,.twinkling,
.bg-stars,.particles,.dots,
.background-stars,.layer-stars,canvas#stars{
  display:none!important;animation:none!important;transition:none!important;background:none!important;
}

/* Dim MUY lento hasta desaparecer y reaparecer (solo brillantes) */
@keyframes arcanaDim {
  0%   { opacity: 0.95; transform: scale(1);    }
  50%  { opacity: 0.00; transform: scale(0.90); }
  100% { opacity: 0.95; transform: scale(1);    }
}

/* Estrellas brillantes (encima de nubes) — tamaño/glow moderados */
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;will-change:opacity,transform;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 32%, rgba(255,255,255,0) 60%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.28) 0%, rgba(168,85,247,0) 68%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.14) 0%, rgba(244,114,182,0) 76%);
  filter:
    drop-shadow(0 0 4px rgba(255,255,255,.35))
    drop-shadow(0 0 7px rgba(168,85,247,.18))
    drop-shadow(0 0 9px rgba(244,114,182,.10));
  animation: arcanaDim var(--dur,120s) linear infinite both;
}
.arcana-star::before{
  content:"";position:absolute;inset:-8px;border-radius:999px;filter:blur(8px);opacity:.38;
  background: radial-gradient(circle at 50% 50%,
    rgba(255,255,255,.22) 0%,
    rgba(168,85,247,.12) 46%,
    rgba(244,114,182,.06) 66%,
    rgba(255,255,255,0) 86%);
}

/* Estrellas lejanas — pequeñas, opacas, sin glow (detrás de nubes) */
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
