import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

// Origens externas reais em uso pelo site (Chatwoot, Cloudflare Web Analytics,
// Supabase, Facebook Pixel) — política inicial pragmática, não estrita por
// nonce (evolução futura). 'unsafe-inline' é necessário hoje pelos estilos
// inline (React style={{}}) e pelo snippet inline do Facebook Pixel.
const CHATWOOT_ORIGIN = 'https://n8n-chatwoot.qzqlae.easypanel.host'
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com ${CHATWOOT_ORIGIN} https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: https://*.supabase.co https://www.facebook.com`,
  `connect-src 'self' https://*.supabase.co https://static.cloudflareinsights.com ${CHATWOOT_ORIGIN} wss://n8n-chatwoot.qzqlae.easypanel.host https://connect.facebook.net`,
  `frame-src ${CHATWOOT_ORIGIN}`,
  "font-src 'self' data:",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: CSP },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/privacidade',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/politica-de-privacidade',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/termos',
        permanent: true,
      },
      {
        source: '/projects/crm-autnomo',
        destination: '/projects/crm-autonomo',
        permanent: true,
      },
    ]
  },
}

// Bundle analyzer: run `ANALYZE=true npm run build` to open the bundle report
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
