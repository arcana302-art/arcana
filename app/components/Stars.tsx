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
    const FEATURED = 10;     // estrellas brillantes (con dim)
    const DISTANT  = 25;     // estrellas lejanas (fijas, pequeñas y opacas)
    const dimMin = 40;       // segundos  ← más rápido para que se note
    const dimMax = 70;       // segundos
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

    // ----- Brillantes (encima de nubes): dim lento hasta desaparecer -----
    for (let i = 0; i < FEATURED; i++) {
      const s = document.createElement("span");
      s.className = "arcana-star";
      const size = rand(3.2, 4.6); // un poco más pequeñas
      const dur = rand(dimMin, dimMax);
      const delay = -rand(0, dur);
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.top = `${rand(5, 95)}vh`;
      s.style.left = `${rand(5, 95)}vw`;
      // controla el dim perceptible
      s.style.animationDuration = `${dur}s`;
      s.style.animationDelay = `${delay}s`;
      s.style.animationTimingFunction = "ease-in-out";
      s.style.animationDirection = "alternate"; // va y regresa
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

/* DIM: desaparece a 0 y vuelve (para las 10 brillantes) */
@keyframes arcanaDim {
  0%   { opacity: 0.95; transform: scale(1);    }
  50%  { opacity: 0.00; transform: scale(0.90); }
  100% { opacity: 0.95; transform: scale(1);    }
}

/* Brillantes (encima de nubes) — tamaño y glow moderado */
.arcana-star{
  position:absolute;border-radius:999px;pointer-events:none;will-change:opacity,transform;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,.95) 32%, rgba(255,255,255,0) 60%),
    radial-gradient(circle at 50% 50%, rgba(168,85,247,.26) 0%, rgba(168,85,247,0) 68%),
    radial-gradient(circle at 50% 50%, rgba(244,114,182,.12) 0%, rgba(244,114,182,0) 76%);
  filter:
    drop-shadow(0 0 4px rgba(255,255,255,.30))
    drop-shadow(0 0 6px rgba(168,85,247,.16))
    drop-shadow(0 0 8px rgba(244,114,182,.10));
  animation-name: arcanaDim;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

/* Lejanas — pequeñas, opacas, SIN glow (detrás de nubes) */
.arcana-star-distant{
  position:absolute;border-radius:999px;pointer-events:none;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,255,255,.78) 0%, rgba(255,255,255,.40) 45%, rgba(255,255,255,0) 70%);
  filter:none; box-shadow:none; mix-blend-mode:normal;
}
      `}</style>
    </>
  );
}
