// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true }, // <-- permite compilar aunque haya errores de TS
  eslint: { ignoreDuringBuilds: true },    // <-- no corta el build por ESLint
};

module.exports = nextConfig;
