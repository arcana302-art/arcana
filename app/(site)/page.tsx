// app/(site)/page.tsx
"use client";
import { useEffect, useState, type FormEvent } from "react";

/* Fondo animado: estrellas parallax + nubes + cometas (CSS puro) */
function AnimatedBackground({ animOn }: { animOn: boolean }) {
  return (
    <>
      <div className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${animOn ? "" : "anim-off"}`}>
        {/* estrellas */}
        <div className="star-layer layer-1" />
        <div className="star-layer layer-2" />
        <div className="star-layer layer-3" />
        {/* nubes */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        {/* cometas */}
        <div className="comet c1" />
        <div className="comet c2" />
      </div>

      {/* CSS global de las animaciones */}
      <style jsx global>{`
        /* ===== Estrellas: 3 capas con distintas escalas y velocidad ===== */
        .star-layer {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1.6px 1.6px at 10px 10px, rgba(255,255,255,.95), transparent 60%),
            radial-gradient(1.4px 1.4px at 25px 35px, rgba(255,255,255,.85), transparent 60%),
            radial-gradient(1.2px 1.2px at 50px 15px, rgba(255,255,255,.8), transparent 60%),
            radial-gradient(1.6px 1.6px at 15px 60px, rgba(255,255,255,.95), transparent 60%);
          opacity: .28;
          animation: stars-move 160s linear infinite;
          background-size: 64px 64px;
        }
        .star-layer.layer-2 { opacity: .22; background-size: 96px 96px; animation-duration: 210s; }
        .star-layer.layer-3 { opacity: .18; background-size: 128px 128px; animation-duration: 260s; }
        @keyframes stars-move {
          0%   { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 1800px 0, -1800px 0, 1400px 0, -1400px 0; }
        }

        /* ===== Nubes nebulosas: blobs con blur y mezcla ===== */
        .cloud {
          position: absolute;
          filter: blur(40px);
          opacity: .38;
          mix-blend-mode: screen;
          will-change: transform;
        }
        .cloud-1 {
          width: 48vw; height: 48vw; left: -12vw; top: -8vw;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,175,55,.20), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59,130,246,.20), transparent 60%);
          animation: drift1 60s ease-in-out infinite alternate;
        }
        .cloud-2 {
          width: 36vw; height: 36vw; right: -12vw; top: 8vw;
          background:
            radial-gradient(circle at 60% 40%, rgba(139,92,246,.18), transparent 60%),
            radial-gradient(circle at 40% 60%, rgba(212,175,55,.12), transparent 60%);
          animation: drift2 80s ease-in-out infinite alternate;
        }
        .cloud-3 {
          width: 52vw; height: 52vw; left: 18vw; bottom: -16vw;
          background:
            radial-gradient(circle at 50% 50%, rgba(59,130,246,.16), transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(212,175,55,.13), transparent 60%);
          animation: drift3 90s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translateX(0) translateY(0); } to { transform: translateX(8vw)  translateY(2vw); } }
        @keyframes drift2 { from { transform: translateX(0) translateY(0); } to { transform: translateX(-6vw) translateY(-1vw); } }
        @keyframes drift3 { from { transform: translateX(0) translateY(0); } to { transform: translateX(5vw)  translateY(-3vw); } }

        /* ===== Cometas: líneas diagonales con resplandor ===== */
        .comet {
          position: absolute;
          width: 22vw; height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.85) 50%, rgba(255,255,255,0) 100%);
          box-shadow: 0 0 14px rgba(255,255,255,.55);
          opacity: .85;
          transform: rotate(35deg);
          will-change: transform;
          filter: drop-shadow(0 0 6px rgba(212,175,55,.55));
        }
        .comet.c1 {
          top: -10vh; left: -20vw;
          animation: shoot1 14s linear infinite;
        }
        .comet.c2 {
          top: -15vh; left: -30vw;
          animation: shoot2 19s linear infinite 3s;
        }
        @keyframes shoot1 { 0% { transform: translate(-10vw, -10vh) rotate(35deg); } 100% { transform: translate(120vw, 110vh) rotate(35deg); } }
        @keyframes shoot2 { 0% { transform: translate(-20vw, -15vh) rotate(35deg); } 100% { transform: translate(130vw, 120vh) rotate(35deg); } }

        /* ===== Modo sin animación (toggle o accesibilidad) ===== */
        .anim-off .star-layer, .anim-off .cloud, .anim-off .comet { animation: none !important; opacity: .18; }

        /* Respeta accesibilidad por defecto (si el usuario reduce movimiento, arrancamos en OFF) */
        @media (prefers-reduced-motion: reduce) {
          .star-layer, .cloud, .comet { animation: none !important; }
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
  const especialistas = Array.from({ length: 6 }).map((_, i) => ({ nombre: `Especialista #${i + 1}`, desc: "200+ lecturas • 4.9★" }));

  const [sentAgenda, setSentAgenda] = useState(false);
  const [sentUnete, setSentUnete] = useState(false);
  const [animOn, setAnimOn] = useState(true);

  // Si el sistema tiene "Reducir movimiento", arrancamos con animaciones apagadas
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) setAnimOn(false);
    }
  }, []);

  const onSubmitAgenda = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSentAgenda(true); };
  const onSubmitUnete  = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setSentUnete(true);  };

  return (
    <>
      {/* Fondo animado */}
      <AnimatedBackground animOn={animOn} />

      {/* pequeño switch flotante */}
      <button
        onClick={() => setAnimOn(v => !v)}
        className="fixed bottom-4 right-4 z-30 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur transition hover:bg-white/20"
        title="Alternar animación"
      >
        Animación: {animOn ? "ON" : "OFF"}
      </button>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Lecturas en vivo con <span className="rounded px-2 text-[var(--arcana-accent)]">expertos certificados</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">
            Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#agenda" className="btn-arcana btn-arcana--primary rounded-xl px-4 py-2 font-medium">Agendar una consulta</a>
            <a href="#unete" className="btn-arcana btn-arcana--outline rounded-xl px-4 py-2 font-medium text-white">Únete como especialista</a>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
            {["Talentos verificados","Pagos protegidos","Videollamada integrada"].map((t) => (
              <div key={t} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-zinc-200">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto -mt-10 max-w-6xl px-4">
        <div className="flex flex-wrap gap-2">
          {categorias.map((c) => (
            <a key={c} href="#especialistas" className="chip rounded-full px-3 py-1 text-sm text-zinc-200 transition-colors hover:border-[var(--arcana-accent)] hover:text-[var(--arcana-accent)]">
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
            <div key={s.t} className="glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(212,175,55,.15)]">
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--arcana-accent)] bg-white/5 text-sm text-[var(--arcana-accent)]">{s.n}</div>
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
          {Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="glass group rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(212,175,55,.12)]">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-yellow-300/70 to-fuchsia-400/70 ring-2 ring-yellow-300/30" />
                <div>
                  <h3 className="font-medium text-white">Especialista #{i + 1}</h3>
                  <p className="text-sm text-zinc-300">200+ lecturas • 4.9★</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-sm font-medium text-zinc-200">desde $399</span>
                <a href="#agenda" className="text-sm text-zinc-200 transition-colors hover:text-[var(--arcana-accent)]">Agendar</a>
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
            <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSentAgenda(true); }}>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Nombre</label>
                <input className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400" placeholder="Tu nombre" required name="nombre" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Correo</label>
                <input type="email" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400" placeholder="tucorreo@ejemplo.com" required name="correo" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Categoría</label>
                <select className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="categoria">
                  {categorias.map(c => (<option key={c} className="bg-[#0a1120] text-white">{c}</option>))}
                </select>
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Fecha deseada</label>
                <input type="date" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="fecha" />
              </div>
              <div className="md:col-span-2">
                <button className="btn-arcana btn-arcana--primary rounded-xl px-4 py-2 font-medium">Enviar solicitud</button>
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
            <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSentUnete(true); }}>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Nombre artístico</label>
                <input className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400" placeholder="Ej. Luna Arcana" required name="nombreArtistico" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Correo</label>
                <input type="email" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400" placeholder="tucorreo@ejemplo.com" required name="correo" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Categorías</label>
                <input placeholder="Tarot, Astrología..." className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-zinc-400" name="categorias" />
              </div>
              <div className="grid gap-1">
                <label className="text-sm text-zinc-300">Precio desde ($)</label>
                <input type="number" className="rounded border border-white/15 bg-white/5 px-3 py-2 text-white" name="precio" />
              </div>
              <div className="md:col-span-2">
                <button className="btn-arcana btn-arcana--outline rounded-xl px-4 py-2 font-medium text-white">Enviar aplicación</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
