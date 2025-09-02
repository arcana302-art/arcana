// app/(site)/page.tsx
"use client";
import { useState, type FormEvent } from "react";

/* Fondo animado: estrellas parallax + nubes nebulosas (solo CSS) */
function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="star-layer layer-1" />
        <div className="star-layer layer-2" />
        <div className="star-layer layer-3" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* CSS global de las animaciones */}
      <style jsx global>{`
        /* Estrellas: 3 capas con distintas velocidades/escala */
        .star-layer {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1px 1px at 10px 10px, rgba(255,255,255,.9), transparent 60%),
            radial-gradient(1px 1px at 25px 35px, rgba(255,255,255,.8), transparent 60%),
            radial-gradient(1px 1px at 50px 15px, rgba(255,255,255,.75), transparent 60%),
            radial-gradient(1px 1px at 15px 60px, rgba(255,255,255,.9), transparent 60%);
          opacity: .22;
          animation: stars-move 180s linear infinite;
          background-size: 64px 64px;
        }
        .star-layer.layer-2 { opacity: .18; background-size: 96px 96px; animation-duration: 220s; }
        .star-layer.layer-3 { opacity: .14; background-size: 128px 128px; animation-duration: 260s; }
        @keyframes stars-move {
          0%   { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 2000px 0, -2000px 0, 1500px 0, -1500px 0; }
        }

        /* Nubes nebulosas dorado/azul (parallax lento) */
        .cloud {
          position: absolute;
          filter: blur(40px);
          opacity: .35;
          will-change: transform;
          mix-blend-mode: screen;
        }
        .cloud-1 {
          width: 45vw; height: 45vw; left: -10vw; top: -6vw;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,175,55,.18), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59,130,246,.18), transparent 60%);
          animation: drift1 60s ease-in-out infinite alternate;
        }
        .cloud-2 {
          width: 35vw; height: 35vw; right: -12vw; top: 10vw;
          background:
            radial-gradient(circle at 60% 40%, rgba(139,92,246,.16), transparent 60%),
            radial-gradient(circle at 40% 60%, rgba(212,175,55,.10), transparent 60%);
          animation: drift2 80s ease-in-out infinite alternate;
        }
        .cloud-3 {
          width: 50vw; height: 50vw; left: 20vw; bottom: -15vw;
          background:
            radial-gradient(circle at 50% 50%, rgba(59,130,246,.14), transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(212,175,55,.12), transparent 60%);
          animation: drift3 90s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translateX(0) translateY(0); } to { transform: translateX(8vw)  translateY(2vw); } }
        @keyframes drift2 { from { transform: translateX(0) translateY(0); } to { transform: translateX(-6vw) translateY(-1vw); } }
        @keyframes drift3 { from { transform: translateX(0) translateY(0); } to { transform: translateX(5vw)  translateY(-3vw); } }

        /* Respeto accesibilidad: si el usuario reduce movimiento, apagamos animaciones */
        @media (prefers-reduced-motion: reduce) {
          .star-layer, .cloud { animation: none !important; }
        }
      `}</style>
    </>
  );
}

export default function Page() {
  const categorias = [
    "Tarot","Astrología","Numerología","Sinastría","Runas",
    "Registros Akáshicos","Péndulo","Cartomancia","Videntes",
    "Quiromancia","Oráculos","Sueños","Piedras y Cristales",
  ];

  const especialistas = Array.from({ length: 6 }).map((_, i) => ({
    nombre: `Especialista #${i + 1}`,
    desc: "200+ lecturas • 4.9★",
  }));

  const [sentAgenda, setSentAgenda] = useState(false);
  const [sentUnete, setSentUnete] = useState(false);

  const onSubmitAgenda = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSentAgenda(true); };
  const onSubmitUnete  = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSentUnete(true);  };

  return (
    <>
      {/* Fondo animado fijo detrás de todo */}
      <AnimatedBackground />

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Lecturas en vivo con{" "}
            <span className="rounded px-2 text-accent">expertos certificados</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#agenda" className="btn-arcana btn-arcana--primary rounded-xl px-4 py-2 font-medium">
              Agendar una consulta
            </a>
            <a href="#unete" className="btn-arcana btn-arcana--outline rounded-xl px-4 py-2 font-medium text-white">
              Únete como especialista
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
            {["Talentos verificados","Pagos protegidos","Videollamada integrada"].map((t) => (
              <div key={t} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto -mt-10 max-w-6xl px-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <a
              key={c}
              href="#especialistas"
              className="chip rounded-full px-3 py-1 text-sm text-zinc-200 transition-colors hover:border-accent hover:text-accent"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* ¿CÓMO FUNCIONA? */}
      <section id="como-funciona" className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="font-display text-2xl font-semibold tracking-tight">¿Cómo funciona?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: "1", t: "Elige tu talento", d: "Explora categorías y perfiles verificados." },
            { n: "2", t: "Agenda y paga", d: "Reservas seguras con confirmación inmediata." },
            { n: "3", t: "Conéctate online", d: "Videollamada integrada, sin complicaciones." },
          ].map((s) => (
            <div
              key={s.t}
              className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,175,55,.15)]"
            >
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--arcana-accent)] bg-white/5 text-sm text-[var(--arcana-accent)]">
                {s.n}
              </div>
              <p className="text-lg font-medium text-white">{s.t}</p>
              <p className="mt-1 text-sm text-zinc-300">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ESPECIALISTAS */}
      <section id="especialistas" className="mx-auto mt-12 max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Especialistas disponibles</h2>
          <a href="#agenda" className="text-sm text-zinc-300 transition-colors hover:text-[var(--arcana-accent)]">Ver agenda</a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {especialistas.map((e) => (
            <article
              key={e.nombre}
              className
