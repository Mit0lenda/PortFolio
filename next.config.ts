import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

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
