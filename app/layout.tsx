// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

// CSS globales (el orden importa: el override va al final)
import "./globals.css";
import "./arcana-theme.css";        // si no existe en tu repo, borra esta línea
import "./(site)/site-theme.css";   // <-- override MORADO (fuerza los botones)

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Arcana",
  description: "Guía mística con especialistas verificados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}

