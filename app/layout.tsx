// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";
import SceneOverlays from "./components/SceneOverlays";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Arcana",
  description: "Guía mística con especialistas verificados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Script: limpia amarillos y pinta morado en .btn-arcana.btn-arcana--primary
  const forcePurpleJS = `
  (function(){
    const SELECTOR = 'a.btn-arcana.btn-arcana--primary, button.btn-arcana.btn-arcana--primary';

    // Quita utilidades amarillas típicas del classList
    const yellowRe = /(bg|from|to|border|ring|text|hover:bg)-(amber|yellow)[^\\s]*/g;

    function wipeStyles(el){
      try{
        el.style.setProperty('background','transparent','important');
        el.style.setProperty('background-color','transparent','important');
        el.style.setProperty('backgroundImage','none','important');
        el.style.setProperty('background-image','none','important');
        el.style.setProperty('filter','none','important');
        el.style.setProperty('box-shadow','none','important');
        // quita utilidades amarillas en classList
        if(el.classList && el.className){
          el.className = el.className.replace(yellowRe,'').replace(/\\s{2,}/g,' ').trim();
        }
      }catch(e){}
    }

    function paintPurple(el){
      // limpia el propio botón
      wipeStyles(el);
      // limpia wrappers inmediatos (a veces el bg está en el contenedor)
      if(el.parentElement){ wipeStyles(el.parentElement); }
      if(el.parentElement && el.parentElement.parentElement){ wipeStyles(el.parentElement.parentElement); }
      // limpia TODOS los hijos (por si el gradiente está en un <span> overlay)
      el.querySelectorAll('*').forEach(wipeStyles);

      // aplica tema morado sólido (inline + !important)
      el.style.setProperty('background','linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)','important');
      el.style.setProperty('color','#ffffff','important');
      el.style.setProperty('border','0','important');
      el.style.setProperty('border-radius','12px','important');
      el.style.setProperty('font-weight','700','important');
      el.style.setProperty('padding','12px 20px','important');
      el.style.setProperty('text-decoration','none','important');
      el.style.setProperty('cursor','pointer','important');
      el.style.setProperty('box-shadow','0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28)','important');

      // hover manual (por si un CSS previo intenta sobreescribir)
      if(!el.__arcHover){
        el.addEventListener('mouseenter', ()=>{
          el.style.setProperty('background','linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%)','important');
          el.style.setProperty('transform','translateY(-1px)','important');
          el.style.setProperty('box-shadow','0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34)','important');
        });
        el.addEventListener('mouseleave', ()=>{
          el.style.setProperty('background','linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)','important');
          el.style.removeProperty('transform');
          el.style.setProperty('box-shadow','0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28)','important');
        });
        el.__arcHover = true;
      }
    }

    function run(){
      document.querySelectorAll(SELECTOR).forEach(paintPurple);
    }

    // Ejecuta ahora y cada vez que cambie el DOM (hidrata, carga, etc.)
    run();
    const mo = new MutationObserver(run);
    mo.observe(document.documentElement, { childList:true, subtree:true, attributes:true });
    window.addEventListener('load', run);
  })();
  `;

  return (
    <html lang="es" className="h-full">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen antialiased relative`}
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)" }}
      >
        {/* Fondo */}
        <Stars />
        <CloudBackdrop />
        <SceneOverlays />

        {/* Contenido */}
        <div className="relative z-10">{children}</div>

        {/* Refuerzos CSS (por si acaso) */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html { scroll-behavior: smooth; }

          /* Selector exacto que nos pasaste (CSS también lo pinta en morado) */
          a.btn-arcana.btn-arcana--primary,
          button.btn-arcana.btn-arcana--primary{
            background: linear-gradient(180deg,var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important; border:0 !important; border-radius:12px !important;
            font-weight:700 !important; padding:12px 20px !important;
            text-decoration:none !important;
          }
          a.btn-arcana.btn-arcana--primary:hover,
          button.btn-arcana.btn-arcana--primary:hover{
            background: linear-gradient(180deg,var(--violet-400) 0%, var(--violet-600) 100%) !important;
          }

          /* Si algún hijo/pseudo trae un overlay amarillo, lo neutralizamos */
          a.btn-arcana.btn-arcana--primary *, a.btn-arcana.btn-arcana--primary *::before, a.btn-arcana.btn-arcana--primary *::after,
          button.btn-arcana.btn-arcana--primary *, button.btn-arcana.btn-arcana--primary *::before, button.btn-arcana.btn-arcana--primary *::after{
            background: transparent !important;
            background-image: none !important;
            filter: none !important;
            box-shadow: none !important;
          }
        `}</style>

        {/* Script que limpia y pinta morado inline (máxima prioridad) */}
        <script dangerouslySetInnerHTML={{ __html: forcePurpleJS }} />
      </body>
    </html>
  );
}
