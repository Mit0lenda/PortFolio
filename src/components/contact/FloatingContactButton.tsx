'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { ContactModal } from './ContactModal'

/** Appears after DELAY_MS OR after the user scrolls past SCROLL_THRESHOLD % */
const DELAY_MS         = 1_000
const SCROLL_THRESHOLD = 20 // percent

export function FloatingContactButton() {
  const [visible, setVisible]   = useState(false)
  const [isOpen,  setIsOpen]    = useState(false)

  // Show after delay OR scroll
  useEffect(() => {
    const show = () => {
      if (!visible) setVisible(true)
    }

    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (pct >= SCROLL_THRESHOLD) show()
    }

    const timer = setTimeout(show, DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [visible])

  const openModal  = useCallback(() => setIsOpen(true),  [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <button
        className={`fcb-btn${visible ? ' fcb-btn--visible' : ''}`}
        onClick={openModal}
        aria-label="Abrir formulário de contato"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        type="button"
      >
        {/* Chat icon */}
        <svg
          className="fcb-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="fcb-label">
          <span className="fcb-label--desktop">Entrar em contato</span>
          <span className="fcb-label--mobile">Contato</span>
        </span>
      </button>

      <ContactModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
