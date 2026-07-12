'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[error boundary]', error)
  }, [error])

  return (
    <main className="page" style={{ padding: '120px 0', textAlign: 'center' }}>
      <div className="container">
        <span className="eyebrow">// Erro</span>
        <h1 style={{ fontSize: 'clamp(48px, 9vw, 120px)', lineHeight: 0.95, margin: '24px 0 0' }}>
          ALGO DEU<br />
          <span className="impact">ERRADO</span>
        </h1>
        <p style={{ color: 'var(--paper-dim)', marginTop: 32, fontSize: 18 }}>
          Não foi possível carregar esta página agora. Tente novamente em instantes.
        </p>
        <div style={{ marginTop: 40, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={reset} className="btn btn-cta">
            Tentar novamente
          </button>
          <a href="/" className="btn btn-ghost">
            ← Voltar ao início
          </a>
        </div>
      </div>
    </main>
  )
}
