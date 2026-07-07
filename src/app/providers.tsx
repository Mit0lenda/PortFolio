'use client'

import { LanguageProvider } from '../_vite/LanguageProvider'
import { ChatwootWidget } from '../components/contact/ChatwootWidget'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <ChatwootWidget />
    </LanguageProvider>
  )
}
