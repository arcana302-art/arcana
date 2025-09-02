// app/(site)/page.tsx
"use client";
import { useState } from "react";

/** Fondo con nubes/estrellas (SVG + blobs) */
function NebulaStars() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-black" />
      {/* Nubes (blobs) */}
      <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="absolute left-28 top-56 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      {/* Estrellas (SVG fijo para evitar “saltos” al hidratar) */}
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="g" r="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[
          [5,10,0.5],[15,18,0.35],[25,8,0.4],[40,12,0.45],[60,7,0.35],[80,15,0.4],[92,12,0.3],
          [10,30,0.35],[22,28,0.45],[35,26,0.35],[50,24,0.5],[70,28,0.35],[85,30,0.4],
          [8,45,0.35],[18,50,0.45],[33,46,0.35],[48,52,0.5],[65,48,0.4],[78,45,0.35],[90,50,0.3],
          [12,70,0.45],[28,72,0.35],[44,68,0.5],[58,74,0.35],[72,70,0.45],[86,72,0.35],
          [20,88,0.35],[38,90,0.4],[54,86,0.45],[68,92,0.35],[82,88,0.4],
        ].map(([x,y,r],i)=>(
          <circle key={i} cx={x} cy={y} r={r as number} fill="url(#g)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur={`${6 + (i%5)}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>
      {/* Grain sutil */}
      <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(1px_1px_at_10px_10px,white_1px,transparent_0)] [background-size:32px_32px]" />
    </div>
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
    desc: "Más de 200 lecturas | 4.9★",
  }));

  // Formularios demo (sin backend): muestran “enviado ✅”
  const [sentAgenda, setSentAgenda] = useState(false);
  const [sentUnete, setSentUnete] = useState(false);

  return (
    <>
      {/* HERO con nubes/estrellas */}
      <section className="relative">
        <NebulaStars />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Guía mística con <span className="rounded px-2 bg-white/10">especialistas verificados</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-200">
            Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="#agenda"
              className="rounded-xl bg-white px-4 py-2 font-medium text-zinc-900 hover:bg-zinc-100"
            >
              Agendar una consulta
            </a>
            <a
              href="#unete"
              className="rounded-xl border border-white/70 px-4 py-2 font-medium text-white hover:bg-white/10"
            >
              Únete como especialista
            </a>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
            {["Talentos verificados", "Pagos protegidos", "Videollamada integrada"].map((t) => (
              <div key={t} className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-100">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto -mt-8 max-w-6xl px-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <a
              key={c}
              href="#especialistas"
              className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              {c}
            </a>
          ))}
        </div>
      </section>

      {/* ¿CÓMO FUNCIONA? */}
      <section id="como-funciona" className="mx-auto mt-12 max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight">¿Cómo funciona?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Elige tu talento", d: "Explora categorías y perfiles verificados." },
            { t: "Agenda y paga", d: "Reservas seguras con confirmación inmediata." },
            { t: "Conéctate online", d: "Videollamada integrada, sin complicaciones." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-lg font-medium">{s.t}</p>
              <p className="mt-1 text-sm text-zinc-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ESPECIALISTAS */}
      <section id="especialistas" className="mx-auto mt-12 max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Especialistas disponibles</h2>
          <a href="#agenda" className="text-sm text-zinc-700 hover:underline">Ver agenda</a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {especialistas.map((e) => (
            <article key={e.nombre} className="group rounded-2xl border border-zinc-200 bg-white p-4 hover:shadow-md">
              <div className="h-40 w-full rounded-xl bg-zinc-100" />
              <div className="mt-3">
                <h3 className="font-medium">{e.nombre}</h3>
                <p className="text-sm text-zinc-600">{e.desc}</p>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-sm font-medium">desde $399</span>
                <a href="#agenda" className="text-sm text-zinc-700 hover:underline">
                  Agendar
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AGENDA (form demo) */}
      <section id="agenda" className="mx-auto mt-16 max-w-6xl px-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Agendar una consulta</h2>
          {sentAgenda ? (
            <p className="mt-2 text-sm text-emerald-700">Solicitud enviada ✅. Te contactamos por correo.</p>
          ) : (
            <form
              className="mt-4 grid gap-4 md:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); setSentAgenda(true); }}
            >
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Nombre</label>
                <input className="rounded border px-3 py-2" required />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Correo</label>
                <input type="email" className="rounded border px-3 py-2" required />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Categoría</label>
                <select className="rounded border px-3 py-2">
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Fecha deseada</label>
                <input type="date" className="rounded border px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <button className="rounded-xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
                  Enviar solicitud
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ÚNETE (form demo) */}
      <section id="unete" className="mx-auto mt-10 max-w-6xl px-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-semibold">Únete como especialista</h2>
          {sentUnete ? (
            <p className="mt-2 text-sm text-emerald-700">Aplicación enviada ✅. Te escribimos para el proceso.</p>
          ) : (
            <form
              className="mt-4 grid gap-4 md:grid-cols-2"
              onSubmit={(e) => { e.preventDefault(); setSentUnete(true); }}
            >
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Nombre artístico</label>
                <input className="rounded border px-3 py-2" required />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Correo</label>
                <input type="email" className="rounded border px-3 py-2" required />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Categorías</label>
                <input placeholder="Tarot, Astrología..." className="rounded border px-3 py-2" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-600">Precio desde ($)</label>
                <input type="number" className="rounded border px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <button className="rounded-xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">
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
