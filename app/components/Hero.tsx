"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-16 pb-12 md:pt-20 md:pb-16">
      {/* Texto */}
      <div className="relative z-10 grid gap-6 md:max-w-xl">
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-white">
          Lecturas en vivo con <span className="text-[#F3C969]">claridad real</span>
        </h1>
        <p className="text-lg text-zinc-300 max-w-prose">
          Agenda en minutos y conéctate por videollamada con expertos verificados.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#agenda" className="btn-arcana btn-arcana--primary rounded-xl px-4 py-2 font-medium">
            Agendar consulta
          </a>
          <a href="#especialistas" className="btn-arcana btn-arcana--outline rounded-xl px-4 py-2 font-medium text-white">
            Ver especialistas
          </a>
        </div>
      </div>

      {/* Ilustración derecha */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end pr-2 sm:pr-6 md:pr-0"
        style={{ zIndex: 9 }}
      >
        <div className="relative w-[42vw] max-w-[560px] min-w-[280px] opacity-95">
          <Image
            src="/illustrations/hero-right.svg"
            alt=""
            width={1120}
            height={1120}
            priority
            className="h-auto w-full select-none"
          />
        </div>
      </div>
    </section>
  );
}
