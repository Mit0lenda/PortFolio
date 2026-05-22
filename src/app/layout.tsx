import type { Metadata } from 'next'
import { interFont, spaceMonoFont } from '../lib/fonts'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://mitolenda.dev'),
  title: {
    template: '%s | Dev Mitolenda',
    default: 'Dev Mitolenda — Fullstack Engineer',
  },
  description: 'Sites, sistemas e automações para empresas que querem crescer. Full-Stack Developer em Porto Alegre.',
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
      </body>
    </html>
  )
}
