// app/(site)/page.tsx
"use client";
import { useState, type FormEvent } from "react";

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

  const onSubmitAgenda = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentAgenda(true);
  };
  const onSubmitUnete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSentUnete(true);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Lecturas en vivo con{" "}
            <span className="rounded bg-white/10 px-2 text-white">expertos certificados</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#agenda" className="rounded-xl bg-white px-4 py-2 font-medium text-zinc-900 hover:bg-zinc-100">
              Agendar una consulta
            </a>
            <a
              href="#unete"
              className="rounded-xl border border-white/30 px-4 py-2 font-medium text-white hover:bg-white/10"
            >
              Únete como especialista
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
            {["Talentos verificados","Pagos protegidos","Videollamada integrada"].map((t) => (
              <div key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-200">
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
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-zinc-200 hover:bg-white/10"
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
            <div key={s.t} className="glass rounded-2xl p-5">
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm">
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
          <a href="#agenda" className="text-sm text-zinc-300 hover:underline">Ver agenda</a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {especialistas.map((e) => (
            <article key={e.nombre} className="glass group rounded-2xl p-4 hover:bg-white/10">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-400/70 to-blue-400/70" />
                <div>
                  <h3 className="font-medium text-white">{e.nombre}</h3>
                  <p className="text-sm text-zinc-300">{e.desc}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-sm font-medium text-zinc-200">desde $399</span>
                <a href="#agenda" className="text-sm text-zinc-200 hover:underline">Agendar</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AGENDA (demo) */}
      <section id="agenda" className="mx-auto mt-16 max-w-6xl px-4">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-xl font-semibold text-white">Agendar una consulta</h2>
          {sentAgenda ? (
            <p className="mt-2 text-sm text-emerald-300">Solicitud enviada ✅. Te contactamos por correo.</p>
          ) : (
            <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={onSubmitAgenda}>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Nombre</label>
                <input
                  className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400"
                  placeholder="Tu nombre"
                  required
                  name="nombre"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Correo</label>
                <input
                  type="email"
                  className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  name="correo"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Categoría</label>
                <select className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="categoria">
                  {categorias.map(c => (
                    <option key={c} className="bg-[#0b0b12] text-white">{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Fecha deseada</label>
                <input type="date" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="fecha" />
              </div>
              <div className="md:col-span-2">
                <button className="rounded-xl bg-white px-4 py-2 font-medium text-zinc-900 hover:bg-zinc-100">
                  Enviar solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ÚNETE (demo) */}
      <section id="unete" className="mx-auto mt-10 max-w-6xl px-4">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display text-xl font-semibold text-white">Únete como especialista</h2>
          {sentUnete ? (
            <p className="mt-2 text-sm text-emerald-300">Aplicación enviada ✅. Te escribimos para el proceso.</p>
          ) : (
            <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={onSubmitUnete}>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Nombre artístico</label>
                <input
                  className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400"
                  placeholder="Ej. Luna Arcana"
                  required
                  name="nombreArtistico"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Correo</label>
                <input
                  type="email"
                  className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  name="correo"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Categorías</label>
                <input
                  placeholder="Tarot, Astrología..."
                  className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400"
                  name="categorias"
                />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Precio desde ($)</label>
                <input type="number" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="precio" />
              </div>
              <div className="md:col-span-2">
                <button className="rounded-xl bg-white px-4 py-2 font-medium text-zinc-900 hover:bg-zinc-100">
                  Enviar aplicación
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
