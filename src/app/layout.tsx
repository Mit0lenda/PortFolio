import type { Metadata } from 'next'
import Script from 'next/script'
import { interFont, spaceMonoFont } from '../lib/fonts'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Providers } from './providers'
import { copyPt } from '../content/copy.pt'
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

const whatsappCard = copyPt.contact.cards.find((c) => c.k === 'WhatsApp')
const emailCard = copyPt.contact.cards.find((c) => c.k === 'E-mail')

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Dev Mitolenda',
  url: BASE_URL,
  image: `${BASE_URL}/og/og-default.png`,
  ...(whatsappCard && { telephone: whatsappCard.v }),
  ...(emailCard && { email: emailCard.v }),
  address: personSchema.address,
  areaServed: ['BR', 'Brasil', 'Remoto'],
  priceRange: 'R$ 500 – R$ 30.000+',
  sameAs: personSchema.sameAs,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços',
    itemListElement: copyPt.services.list.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.t,
        description: s.d,
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: s.price,
        priceCurrency: 'BRL',
      },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
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
        {/* Facebook Pixel — rastreia pageview + eventos de CTA (trackCtaClick) */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <>
            <Script
              id="fb-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
