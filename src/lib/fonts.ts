import { Inter, Space_Mono } from 'next/font/google'

export const interFont = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-inter-next',
  display: 'swap',
})

export const spaceMonoFont = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-spacemono-next',
  display: 'swap',
})
