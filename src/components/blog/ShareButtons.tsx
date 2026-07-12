'use client'

import React, { useState, useSyncExternalStore } from 'react'

function subscribeNoop() {
  return () => {}
}
function getShareSupportSnapshot() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}
function getShareSupportServerSnapshot() {
  return false
}

export const ShareButtons: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const [copied, setCopied] = useState(false)
  // useSyncExternalStore em vez de useEffect+setState: evita divergência entre
  // o HTML do servidor (sempre "sem suporte") e o valor real no cliente, sem
  // o anti-padrão de disparar setState dentro de um efeito.
  const canNativeShare = useSyncExternalStore(
    subscribeNoop,
    getShareSupportSnapshot,
    getShareSupportServerSnapshot,
  )

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url })
    } catch {
      // Usuário cancelou o compartilhamento nativo — nenhuma ação necessária.
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro) — sem fallback adicional.
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="share-buttons" aria-label="Compartilhar artigo">
      <span className="share-label">Compartilhar</span>
      <a
        className="share-btn"
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="share-btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className="share-btn"
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <button type="button" className="share-btn" onClick={handleCopy}>
        {copied ? 'Link copiado!' : 'Copiar link'}
      </button>
      {canNativeShare && (
        <button type="button" className="share-btn" onClick={handleNativeShare}>
          Compartilhar…
        </button>
      )}
    </div>
  )
}
