// app/(site)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcana — Landing",
  description: "Consulta mística con especialistas verificados",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* === FONDO ANIMADO VISIBLE (z-0) === */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Estrellas */}
        <div className="stars-fine" />
        <div className="stars-med" />
        <div className="stars-big" />
        {/* Nubes/nebulosas */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* === CONTENIDO SOBRE EL FONDO (z-10) === */}
      <div className="relative z-10">
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

        {/* Contenido del segmento */}
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
      </div>

      {/* ======= OVERRIDES MORADOS SOLO PARA ESTE SEGMENTO ======= */}
      <style jsx global>{`
        /* Acento en morado para links/detalles (✶) */
        :root { --arcana-accent: #a78bfa; }

        /* Botón principal (clases exactas que usas) */
        a.btn-arcana.btn-arcana--primary,
        button.btn-arcana.btn-arcana--primary{
          background: linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%) !important;
          color:#fff !important;
          border:0 !important;
          border-radius:12px !important;
          font-weight:700 !important;
          padding:12px 20px !important;
          text-decoration:none !important;
          box-shadow:0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
        }
        a.btn-arcana.btn-arcana--primary:hover,
        button.btn-arcana.btn-arcana--primary:hover{
          background: linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%) !important;
          transform: translateY(-1px);
          box-shadow:0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
        }

        /* Botón secundario sólido (no translúcido) */
        a.btn-arcana.btn-arcana--secondary,
        button.btn-arcana.btn-arcana--secondary{
          background:#2b2150 !important; color:#fff !important; border:2px solid #7c3aed !important;
          border-radius:12px !important; font-weight:700 !important; padding:12px 20px !important;
          text-decoration:none !important;
          box-shadow: 0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
        }
        a.btn-arcana.btn-arcana--secondary:hover,
        button.btn-arcana.btn-arcana--secondary:hover{
          background:#352462 !important; border-color:#a78bfa !important; transform: translateY(-1px);
        }

        /* Neutraliza overlays internos (por si algún span/pseudo tenía amarillo) */
        a.btn-arcana.btn-arcana--primary *, a.btn-arcana.btn-arcana--primary *::before, a.btn-arcana.btn-arcana--primary *::after,
        button.btn-arcana.btn-arcana--primary *, button.btn-arcana.btn-arcana--primary *::before, button.btn-arcana.btn-arcana--primary *::after{
          background: transparent !important; background-image: none !important; box-shadow:none !important; filter:none !important;
        }
      `}</style>
    </>
  );
}
