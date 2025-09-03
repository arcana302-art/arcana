// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Stars from "./components/Stars";
import CloudBackdrop from "./components/CloudBackdrop";

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
        style={{ background: "linear-gradient(180deg,#0a1120,#0b1530)" }}
      >
        {/* Estrellas (lejanas detrás, brillantes encima) */}
        <Stars />
        {/* Nubes entre capas de estrellas */}
        <CloudBackdrop />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
