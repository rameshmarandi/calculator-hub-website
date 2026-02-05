import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ============================= */
  /* STATIC EXPORT (Next 15/16)   */
  /* ============================= */
  output: 'export',

  /* ============================= */
  /* REQUIRED FOR STATIC IMAGES   */
  /* ============================= */
  images: {
    unoptimized: true
  },

  /* ============================= */
  /* ROUTING STABILITY FOR NGINX  */
  /* ============================= */
  trailingSlash: true,

  /* ============================= */
  /* PERF + SECURITY              */
  /* ============================= */
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true
}

export default nextConfig
