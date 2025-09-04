"use client";

/**
 * Fuerza CTAs morados sin tocar componentes:
 * - Detecta <a>/<button>/<div role="button"> con textos clave (Agendar, Reserva, Consulta, Únete…)
 * - Remueve clases amarillas comunes
 * - Aplica estilos inline con !important (setProperty) -> máxima prioridad
 * - Reaplica en mutaciones del DOM
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
  "reservar", "pedido", "book", "booking",
];
const SECONDARY_KEYS = [
  "únete", "unete", "soy especialista", "postular", "aplicar", "únete como especialista",
];

const looksPrimary = (t: string) => PRIMARY_KEYS.some(k => t.includes(k));
const looksSecondary = (t: string) => SECONDARY_KEYS.some(k => t.includes(k));

function stripYellow(el: HTMLElement) {
  if (el.classList?.length) {
    const toRemove: string[] = [];
    el.classList.forEach(c => {
      if (YELLOW_CLASS_PATTERNS.some(rx => rx.test(c))) toRemove.push(c);
    });
    toRemove.forEach(c => el.classList.remove(c));
  }
  // limpia styles inline amarillos
  el.style.removeProperty("background");
  el.style.removeProperty("background-color");
  el.style.removeProperty("border-color");
  el.style.removeProperty("color");
}

function applyPrimary(el: HTMLElement) {
  // Base morada
  el.style.setProperty("background", "linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)", "important");
  el.style.setProperty("color", "#ffffff", "important");
  el.style.setProperty("border", "0", "important");
  el.style.setProperty("border-radius", "12px", "important");
  el.style.setProperty("font-weight", "700", "important");
  el.style.setProperty("padding", "12px 20px", "important");
  el.style.setProperty("box-shadow", "0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28)", "important");
  el.style.setProperty("text-decoration", "none", "important");
  el.style.setProperty("cursor", "pointer", "important");

  // Hover manual
  el.addEventListener("mouseenter", () => {
    el.style.setProperty("background", "linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%)", "important");
    el.style.setProperty("transform", "translateY(-1px)", "important");
    el.style.setProperty("box-shadow", "0 10px 26px rgba(109,40,217,.45), 0 4px 12px rgba(139,92,246,.34)", "important");
  });
  el.addEventListener("mouseleave", () => {
    el.style.setProperty("background", "linear-gradient(180deg,#8b5cf6 0%,#6d28d9 100%)", "important");
    el.style.removeProperty("transform");
    el.style.setProperty("box-shadow", "0 8px 22px rgba(109,40,217,.35), 0 2px 8px rgba(139,92,246,.28)", "important");
  });
}

function applySecondary(el: HTMLElement) {
  el.style.setProperty("background", "#2b2150", "important");
  el.style.setProperty("color", "#ffffff", "important");
  el.style.setProperty("border", "2px solid #7c3aed", "important");
  el.style.setProperty("border-radius", "12px", "important");
  el.style.setProperty("font-weight", "700", "important");
  el.style.setProperty("padding", "12px 20px", "important");
  el.style.setProperty("box-shadow", "0 6px 18px rgba(139,92,246,.18), inset 0 -1px 0 rgba(255,255,255,.05)", "important");
  el.style.setProperty("text-decoration", "none", "important");
  el.style.setProperty("cursor", "pointer", "important");

  el.addEventListener("mouseenter", () => {
    el.style.setProperty("background", "#352462", "important");
    el.style.setProperty("border-color", "#a78bfa", "important");
    el.style.setProperty("transform", "translateY(-1px)", "important");
  });
  el.addEventListener("mouseleave", () => {
    el.style.setProperty("background", "#2b2150", "important");
    el.style.setProperty("border-color", "#7c3aed", "important");
    el.style.removeProperty("transform");
  });
}

function upgradeOnce(root: ParentNode = document) {
  const nodes = Array.from(
    root.querySelectorAll<HTMLElement>('a, button, [role="button"]')
  );

  for (const el of nodes) {
    const txt = (el.textContent || "").trim().toLowerCase();
    if (!txt) continue;

    const isPrimary = looksPrimary(txt) || el.matches('a[href*="/booking" i], a[href*="agendar" i], button[name*="agendar" i]');
    const isSecondary = looksSecondary(txt);

    if (!isPrimary && !isSecondary) continue;

    // limpiar clases amarillas y estilos previos
    stripYellow(el);

    // aplicar morados
    if (isPrimary) applyPrimary(el);
    else applySecondary(el);
  }
}

export default function CtaUltraForce() {
  useEffect(() => {
    // Ejecuta ahora y en cada cambio del DOM
    upgradeOnce(document);
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.addedNodes.length) upgradeOnce(m.target as ParentNode);
        if (m.type === "attributes") upgradeOnce(document);
      }
    });
    obs.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    // por si carga tardío de fuentes/JS
    window.addEventListener("load", () => upgradeOnce(document));
    return () => obs.disconnect();
  }, []);

  return null;
}
