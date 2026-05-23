'use client'

import { LanguageProvider } from '../_vite/LanguageProvider'
import { FloatingContactButton } from '../components/contact/FloatingContactButton'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <FloatingContactButton />
    </LanguageProvider>
  )
}
