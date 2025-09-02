// app/(site)/layout.tsx
"use client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcana — Landing",
  description: "Consulta mística con especialistas verificados",
};

function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* STARFIELD: 3 tamaños para que se noten */}
        <div className="stars-fine" />
        <div className="stars-med" />
        <div className="stars-big" />
        {/* NEBULOSAS */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        {/* GRAIN / VIÑETA */}
        <div className="vignette" />
        <div className="grain" />
      </div>

      <style jsx global>{`
        /* ====== ESTRELLAS GRANDES + BRILLO ====== */
        .stars-fine, .stars-med, .stars-big {
          position: absolute; inset: 0;
          animation: stars-move 200s linear infinite, twinkle 6s ease-in-out infinite alternate;
          will-change: background-position, filter, opacity;
        }
        /* capa fina (densidad base) */
        .stars-fine {
          opacity: .35;
          background-image:
            radial-gradient(1.6px 1.6px at 12px 12px, rgba(255,255,255,.95), transparent 60%),
            radial-gradient(1.3px 1.3px at 28px 40px, rgba(255,255,255,.85), transparent 60%),
            radial-gradient(1.1px 1.1px at 52px 18px, rgba(255,255,255,.80), transparent 60%),
            radial-gradient(1.4px 1.4px at 18px 64px, rgba(255,255,255,.95), transparent 60%);
          background-size: 54px 54px;
          filter: drop-shadow(0 0 2px rgba(255,255,255,.25));
        }
        /* capa media (puntos más grandes y espaciados) */
        .stars-med {
          opacity: .32;
          background-image:
            radial-gradient(2.2px 2.2px at 20px 22px, rgba(255,255,255,1), transparent 60%),
            radial-gradient(1.8px 1.8px at 46px 50px, rgba(255,255,255,.95), transparent 60%),
            radial-gradient(2.0px 2.0px at 70px 26px, rgba(255,255,255,.9), transparent 60%);
          background-size: 110px 110px;
          animation-duration: 240s, 6.5s;
          filter: drop-shadow(0 0 3px rgba(255,255,255,.35));
        }
        /* capa grande (ESTRELLAS VISIBLES) */
        .stars-big {
          opacity: .30;
          background-image:
            radial-gradient(3.4px 3.4px at 30px 30px, rgba(255,255,255,1), transparent 55%),
            radial-gradient(2.8px 2.8px at 88px 60px, rgba(255,255,255,.95), transparent 55%);
          background-size: 180px 180px; /* controla distancia entre estrellas grandes */
          animation-duration: 280s, 7s;
          filter:
            drop-shadow(0 0 4px rgba(255,255,255,.45))
            drop-shadow(0 0 10px rgba(212,175,55,.18)); /* halo dorado leve */
        }

        @keyframes stars-move {
          0%   { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 1400px 0, -1400px 0, 1000px 0, -1000px 0; }
        }
        @keyframes twinkle {
          0% { filter: brightness(.95) }
          100% { filter: brightness(1.25) }
        }

        /* ====== NEBULOSAS (más visibles) ====== */
        .cloud {
          position: absolute;
          filter: blur(80px);
          opacity: .55;
          mix-blend-mode: screen;
          will-change: transform;
        }
        .cloud-1 {
          width: 60vw; height: 60vw; left: -15vw; top: -10vw;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,175,55,.25), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59,130,246,.25), transparent 60%);
          animation: drift1 65s ease-in-out infinite alternate;
        }
        .cloud-2 {
          width: 44vw; height: 44vw; right: -14vw; top: 6vw;
          background:
            radial-gradient(circle at 60% 40%, rgba(139,92,246,.22), transparent 60%),
            radial-gradient(circle at 40% 60%, rgba(212,175,55,.16), transparent 60%);
          animation: drift2 85s ease-in-out infinite alternate;
        }
        .cloud-3 {
          width: 68vw; height: 68vw; left: 16vw; bottom: -18vw;
          background:
            radial-gradient(circle at 50% 50%, rgba(59,130,246,.22), transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(212,175,55,.16), transparent 60%);
          animation: drift3 95s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translateX(0) translateY(0); } to { transform: translateX(9vw)  translateY(2vw); } }
        @keyframes drift2 { from { transform: translateX(0) translateY(0); } to { transform: translateX(-7vw) translateY(-1vw); } }
        @keyframes drift3 { from { transform: translateX(0) translateY(0); } to { transform: translateX(6vw)  translateY(-3vw); } }

        /* ====== VIGNETTE + GRAIN (textura sutil) ====== */
        .vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(80% 80% at 50% 35%, rgba(0,0,0,0) 60%, rgba(0,0,0,.35) 100%);
        }
        .grain {
          position: absolute; inset: 0; opacity: .06; pointer-events: none;
          background:
            radial-gradient(1px 1px at 25% 50%, rgba(255,255,255,.9), transparent 30%) ,
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,.8), transparent 30%) ,
            radial-gradient(1px 1px at 75% 75%, rgba(255,255,255,.9), transparent 30%);
          background-size: 24px 24px, 36px 36px, 48px 48px;
          mix-blend-mode: overlay;
        }

        /* Accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .stars-fine, .stars-med, .stars-big, .cloud { animation: none !important; opacity: .22; }
        }
      `}</style>
    </>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Fondo animado visible detrás del contenido */}
      <AnimatedBackground />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2">
            <span className="font-display text-xl tracking-tight">
              Arcana<span className="text-[var(--arcana-accent)]">✶</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a className="text-sm text-zinc-200 hover:text-[var(--arcana-accent)]" href="#como-funciona">¿Cómo funciona?</a>
            <a className="text-sm text-zinc-200 hover:text-[var(--arcana-accent)]" href="#especialistas">Especialistas</a>
            <a className="text-sm text-zinc-200 hover:text-[var(--arcana-accent)]" href="#agenda">Agenda</a>
            <a className="text-sm text-zinc-200 hover:text-[var(--arcana-accent)]" href="#unete">Únete</a>
          </nav>
          <a href="#agenda" className="rounded-xl border border-white/25 px-3 py-1.5 text-sm text-white hover:bg-white/10">
            Iniciar sesión
          </a>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-300">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-display text-lg">Arcana<span className="text-[var(--arcana-accent)]">✶</span></span>
              </div>
              <p>Guía mística con especialistas verificados.</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="mb-2 font-medium text-white">Explora</p>
                <ul className="space-y-1">
                  <li><a href="#especialistas" className="hover:text-[var(--arcana-accent)]">Perfiles</a></li>
                  <li><a href="#como-funciona" className="hover:text-[var(--arcana-accent)]">Cómo funciona</a></li>
                  <li><a href="#agenda" className="hover:text-[var(--arcana-accent)]">Agendar</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium text-white">Soporte</p>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:text-[var(--arcana-accent)]">Centro de ayuda</a></li>
                  <li><a href="#" className="hover:text-[var(--arcana-accent)]">Términos</a></li>
                  <li><a href="#" className="hover:text-[var(--arcana-accent)]">Privacidad</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-400">© {new Date().getFullYear()} Arcana.</p>
        </div>
      </footer>
    </>
  );
}
