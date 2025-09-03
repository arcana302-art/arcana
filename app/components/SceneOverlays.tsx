// app/components/SceneOverlays.tsx
"use client";

/**
 * Velos/scrims sutiles para mejorar contraste de texto
 * sin matar las nubes/estrellas. Capa fija, sin eventos.
 */
export default function SceneOverlays() {
  return (
    <>
      {/* Velo principal detrás del Héroe (arriba-centro) */}
      <div className="scrim scrim-hero" aria-hidden />

      {/* Velo suave a la altura de las pills/categorías */}
      <div className="scrim scrim-mid" aria-hidden />

      {/* Velo suave detrás de cards/secciones bajas */}
      <div className="scrim scrim-lower" aria-hidden />

      {/* Viñeta perimetral muy ligera para “cerrar” la escena */}
      <div className="vignette" aria-hidden />

      <style jsx>{`
        .scrim,
        .vignette {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1; /* entre nubes (1) y estrellas brillantes (2)? */
        }

        /* Ajustamos z-index para convivir con tu stack:
           - distant stars z=0
           - CLOUD canvas z=1
           - overlays z=1 (se mezclan con nubes)
           - featured stars z=2
           - UI z=10+
         */
        .scrim-hero {
          z-index: 1;
          background:
            radial-gradient(1200px 600px at 50% 140px,
              rgba(8,12,24,0.55) 0%,
              rgba(8,12,24,0.38) 40%,
              rgba(8,12,24,0.18) 70%,
              rgba(8,12,24,0) 100%);
        }

        .scrim-mid {
          z-index: 1;
          background:
            radial-gradient(900px 380px at 50% 340px,
              rgba(8,12,24,0.38) 0%,
              rgba(8,12,24,0.22) 50%,
              rgba(8,12,24,0) 100%);
        }

        .scrim-lower {
          z-index: 1;
          background:
            radial-gradient(1200px 520px at 50% 62vh,
              rgba(8,12,24,0.35) 0%,
              rgba(8,12,24,0.16) 60%,
              rgba(8,12,24,0) 100%);
        }

        .vignette {
          z-index: 1;
          background:
            radial-gradient(120% 120% at 50% -10%,
              rgba(10,17,32,0.25) 0%,
              rgba(10,17,32,0.18) 35%,
              rgba(10,17,32,0.10) 55%,
              rgba(10,17,32,0.00) 72%),
            radial-gradient(120% 120% at 50% 110%,
              rgba(10,17,32,0.22) 0%,
              rgba(10,17,32,0.12) 38%,
              rgba(10,17,32,0.00) 68%);
        }

        @media (max-width: 768px) {
          .scrim-hero {
            background:
              radial-gradient(900px 520px at 50% 120px,
                rgba(8,12,24,0.55) 0%,
                rgba(8,12,24,0.34) 45%,
                rgba(8,12,24,0.16) 72%,
                rgba(8,12,24,0) 100%);
          }
          .scrim-mid {
            background:
              radial-gradient(780px 360px at 50% 300px,
                rgba(8,12,24,0.32) 0%,
                rgba(8,12,24,0.18) 55%,
                rgba(8,12,24,0) 100%);
          }
          .scrim-lower {
            background:
              radial-gradient(920px 520px at 50% 58vh,
                rgba(8,12,24,0.32) 0%,
                rgba(8,12,24,0.14) 60%,
                rgba(8,12,24,0) 100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scrim-hero,
          .scrim-mid,
          .scrim-lower,
          .vignette { will-change: auto; }
        }
      `}</style>
    </>
  );
}
