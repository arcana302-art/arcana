"use client";

import { useEffect, useRef } from "react";

type Puff = { ox: number; oy: number; r: number; a: number };
type Cluster = {
  cx: number;
  cy: number;
  vx: number;
  vy: number;
  puffs: Puff[];
  wavePhase: number;
};
type Band = { y: number; spread: number; clusters: number };

const CFG = {
  puffsPerCluster: 28,
  rMin: 40,
  rMax: 120,
  alphaMin: 0.03,
  alphaMax: 0.07,
  tintMagenta: 0.06,
  tintPink: 0.04,
  vx: -0.09,
  vy: 0,
  waveAmp: 10,
  waveSpeed: 0.0012,
  maxDpr: 1.5,
  bands: [
    { y: 0.16, spread: 0.04, clusters: 3 }, // banda superior
    { y: 0.48, spread: 0.06, clusters: 5 }, // banda principal
  ] as Band[],
};

export default function CloudBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const clustersRef = useRef<Cluster[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0, DPR = 1;
    let t0 = performance.now();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, CFG.maxDpr);
      DPR = dpr;
      W = Math.floor(window.innerWidth * DPR);
      H = Math.floor(window.innerHeight * DPR);
      canvas.width = W;
      canvas.height = H;
      seedClusters();
      paint(performance.now()); // primer frame inmediato (sin “flash”)
    };

    const seedClusters = () => {
      const clusters: Cluster[] = [];
      for (const band of CFG.bands) {
        for (let i = 0; i < band.clusters; i++) {
          const bandCenter = H * band.y;
          const cy = bandCenter + rand(-H * band.spread * 0.5, H * band.spread * 0.5);
          const cx = rand(-200 * DPR, W + 200 * DPR);
          const puffs: Puff[] = Array.from({ length: CFG.puffsPerCluster }).map(() => {
            const ang = Math.random() * Math.PI * 2;
            const dist = rand(30 * DPR, 110 * DPR);
            return {
              ox: Math.cos(ang) * dist,
              oy: Math.sin(ang) * dist,
              r: rand(CFG.rMin * DPR, CFG.rMax * DPR),
              a: rand(CFG.alphaMin, CFG.alphaMax),
            };
          });
          clusters.push({
            cx,
            cy,
            vx: CFG.vx * DPR,
            vy: CFG.vy * DPR,
            puffs,
            wavePhase: Math.random() * Math.PI * 2,
          });
        }
      }
      clustersRef.current = clusters;
    };

    const paint = (now: number) => {
      const dt = now - t0;
      t0 = now;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (const c of clustersRef.current) {
        const wave = Math.sin(now * CFG.waveSpeed + c.wavePhase) * CFG.waveAmp * DPR;

        for (const p of c.puffs) {
          const x = c.cx + p.ox;
          const y = c.cy + p.oy + wave;

          // núcleo blanco
          const g = ctx.createRadialGradient(x, y, 0, x, y, p.r);
          g.addColorStop(0, `rgba(240,240,255,${p.a})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();

          // halos sutiles mágicos
          if (CFG.tintMagenta > 0) {
            const g2 = ctx.createRadialGradient(x, y, 0, x, y, p.r * 1.1);
            g2.addColorStop(0, `rgba(168,85,247,${CFG.tintMagenta * p.a})`);
            g2.addColorStop(1, "rgba(168,85,247,0)");
            ctx.fillStyle = g2;
            ctx.beginPath();
            ctx.arc(x, y, p.r * 1.1, 0, Math.PI * 2);
            ctx.fill();
          }
          if (CFG.tintPink > 0) {
            const g3 = ctx.createRadialGradient(x, y, 0, x, y, p.r * 1.15);
            g3.addColorStop(0, `rgba(244,114,182,${CFG.tintPink * p.a})`);
            g3.addColorStop(1, "rgba(244,114,182,0)");
            ctx.fillStyle = g3;
            ctx.beginPath();
            ctx.arc(x, y, p.r * 1.15, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // desplazamiento y recirculación
        c.cx += c.vx * (dt || 16.7);
        const off = 240 * DPR;
        if (c.cx < -off) c.cx = W + off * 0.5;
      }

      rafRef.current = requestAnimationFrame(paint);
    };

    fit();
    rafRef.current = requestAnimationFrame(paint);
    window.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: 0, // detrás del contenido
      }}
    />
  );
}
