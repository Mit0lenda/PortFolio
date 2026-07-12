import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { copyPt } from '../../../content/copy.pt'
import { breadcrumbSchema } from '../../../lib/jsonld'

const BASE_URL = 'https://mitolenda.dev'
const servicePages = copyPt.servicePages ?? []

export function generateStaticParams() {
  return servicePages.map((s) => ({
    slug: s.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = servicePages.find((s) => s.slug === slug)

  if (!page) return {}

  const url = `${BASE_URL}/servicos/${slug}`

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: page.metaTitle,
      description: page.metaDescription,
      images: [
        {
          url: '/og/og-default.png',
          width: 1200,
          height: 630,
          alt: page.metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: ['/og/og-default.png'],
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = servicePages.find((s) => s.slug === slug)

  if (!page) {
    notFound()
  }

  const service = copyPt.services.list[page.serviceIndex]
  const url = `${BASE_URL}/servicos/${slug}`
  const whatsappHref = copyPt.contact.cards.find((c) => c.k === 'WhatsApp')?.href

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.t,
    description: service.d,
    url,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Dev Mitolenda',
      url: BASE_URL,
    },
    areaServed: 'BR',
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'BRL',
    },
  }

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Serviços', url: `${BASE_URL}/#servicos` },
    { name: page.h1, url },
  ])

  return (
    <main className="page">
      <div className="container" style={{ padding: '96px 0' }}>
        <span className="eyebrow">// serviço</span>
        <h1 className="feat-name" style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: '24px 0 0' }}>
          {page.h1}
        </h1>
        <p style={{ color: 'var(--paper-dim)', fontSize: 18, lineHeight: 1.6, maxWidth: 720, marginTop: 32 }}>
          {page.intro}
        </p>

        <div style={{ display: 'flex', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>Investimento</div>
            <div style={{ fontSize: 20 }}>{service.price}</div>
          </div>
          <div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>Prazo</div>
            <div style={{ fontSize: 20 }}>{service.prazo}</div>
          </div>
        </div>

        <div style={{ maxWidth: 720, marginTop: 48 }}>
          {page.body.map((paragraph, i) => (
            <p key={i} style={{ color: 'var(--paper-dim)', fontSize: 16, lineHeight: 1.7, marginTop: i === 0 ? 0 : 20 }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-cta">
              Falar sobre esse projeto →
            </a>
          )}
          <a href="/#servicos" className="btn btn-ghost">
            ← Ver todos os serviços
          </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </main>
  )
}
