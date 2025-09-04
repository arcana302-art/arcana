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
  // --- Script: detecta CTAs (por texto y por clases .btn-arcana) y marca data-arcana-cta ---
  const repaintJS = `
  (function(){
    const KEYS_PRIMARY = ["agendar","agendar una consulta","consulta","reserva","reservar","reserva ahora","agenda","book","booking"];
    const KEYS_SECONDARY = ["únete","unete","únete como especialista","soy especialista","postular","aplicar"];

    const AMBER_RX = /\\b(amber|yellow)\\b/i;

    function isPrimary(el){
      const txt = (el.innerText||"").toLowerCase().trim();
      const cls = (el.className||"").toString().toLowerCase();
      const href = (el.getAttribute("href")||"").toLowerCase();
      return KEYS_PRIMARY.some(k=>txt.includes(k))
             || cls.includes("btn-arcana--primary")
             || href.includes("agendar") || href.includes("booking") || href === "#agenda";
    }
    function isSecondary(el){
      const txt = (el.innerText||"").toLowerCase().trim();
      const cls = (el.className||"").toString().toLowerCase();
      const href = (el.getAttribute("href")||"").toLowerCase();
      return KEYS_SECONDARY.some(k=>txt.includes(k)) || cls.includes("btn-arcana--secondary") || href.includes("unete");
    }

    function clean(el){
      try{
        // quita utilidades amarillas obvias del classList
        if (el.classList) {
          const toRemove = [];
          el.classList.forEach(c=>{
            if (/^(bg|from|to|border|ring|text|hover:bg)-(amber|yellow)/.test(c)) toRemove.push(c);
          });
          toRemove.forEach(c=>el.classList.remove(c));
        }
        // limpia estilos inline conflictivos
        el.style.removeProperty("background");
        el.style.removeProperty("background-color");
        el.style.removeProperty("border-color");
      }catch(e){}
    }

    function tagCta(el){
      if (isPrimary(el)) {
        el.setAttribute("data-arcana-cta","primary");
        clean(el);
      } else if (isSecondary(el)) {
        el.setAttribute("data-arcana-cta","secondary");
        clean(el);
      }
    }

    function run(root){
      const nodes = root.querySelectorAll('a,button,[role="button"],.btn-arcana');
      nodes.forEach(tagCta);
      // casos anidados: si el contenedor clickable tiene estilos, marca también el padre inmediato
      document.querySelectorAll('[data-arcana-cta]').forEach(n=>{
        const p=n.parentElement; if(p && !p.hasAttribute('data-arcana-cta') && (p.matches('a,button,[role="button"]')||p.className.toLowerCase().includes('btn-arcana'))) {
          p.setAttribute('data-arcana-cta', n.getAttribute('data-arcana-cta')!);
        }
      });
    }

    run(document);
    const mo = new MutationObserver(()=>run(document));
    mo.observe(document.documentElement,{childList:true,subtree:true,attributes:true});
    window.addEventListener('load', ()=>run(document));
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

        {/* Tema morado y overrides de CTAs */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html{ scroll-behavior:smooth; }

          /* Estilo directo para tu clase: .btn-arcana--primary */
          .btn-arcana.btn-arcana--primary{
            background: linear-gradient(180deg,var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important; border:0 !important; border-radius:12px !important;
            font-weight:700 !important; padding:12px 20px !important;
            box-shadow:0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
          }
          .btn-arcana.btn-arcana--primary:hover{
            background: linear-gradient(180deg,var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px);
            box-shadow:0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          /* Secundario opcional si usas .btn-arcana--secondary */
          .btn-arcana.btn-arcana--secondary{
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
            border-radius:12px !important; font-weight:700 !important; padding:12px 20px !important;
            box-shadow:0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
          }
          .btn-arcana.btn-arcana--secondary:hover{
            background:#352462 !important; border-color:var(--violet-400) !important; transform: translateY(-1px);
          }

          /* Forzado universal para elementos marcados por el script */
          [data-arcana-cta="primary"]{
            position:relative;
            background: linear-gradient(180deg,var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important; border:0 !important; border-radius:12px !important;
            font-weight:700 !important; padding:12px 20px !important;
            box-shadow:0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
            text-decoration:none !important;
          }
          [data-arcana-cta="primary"]:hover{
            background: linear-gradient(180deg,var(--violet-400) 0%, var(--violet-600) 100%) !important;
            transform: translateY(-1px);
            box-shadow:0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
          }

          [data-arcana-cta="secondary"]{
            background:#2b2150 !important; color:#fff !important; border:2px solid var(--violet-600) !important;
            border-radius:12px !important; font-weight:700 !important; padding:12px 20px !important;
            box-shadow:0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
            text-decoration:none !important;
          }
          [data-arcana-cta="secondary"]:hover{
            background:#352462 !important; border-color:var(--violet-400) !important; transform: translateY(-1px);
          }

          /* Neutraliza backgrounds amarillos pegados en wrappers/descendientes del CTA */
          [data-arcana-cta] *, 
          [data-arcana-cta]::before, [data-arcana-cta]::after,
          [data-arcana-cta] *::before, [data-arcana-cta] *::after {
            background-image: none !important;
          }
        `}</style>

        {/* Marca CTAs en tiempo real */}
        <script dangerouslySetInnerHTML={{ __html: repaintJS }} />
      </body>
    </html>
  );
}
