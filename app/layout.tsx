// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Fondos ya existentes
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
  // Script ultra-forzado: repinta CTAs en morado con estilos inline !important
  const repaintJS = `
  (function(){
    const KEYS_PRIMARY = ["agendar","agendar una consulta","reserva","reserva ahora","consulta","agenda","reservar","book","booking"];
    const KEYS_SECONDARY = ["únete","unete","soy especialista","postular","aplicar","únete como especialista"];

    function looksPrimary(el){
      const t=(el.textContent||"").toLowerCase();
      const cls = (el.className||"").toString().toLowerCase();
      const keyMatch = KEYS_PRIMARY.some(k=>t.includes(k));
      const classAmber =
        /amber|yellow/.test(cls) ||
        /bg-\\[|from-\\[|to-\\[/.test(cls) ||        // tailwind arbitrario: bg-[#xxxxxx]
        /gradient/.test(cls) ||
        (el.getAttribute("href")||"").toLowerCase().includes("booking") ||
        (el.getAttribute("href")||"").toLowerCase().includes("agendar");
      return keyMatch || classAmber;
    }
    function looksSecondary(el){
      const t=(el.textContent||"").toLowerCase();
      return KEYS_SECONDARY.some(k=>t.includes(k));
    }

    function strip(el){
      try{
        el.style.removeProperty("background");
        el.style.removeProperty("background-color");
        el.style.removeProperty("border-color");
        el.style.removeProperty("color");
      }catch(e){}
    }
    function paintPrimary(el){
      strip(el);
      el.style.setProperty("background","linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)","important");
      el.style.setProperty("color","#fff","important");
      el.style.setProperty("border","0","important");
      el.style.setProperty("border-radius","12px","important");
      el.style.setProperty("font-weight","700","important");
      el.style.setProperty("padding","12px 20px","important");
      el.style.setProperty("box-shadow","0 8px 22px rgba(109,40,217,.35),0 2px 8px rgba(139,92,246,.28)","important");
      el.style.setProperty("text-decoration","none","important");
      el.style.setProperty("cursor","pointer","important");
      el.addEventListener("mouseenter",()=> {
        el.style.setProperty("background","linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%)","important");
        el.style.setProperty("transform","translateY(-1px)","important");
        el.style.setProperty("box-shadow","0 10px 26px rgba(109,40,217,.45),0 4px 12px rgba(139,92,246,.34)","important");
      });
      el.addEventListener("mouseleave",()=> {
        el.style.setProperty("background","linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)","important");
        el.style.removeProperty("transform");
        el.style.setProperty("box-shadow","0 8px 22px rgba(109,40,217,.35),0 2px 8px rgba(139,92,246,.28)","important");
      });
    }
    function paintSecondary(el){
      strip(el);
      el.style.setProperty("background","#2b2150","important");
      el.style.setProperty("color","#fff","important");
      el.style.setProperty("border","2px solid #7c3aed","important");
      el.style.setProperty("border-radius","12px","important");
      el.style.setProperty("font-weight","700","important");
      el.style.setProperty("padding","12px 20px","important");
      el.style.setProperty("box-shadow","0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05)","important");
      el.style.setProperty("text-decoration","none","important");
      el.style.setProperty("cursor","pointer","important");
      el.addEventListener("mouseenter",()=> {
        el.style.setProperty("background","#352462","important");
        el.style.setProperty("border-color","#a78bfa","important");
        el.style.setProperty("transform","translateY(-1px)","important");
      });
      el.addEventListener("mouseleave",()=> {
        el.style.setProperty("background","#2b2150","important");
        el.style.setProperty("border-color","#7c3aed","important");
        el.style.removeProperty("transform");
      });
    }
    function upgrade(root){
      const nodes = root.querySelectorAll('a,button,[role="button"]');
      nodes.forEach(el=>{
        if(looksPrimary(el)) paintPrimary(el);
        else if(looksSecondary(el)) paintSecondary(el);
      });
    }
    const run=()=>upgrade(document);
    run();
    const mo=new MutationObserver(()=>run());
    mo.observe(document.documentElement,{subtree:true,childList:true,attributes:true});
    window.addEventListener("load",run);
  })();`;

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

        {/* Overrides CSS por si vienen utilidades “amarillas” */}
        <style jsx global>{`
          :root{
            --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
          }
          html{ scroll-behavior:smooth; }

          /* Mata utilidades de color amarillo (incluye arbitrarios bg-[...]/from-[...]/to-[...] ) en elementos tipo botón */
          :where(button,
                 a[class*="rounded"],
                 a[class*="rounded-"],
                 a[class*="px-"][class*="py-"])
          :is([class*="bg-amber"],[class*="bg-yellow"],[class*="bg-["],
              [class*="from-amber"],[class*="from-yellow"],[class*="from-["],
              [class*="to-amber"],[class*="to-yellow"],[class*="to-["]){
            background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
            color:#fff !important; border-color:transparent !important;
          }
          :where(button,
                 a[class*="rounded"],
                 a[class*="rounded-"],
                 a[class*="px-"][class*="py-"]):hover
          :is([class*="hover:bg-amber"],[class*="hover:bg-yellow"]){
            background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
            color:#fff !important;
          }
        `}</style>

        {/* Script inline que repinta CTAs (sin archivos extra) */}
        <script dangerouslySetInnerHTML={{ __html: repaintJS }} />
      </body>
    </html>
  );
}
