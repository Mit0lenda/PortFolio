declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Dispara um evento de clique em CTA via Facebook Pixel (trackCustom),
 * sem depender de nenhum vendor de analytics novo. No-op se o pixel
 * não estiver carregado (NEXT_PUBLIC_FB_PIXEL_ID não configurado).
 */
export function trackCtaClick(channel: string, source: string) {
  if (typeof window === 'undefined') return
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'CTAClick', { channel, source })
  }
}
