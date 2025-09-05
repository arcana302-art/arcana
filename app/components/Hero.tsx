"use client";
import React from "react";

/**
 * Hero con copy ES/EN (Opción 2) + ilustración minimal (luna + ojo).
 * No toca nubes/estrellas porque está en z-10 y es contenido normal.
 *
 * Paleta:
 *  - Morado primario  #7C3AED
 *  - Morado oscuro    #3B2770
 *  - Dorado suave     #F3C969
 *  - Marfil           #F6F3FF
 */

type Lang = "es" | "en";

const COPY: Record<Lang, { h1a: string; h1b: string; sub: string; cta1: string; cta2: string }> = {
  es: {
    h1a: "Encuentra señales,",
    h1b: "no suposiciones",
    sub: "Tarot, astrología y más, en un entorno cuidado y confidencial.",
    cta1: "Empezar ahora",
    cta2: "Cómo funciona",
  },
  en: {
    h1a: "Find signs,",
    h1b: "not assumptions",
    sub: "Tarot, astrology and more, in a caring and confidential space.",
    cta1: "Start now",
    cta2: "How it works",
  },
};

export default function Hero({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];

  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-20 md:pb-14">
      {/* Texto izquierda */}
      <div className="relative z-10 grid gap-6 md:max-w-xl">
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-white">
          {t.h1a}{" "}
          <span className="text-[#F3C969]">{t.h1b}</span>
        </h1>
        <p className="text-lg text-zinc-300 max-w-prose">
          {t.sub}
        </p>

        <div className="flex flex-wrap gap-3">
          <a href="#agenda" className="btn-arcana btn-arcana--primary rounded-xl px-4 py-2 font-medium">
            {t.cta1}
          </a>
          <a href="#como-funciona" className="btn-arcana btn-arcana--outline rounded-xl px-4 py-2 font-medium text-white">
            {t.cta2}
          </a>
        </div>
      </div>

      {/* Ilustración derecha (inline SVG, fondo transparente) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end pr-2 sm:pr-6 md:pr-0"
        style={{ zIndex: 9 }}
      >
        <div className="relative w-[42vw] max-w-[560px] min-w-[260px] opacity-95">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}

/** Ilustración minimal: luna creciente + ojo místico (SVG, sin fondo). */
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 900 900"
      className="h-auto w-full select-none"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
          <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* halo suave para integrar con el fondo (sin taparlo) */}
      <circle cx="520" cy="360" r="360" fill="url(#glow)" />

      {/* luna creciente */}
      <g transform="translate(300,170)">
        <path
          d="
            M 310 280
            A 210 210 0 1 1 312 280
            M 420 280
            A 120 120 0 1 0 422 280
          "
          fill="#F6F3FF"
          fillRule="evenodd"
          opacity="0.9"
        />
        {/* borde luna */}
        <path
          d="
            M 310 280
            A 210 210 0 1 1 312 280
          "
          fill="none"
          stroke="#3B2770"
          strokeWidth="4"
          opacity="0.9"
        />
      </g>

      {/* ojo místico al centro */}
      <g transform="translate(230,295)">
        {/* semicírculo dorado */}
        <path
          d="M220 205c0-90 73-163 163-163s163 73 163 163H220z"
          fill="#F3C969"
        />
        {/* iris */}
        <circle cx="383" cy="205" r="58" fill="#7C3AED" />
        <circle cx="383" cy="205" r="16" fill="#F6F3FF" />
        {/* pestañas */}
        {Array.from({ length: 12 }).map((_, i) => {
          const ang = (i * Math.PI) / 6;
          const x1 = 383 + Math.cos(ang) * 110;
          const y1 = 205 + Math.sin(ang) * 110;
          const x2 = 383 + Math.cos(ang) * 140;
          const y2 = 205 + Math.sin(ang) * 140;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F3C969"
              strokeWidth="6"
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 1 : 0.8}
            />
          );
        })}
        {/* línea del párpado */}
        <path
          d="M240 205c60-46 122-69 186-69s126 23 186 69"
          fill="none"
          stroke="#3B2770"
          strokeWidth="5"
          opacity="0.75"
        />
      </g>

      {/* chispas decorativas */}
      {[
        [120, 160], [820, 130], [760, 520], [680, 740],
        [540, 120], [200, 590], [130, 420]
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.9">
          <circle cx="0" cy="0" r="2.5" fill="#F3C969" />
          <path d="M0 -18 L2 -6 L18 0 L2 6 L0 18 L-2 6 L-18 0 L-2 -6 Z" fill="#F3C969" />
        </g>
      ))}
    </svg>
  );
}
