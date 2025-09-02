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
        {/* Estrellas (3 capas) */}
        <div className="star-layer layer-1" />
        <div className="star-layer layer-2" />
        <div className="star-layer layer-3" />
        {/* Nubes nebulosas (3 blobs) */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* CSS global de animación */}
      <style jsx global>{`
        /* ===== Estrellas: densas + brillo + twinkle ===== */
        .star-layer {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(1.8px 1.8px at 12px 12px, rgba(255,255,255,.95), transparent 60%),
            radial-gradient(1.4px 1.4px at 28px 40px, rgba(255,255,255,.85), transparent 60%),
            radial-gradient(1.2px 1.2px at 52px 18px, rgba(255,255,255,.80), transparent 60%),
            radial-gradient(1.6px 1.6px at 18px 64px, rgba(255,255,255,.95), transparent 60%);
          background-size: 48px 48px;
          opacity: .36;
          animation: stars-move 200s linear infinite, twinkle 5s ease-in-out infinite alternate;
        }
        .star-layer.layer-2 { background-size: 72px 72px; opacity: .28; animation-duration: 240s, 6s; }
        .star-layer.layer-3 { background-size: 96px 96px; opacity: .22; animation-duration: 280s, 6.5s; }
        @keyframes stars-move {
          0%   { background-position: 0 0, 0 0, 0 0, 0 0; }
          100% { background-position: 1600px 0, -1600px 0, 1200px 0, -1200px 0; }
        }
        @keyframes twinkle { 0% { filter: brightness(.9) } 100% { filter: brightness(1.25) } }

        /* ===== Nubes nebulosas (azul/dorado), más visibles ===== */
        .cloud {
          position: absolute;
          filter: blur(60px);
          opacity: .46;
          mix-blend-mode: screen;
          will-change: transform;
        }
        .cloud-1 {
          width: 52vw; height: 52vw; left: -12vw; top: -8vw;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,175,55,.22), transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(59,130,246,.22), transparent 60%);
          animation: drift1 60s ease-in-out infinite alternate;
        }
        .cloud-2 {
          width: 40vw; height: 40vw; right: -12vw; top: 8vw;
          background:
            radial-gradient(circle at 60% 40%, rgba(139,92,246,.20), transparent 60%),
            radial-gradient(circle at 40% 60%, rgba(212,175,55,.14), transparent 60%);
          animation: drift2 80s ease-in-out infinite alternate;
        }
        .cloud-3 {
          width: 58vw; height: 58vw; left: 18vw; bottom: -16vw;
          background:
            radial-gradient(circle at 50% 50%, rgba(59,130,246,.18), transparent 60%),
            radial-gradient(circle at 30% 70%, rgba(212,175,55,.14), transparent 60%);
          animation: drift3 90s ease-in-out infinite alternate;
        }
        @keyframes drift1 { from { transform: translateX(0) translateY(0); } to { transform: translateX(8vw)  translateY(2vw); } }
        @keyframes drift2 { from { transform: translateX(0) translateY(0); } to { transform: translateX(-6vw) translateY(-1vw); } }
        @keyframes drift3 { from { transform: translateX(0) translateY(0); } to { transform: translateX(5vw)  translateY(-3vw); } }

        /* Accesibilidad: si el usuario prefiere reducir movimiento, paramos animación */
        @media (prefers-reduced-motion: reduce) {
          .star-layer, .cloud { animation: none !important; opacity: .18; }
        }
      `}</style>
    </>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* FONDO ANIMADO DETRÁS DE TODO */}
      <AnimatedBackground />

      {/* Header glass */}
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
