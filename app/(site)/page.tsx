// app/(site)/page.tsx
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

  return (
    <>
      <section className="bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Guía mística con <span className="bg-zinc-900 px-2 text-white">especialistas verificados</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
            </p>
            <div id="cta" className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#agenda"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
              >
                Agendar una consulta
              </a>
              <a
                href="#unete"
                className="rounded-xl border border-zinc-300 px-4 py-2 hover:bg-zinc-100"
              >
                Únete como especialista
              </a>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
              {["Talentos verificados", "Pagos protegidos", "Videollamada integrada"].map((t) => (
                <div key={t} className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <a key={c} href="#" className="rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-100">
              {c}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">
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

      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Especialistas disponibles</h2>
          <a href="#" className="text-sm text-zinc-700 hover:underline">Ver todos</a>
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
                <a href="#agenda" className="text-sm text-zinc-700 hover:underline">Agendar</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
