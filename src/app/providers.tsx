'use client'

import { LanguageProvider } from '../_vite/LanguageProvider'
import { ChatwootWidget } from '../components/contact/ChatwootWidget'
import { MouseTracker } from '../components/layout/MouseTracker'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <MouseTracker />
      {children}
      <ChatwootWidget />
    </LanguageProvider>
  )
}
