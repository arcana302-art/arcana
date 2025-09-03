// app/components/CtaForce.tsx
"use client";

/**
 * Fuerza CTAs morados sin tocar componentes:
 * - Detecta a/button/role=button con textos clave (Agendar/Reserva/Consulta/Únete...)
 * - Marca data-arcana-cta="primary|secondary"
 * - Inyecta <style id="arcana-cta-force"> al FINAL de <head> con !important
 * - Remueve utilidades amarillas comunes (Tailwind, etc.)
 */

import { useEffect } from "react";

const YELLOW_CLASS_PATTERNS = [
  /^bg-(amber|yellow)/,
  /^from-(amber|yellow)/,
  /^to-(amber|yellow)/,
  /^hover:bg-(amber|yellow)/,
  /^border-(amber|yellow)/,
  /^ring-(amber|yellow)/,
  /^text-(amber|yellow)/,
  /btn-amber/, /btn-yellow/,
];

const PRIMARY_KEYS = [
  "agendar", "agendar una consulta", "reserva", "reserva ahora", "consulta", "agenda",
];
const SECONDARY_KEYS = [
  "únete", "unete", "soy especialista", "postular", "aplicar",
];

const looksPrimary = (t: string) => PRIMARY_KEYS.some(k => t.includes(k));
const looksSecondary = (t: string) => SECONDARY_KEYS.some(k => t.includes(k));

function ensureStyleTag() {
  const id = "arcana-cta-force";
  let tag = document.getElementById(id) as HTMLStyleElement | null;
  const css = `
:root{
  --violet-400:#a78bfa; --violet-500:#8b5cf6; --violet-600:#7c3aed; --violet-700:#6d28d9;
}
[data-arcana-cta="primary"]{
  background: linear-gradient(180deg,var(--violet-500) 0%,var(--violet-700) 100%) !important;
  color:#fff !important; border:0 !important;
  border-radius:12px !important; font-weight:700 !important;
  box-shadow:0 8px 22px rgba(109,40,217,.35),0 2px 8px rgba(139,92,246,.28) !important;
  padding:12px 20px !important;
}
[data-arcana-cta="primary"]:hover{
  background: linear-gradient(180deg,var(--violet-400) 0%,var(--violet-600) 100%) !important;
  transform: translateY(-1px) !important;
}
[data-arcana-cta="secondary"]{
  background:#2b2150 !important; color:#fff !important;
  border:2px solid var(--violet-600) !important; border-radius:12px !important;
  font-weight:700 !important; padding:12px 20px !important;
  box-shadow:0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05) !important;
}
[data-arcana-cta="secondary"]:hover{
  background:#352462 !important; border-color:var(--violet-400) !important;
  transform: translateY(-1px) !important;
}
/* Asegura cursor/estado */
[data-arcana-cta]{ cursor:pointer !important; text-decoration:none !important; }
  `.trim();

  if (!tag) {
    tag = document.createElement("style");
    tag.id = id;
    tag.type = "text/css";
    tag.appendChild(document.createTextNode(css));
    // Lo insertamos al FINAL del head para ganar la cascada
    document.head.appendChild(tag);
  } else {
    tag.textContent = css;
    // Muévelo al final si no lo está
    if (tag.parentElement === document.head && document.head.lastElementChild !== tag) {
      document.head.removeChild(tag);
      document.head.appendChild(tag);
    }
  }
}

function stripYellow(el: Element) {
  if (!("classList" in el)) return;
  const cl = (el as HTMLElement).classList;
  const toRemove: string[] = [];
  cl.forEach(c => { if (YELLOW_CLASS_PATTERNS.some(rx => rx.test(c))) toRemove.push(c); });
  toRemove.forEach(c => cl.remove(c));

  const style = (el as HTMLElement).style;
  if (style) {
    if (/amber|yellow|#ff?d|#ff?c|rgb\(.+\)/i.test(style.background) || /amber|yellow/i.test(style.backgroundColor)) {
      style.background = ""; style.backgroundColor = "";
    }
    style.filter = style.filter?.replace(/drop-shadow\([^\)]+\)/g, "") || style.filter;
  }
}

export default function CtaForce() {
  useEffect(() => {
    ensureStyleTag();

    const upgrade = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('a, button, [role="button"]'));
      for (const el of nodes) {
        const txt = (el.textContent || "").trim().toLowerCase();
        if (!txt) continue;

        const isPrimary = looksPrimary(txt) || el.matches('a[href*="/booking"], a[href*="agendar"], button[name*="agendar" i]');
        const isSecondary = looksSecondary(txt);

        if (!isPrimary && !isSecondary) continue;

        stripYellow(el);

        el.setAttribute("data-arcana-cta", isPrimary ? "primary" : "secondary");

        // normaliza padding mínimo por si el botón traía utilidades raras
        if (!el.style.padding) el.style.padding = "12px 20px";
      }
    };

    upgrade();
    const obs = new MutationObserver(() => { ensureStyleTag(); upgrade(); });
    obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    window.addEventListener("load", () => { ensureStyleTag(); upgrade(); });
    return () => obs.disconnect();
  }, []);

  return null;
}
