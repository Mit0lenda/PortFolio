import type { Metadata } from 'next'
import Script from 'next/script'
import { interFont, spaceMonoFont } from '../lib/fonts'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Providers } from './providers'
import './globals.css'
import './chatwoot.css'

const BASE_URL = 'https://mitolenda.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Dev Mitolenda',
    default: 'Dev Mitolenda — Fullstack Engineer',
  },
  description:
    'Sites, sistemas e automações para empresas que querem crescer. Full-Stack Developer em Porto Alegre.',
  keywords: [
    'fullstack developer',
    'desenvolvedor fullstack',
    'Next.js',
    'React',
    'NestJS',
    'Porto Alegre',
    'freelancer',
    'automação',
  ],
  authors: [{ name: 'Dev Mitolenda', url: BASE_URL }],
  creator: 'Dev Mitolenda',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Dev Mitolenda',
    title: 'Dev Mitolenda — Fullstack Engineer',
    description:
      'Sites, sistemas e automações para empresas que querem crescer. Full-Stack Developer em Porto Alegre.',
    images: [
      {
        url: '/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Dev Mitolenda — Fullstack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Mitolenda — Fullstack Engineer',
    description:
      'Sites, sistemas e automações para empresas que querem crescer.',
    images: ['/og/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
}

// JSON-LD structured data
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dev Mitolenda',
  url: BASE_URL,
  jobTitle: 'Fullstack Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Porto Alegre',
    addressRegion: 'RS',
    addressCountry: 'BR',
  },
  sameAs: [
    'https://github.com/devmitolenda',
    'https://linkedin.com/in/devmitolenda',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dev Mitolenda',
  url: BASE_URL,
  description:
    'Sites, sistemas e automações para empresas que querem crescer.',
  author: {
    '@type': 'Person',
    name: 'Dev Mitolenda',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${interFont.variable} ${spaceMonoFont.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Cloudflare Web Analytics — cookieless, privacy-first (OPT-04) */}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token":"${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
