// app/(site)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcana — Landing",
  description: "Consulta mística con especialistas verificados",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-900" />
            <span className="font-semibold tracking-tight">Arcana</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#">Talleres</a>
            <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#">Consulta Personal</a>
            <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#">Facilitadores</a>
          </nav>
          <a
            href="#cta"
            className="rounded-xl border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100"
          >
            Iniciar sesión
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-zinc-900" />
                <span className="font-semibold">Arcana</span>
              </div>
              <p>Guía mística con especialistas verificados.</p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="mb-2 font-medium text-zinc-900">Explora</p>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Tarot</a></li>
                  <li><a href="#" className="hover:underline">Astrología</a></li>
                  <li><a href="#" className="hover:underline">Numerología</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-medium text-zinc-900">Soporte</p>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:underline">Centro de ayuda</a></li>
                  <li><a href="#" className="hover:underline">Términos</a></li>
                  <li><a href="#" className="hover:underline">Privacidad</a></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-zinc-500">© {new Date().getFullYear()} Arcana.</p>
        </div>
      </footer>
    </>
  );
}
