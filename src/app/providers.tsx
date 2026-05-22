'use client'

import { LanguageProvider } from '../_vite/LanguageProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
