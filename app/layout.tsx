// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Arcana",
  description: "Guía mística con especialistas verificados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)", color: "#e5e7eb" }}
      >
        {/* ===== FONDO (una nube orgánica) ===== */}
        <div id="bg-root" aria-hidden>
          <div id="cloud-drift">
            <div id="cloud-float">
              <div className="cloud">
                {/* “puffs” superpuestos para silueta de nube (algodón) */}
                <span className="puff p1" />
                <span className="puff p2" />
                <span className="puff p3" />
                <span className="puff p4" />
                <span className="puff p5" />
                <span className="puff p6" />
                <span className="puff p7" />
                <span className="puff p8" />
                <span className="puff p9" />
                <span className="puff p10" />
                <span className="puff p11" />
                <span className="puff p12" />
                <span className="puff p13" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10">{children}</div>

        {/* ===== CSS (solo transforms, sin filtros animados) ===== */}
        <style>{`
#bg-root{
  position: fixed; inset: 0; z-index:0; pointer-events:none; overflow:visible;
}

/* Trayectoria: R -> L continuo */
#cloud-drift{
  position:absolute; top: 28vh; left: 0; width:100%; height: 0;
  transform: translateX(110vw);
  animation: driftAcross 95s linear infinite;
}
/* Flotación leve vertical */
#cloud-float{
  position:absolute; left: 0; top: 0;
  animation: floatY 18s ease-in-out infinite alternate;
}

/* Contenedor de la nube (silueta orgánica) */
.cloud{
  position: relative;
  width: clamp(480px, 52vw, 980px);
  height: clamp(180px, 22vw, 360px);
  margin-left: -26vw; /* arranca fuera del lado derecho visualmente */
  filter: drop-shadow(0 20px 40px rgba(0,0,0

