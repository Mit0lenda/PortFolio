'use client'

import React, { useEffect, useRef } from 'react'
import { ContactForm } from './ContactForm'

interface ContactModalProps {
  isOpen:  boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // Remember the trigger and restore focus to it on close — otherwise focus
  // drops to <body> when the modal unmounts, disorienting keyboard/screen
  // reader users who opened it via the floating contact button.
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null
    } else if (triggerRef.current) {
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [isOpen])

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Focus first input when opened
  useEffect(() => {
    if (isOpen) {
      // Defer to let CSS transition complete before focus
      const timer = setTimeout(() => {
        const firstInput = modalRef.current?.querySelector<HTMLInputElement>('input:not([tabindex="-1"])')
        firstInput?.focus()
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen) return

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last  = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="cm-overlay"
      aria-modal="true"
      role="dialog"
      aria-label="Formulário de contato"
      onClick={(e) => {
        // Close when clicking the backdrop (not the card itself)
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="cm-card" ref={modalRef}>
        {/* Header */}
        <div className="cm-header">
          <div>
            <span className="cm-eyebrow">Vamos conversar</span>
            <h2 className="cm-title">Inicie seu projeto</h2>
          </div>
          <button
            className="cm-close"
            onClick={onClose}
            aria-label="Fechar formulário"
            type="button"
          >
            ×
          </button>
        </div>

        {/* Separator */}
        <div className="cm-divider" aria-hidden="true" />

        {/* Form */}
        <ContactForm
          source="floating_contact"
          onSuccess={() => {
            // Keep modal open to show success state; close after 2.5 s
            setTimeout(onClose, 2500)
          }}
        />
      </div>
    </div>
  )
}
