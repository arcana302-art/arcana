// app/components/CtaAbsoluteOverride.tsx
"use client";

import { useEffect } from "react";

export default function CtaAbsoluteOverride() {
  useEffect(() => {
    const css = `
:root{
  --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
}

/* === Objetivo exacto: .btn-arcana.btn-arcana--primary en <a> y <button> === */
/* Extra-especificidad repetida para ganar a cualquier regla previa incluso con !important */
a.btn-arcana.btn-arcana.btn-arcana.btn-arcana--primary.btn-arcana--primary,
button.btn-arcana.btn-arcana.btn-arcana.btn-arcana--primary.btn-arcana--primary,
[data-arcana-cta="primary"]{
  background: linear-gradient(180deg, var(--violet-500) 0%, var(--violet-700) 100%) !important;
  color:#fff !important;
  border:0 !important;
  border-radius:12px !important;
  font-weight:700 !important;
  padding:12px 20px !important;
  text-decoration:none !important;
  box-shadow: 0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28) !important;
  position: relative;
  cursor: pointer;
}

/* Hover */
a.btn-arcana.btn-arcana.btn-arcana.btn-arcana--primary.btn-arcana--primary:hover,
button.btn-arcana.btn-arcana.btn-arcana.btn-arcana--primary.btn-arcana--primary:hover,
[data-arcana-cta="primary"]:hover{
  background: linear-gradient(180deg, var(--violet-400) 0%, var(--violet-600) 100%) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34) !important;
}

/* Neutraliza fondos/gradientes amarillos que vengan de pseudo-elementos o hijos */
a.btn-arcana.btn-arcana--primary::before,
a.btn-arcana.btn-arcana--primary::after,
button.btn-arcana.btn-arcana--primary::before,
button.btn-arcana.btn-arcana--primary::after,
a.btn-arcana.btn-arcana--primary *, a.btn-arcana.btn-arcana--primary *::before, a.btn-arcana.btn-arcana--primary *::after,
button.btn-arcana.btn-arcana--primary *, button.btn-arcana.btn-arcana--primary *::before, button.btn-arcana.btn-arcana--primary *::after,
[data-arcana-cta="primary"]::before, [data-arcana-cta="primary"]::after,
[data-arcana-cta="primary"] *, [data-arcana-cta="primary"] *::before, [data-arcana-cta="primary"] *::after{
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  filter: none !important;
}

/* Por si el contenedor envolvente pinta el fondo */
a.btn-arcana.btn-arcana--primary:where(:not(:has(*)))::before { content:''; }
`;

    let tag = document.getElementById("arcana-absolute-cta") as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = "arcana-absolute-cta";
      tag.type = "text/css";
      document.head.appendChild(tag);
    }
    tag.textContent = css;
    // Asegurar que quede al FINAL del <head> (último = gana la cascada)
    document.head.appendChild(tag);

    // Marca además por atributo (por si quisieras apuntar con [data-arcana-cta])
    const paintAttr = () => {
      document
        .querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
          'a.btn-arcana.btn-arcana--primary, button.btn-arcana.btn-arcana--primary'
        )
        .forEach((el) => el.setAttribute("data-arcana-cta", "primary"));
    };
    paintAttr();

    const mo = new MutationObserver(() => {
      // Si el head cambia, re-asegura que nuestro <style> queda de último
      const last = document.head.lastElementChild;
      if (last !== tag) {
        document.head.removeChild(tag);
        document.head.appendChild(tag);
      }
      paintAttr();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    window.addEventListener("load", paintAttr);
    return () => mo.disconnect();
  }, []);

  return null;
}
