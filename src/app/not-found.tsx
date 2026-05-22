import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="page" style={{ padding: '120px 0', textAlign: 'center' }}>
      <div className="container">
        <span className="eyebrow">// 404</span>
        <h1 style={{ fontSize: 'clamp(64px, 12vw, 160px)', lineHeight: 0.95, margin: '24px 0 0' }}>
          PÁGINA<br />
          <span className="impact">NÃO</span><br />
          ENCONTRADA
        </h1>
        <p style={{ color: 'var(--paper-dim)', marginTop: 32, fontSize: 18 }}>
          A página que você procura não existe ou foi removida.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link href="/" className="btn btn-cta">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  )
}
