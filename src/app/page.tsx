import type { Metadata } from 'next'
import { HomePage } from '../_pages/Home'
import { getLatestPosts } from '../lib/blog/posts'

export const revalidate = 3600

const TITLE = 'Criação de Sites e Sistemas Web em Porto Alegre | Dev Mitolenda'
const DESCRIPTION =
  'Sites institucionais, landing pages, automações n8n e sistemas web sob medida em Porto Alegre e para todo o Brasil, 100% remoto. Orçamento e prazo na mesa antes da reunião.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default async function Page() {
  // Nunca deixa uma falha do Supabase derrubar a home — degrada para lista
  // vazia (a BlogSection simplesmente não renderiza nesse caso).
  const posts = await getLatestPosts(3).catch((err) => {
    console.error('[home] getLatestPosts failed:', err)
    return []
  })

  return <HomePage posts={posts} />
}
