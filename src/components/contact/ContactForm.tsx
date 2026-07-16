'use client'

import React, { useState, useId } from 'react'
import type { ContactPayload } from '../../lib/contact/validateContactPayload'

interface ContactFormProps {
  /** Where the form lives — sent to API for analytics */
  source: ContactPayload['source']
  /** Optional callback after successful submit */
  onSuccess?: () => void
  /** Extra class for the wrapping element */
  className?: string
}

interface FormState {
  name:    string
  email:   string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm({ source, onSuccess, className = '' }: ContactFormProps) {
  const formId = useId()

  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return

    setStatus('loading')
    setErrorMsg('')

    // Read honeypot (hidden field — filled only by bots)
    const honeypot = (e.currentTarget.elements.namedItem('company_website') as HTMLInputElement)?.value ?? ''

    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null

    const payload: Omit<ContactPayload, 'created_at'> & { created_at: string } = {
      source,
      customer_name:  form.name.trim(),
      customer_email: form.email.trim(),
      message:        form.message.trim(),
      created_at:     new Date().toISOString(),
      page_url:       typeof window !== 'undefined' ? window.location.href : '',
      user_agent:     typeof navigator !== 'undefined' ? navigator.userAgent : '',
      utm_source:     params?.get('utm_source') ?? undefined,
      utm_medium:     params?.get('utm_medium') ?? undefined,
      utm_campaign:   params?.get('utm_campaign') ?? undefined,
      company_website: honeypot,
    }

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        onSuccess?.()
      } else {
        setStatus('error')
        setErrorMsg(data.message ?? 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Falha de conexão. Verifique sua internet e tente novamente.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`cf-success-wrap ${className}`} aria-live="polite">
        <div className="cf-success-icon" aria-hidden="true">✓</div>
        <p className="cf-success-msg">
          Mensagem recebida! Entrarei em contato em breve.
        </p>
      </div>
    )
  }

  return (
    <form
      id={`contact-form-${formId}`}
      className={`cf-form ${className}`}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot — invisible to real users */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor={`cf-name-${formId}`} className="cf-label">Nome</label>
          <input
            id={`cf-name-${formId}`}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Seu nome"
            className="cf-input"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            disabled={status === 'loading'}
          />
        </div>

        <div className="cf-field">
          <label htmlFor={`cf-email-${formId}`} className="cf-label">E-mail</label>
          <input
            id={`cf-email-${formId}`}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="cf-input"
            required
            maxLength={254}
            autoComplete="email"
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor={`cf-msg-${formId}`} className="cf-label">Mensagem</label>
        <textarea
          id={`cf-msg-${formId}`}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Conte um pouco sobre seu projeto ou necessidade…"
          className="cf-input cf-textarea"
          required
          minLength={20}
          maxLength={2000}
          rows={5}
          disabled={status === 'loading'}
        />
      </div>

      {status === 'error' && (
        <p className="cf-error" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="cf-submit"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <span className="cf-spinner" aria-label="Enviando…" />
        ) : (
          'Quero conversar →'
        )}
      </button>
    </form>
  )
}
