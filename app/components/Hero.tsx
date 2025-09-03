// app/components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="hero"
    >
      <div className="container">
        <h1 id="hero-title" className="title">
          Guía mística con <span className="gradient">especialistas verificados</span>
        </h1>

        <p className="subtitle">
          Tarot, Astrología, Numerología y más. Agenda en minutos y conéctate por videollamada en un entorno cuidado.
        </p>

        <div className="actions" role="group" aria-label="Acciones principales">
          <Link href="/booking" className="btn btn-primary">
            Agendar una consulta
          </Link>
          <Link href="/join" className="btn btn-secondary">
            Únete como especialista
          </Link>
        </div>

        <ul className="trust">
          <li>Talentos verificados</li>
          <li>Pagos protegidos</li>
          <li>Videollamada integrada</li>
        </ul>
      </div>

      <style jsx>{`
        .hero{
          position: relative;
          padding: clamp(80px, 12vw, 140px) 16px clamp(28px, 6vw, 48px);
        }
        .container{
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .title{
          font-family: var(--font-display), serif;
          font-size: clamp(32px, 5.6vw, 64px);
          line-height: 1.08;
          margin: 0 0 16px;
          letter-spacing: 0.2px;
          color: #e9eef9;
          text-shadow: 0 1px 0 rgba(255,255,255,0.04);
        }
        .gradient{
          background: linear-gradient(90deg, #c084fc 0%, #f0abfc 24%, #f472b6 60%, #93c5fd 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 10px rgba(147,197,253,0.18));
        }

        .subtitle{
          font-family: var(--font-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          font-size: clamp(16px, 2.1vw, 20px);
          line-height: 1.6;
          color: rgba(236, 242, 255, 0.82);
          margin: 0 auto 28px;
          max-width: 840px;
        }

        .actions{
          display: inline-flex;
          gap: 14px;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .btn{
          --ring: rgba(168,85,247,0.45);
          --glow1: rgba(168,85,247,0.35);
          --glow2: rgba(244,114,182,0.28);
          --glow3: rgba(147,197,253,0.20);
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 20px;
          border-radius: 999px;
          font-weight: 600;
          text-decoration: none;
          transition: transform .18s ease, box-shadow .18s ease, background .18s ease, color .18s ease, opacity .18s ease, border-color .18s ease;
          will-change: transform, box-shadow, background, color;
        }
        .btn-primary{
          color: #0a0f1a;
          background: linear-gradient(90deg,#c084fc 0%,#f472b6 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.06) inset,
            0 6px 22px var(--glow1),
            0 2px 10px var(--glow2),
            0 0 12px var(--glow3);
        }
        .btn-primary:hover{
          transform: translateY(-1px);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.08) inset,
            0 10px 26px rgba(168,85,247,0.45),
            0 4px 14px rgba(244,114,182,0.34),
            0 0 16px rgba(147,197,253,0.26);
        }
        .btn-primary:active{ transform: translateY(0); opacity: .95; }

        .btn-secondary{
          color: #e6ebf7;
          border: 1px solid rgba(255,255,255,0.16);
          background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0.02) 70%, transparent 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.04) inset,
            0 2px 10px rgba(168,85,247,0.18);
          backdrop-filter: blur(2px);
        }
        .btn-secondary:hover{
          border-color: rgba(255,255,255,0.24);
          transform: translateY(-1px);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.06) inset,
            0 4px 14px rgba(168,85,247,0.28);
          background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 38%, rgba(255,255,255,0.03) 72%, transparent 100%);
        }
        .btn-secondary:active{ transform: translateY(0); opacity: .95; }

        .trust{
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin: 10px auto 0;
          padding: 0;
          list-style: none;
          max-width: 920px;
        }
        .trust li{
          font-family: var(--font-sans), system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          font-size: 14px;
          color: rgba(230,235,247,0.85);
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          padding: 8px 12px;
          border-radius: 999px;
          backdrop-filter: blur(2px);
        }

        @media (prefers-reduced-motion: reduce){
          .btn-primary:hover,.btn-secondary:hover{ transform:none; }
        }
      `}</style>
    </section>
  );
}
