'use client'

import React, { useState } from "react";
import { useLanguage } from "../../_vite/LanguageProvider";

// ── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  pt: {
    eyebrow:   "// fale comigo",
    heading:   "Tem um projeto em mente?",
    subheading:"Conta o que precisa — respondo pessoalmente em até 24h.",
    badge:     "🏆 3º Lugar Nacional · Resposta em < 24h",
    name:      "Seu nome",
    email:     "Seu e-mail",
    message:   "Conte seu projeto ou dúvida...",
    send:      "Quero conversar →",
    sending:   "Enviando...",
    success:   "✓ Mensagem enviada! Você vai receber uma resposta em breve.",
    errReq:    "Preencha nome, e-mail e mensagem.",
    errSend:   "Erro ao enviar. Tente pelo WhatsApp.",
  },
  en: {
    eyebrow:   "// get in touch",
    heading:   "Got a project in mind?",
    subheading:"Tell me what you need — I reply personally within 24h.",
    badge:     "🏆 National Award Winner · Reply in < 24h",
    name:      "Your name",
    email:     "Your email",
    message:   "Tell me about your project or question...",
    send:      "Let's talk →",
    sending:   "Sending...",
    success:   "✓ Message sent! You'll hear back from me shortly.",
    errReq:    "Please fill in name, email and message.",
    errSend:   "Failed to send. Try WhatsApp instead.",
  },
  es: {
    eyebrow:   "// hablemos",
    heading:   "¿Tienes un proyecto en mente?",
    subheading:"Cuéntame qué necesitas — respondo personalmente en menos de 24h.",
    badge:     "🏆 Premio Nacional · Respuesta en < 24h",
    name:      "Tu nombre",
    email:     "Tu email",
    message:   "Cuéntame tu proyecto o pregunta...",
    send:      "Quiero conversar →",
    sending:   "Enviando...",
    success:   "✓ ¡Mensaje enviado! Te responderé pronto.",
    errReq:    "Completa nombre, email y mensaje.",
    errSend:   "Error al enviar. Intenta por WhatsApp.",
  },
} as const;

type Status = "idle" | "sending" | "success" | "error";

export const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const tx = i18n[language as keyof typeof i18n] ?? i18n.pt;

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [validErr, setValidErr] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidErr(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setValidErr(true);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    name.trim(),
          email:   email.trim(),
          message: message.trim(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="cf-section">
      {/* Header acima do card */}
      <div className="cf-header">
        <span className="eyebrow">{tx.eyebrow}</span>
        <h3 className="cf-heading">{tx.heading}</h3>
        <p className="cf-subheading">{tx.subheading}</p>
        <span className="cf-badge">{tx.badge}</span>
      </div>

      {/* Card elevado com o formulário */}
      <div className="cf-card">
        {status === "success" ? (
          <div className="cf-success-wrap">
            <span className="cf-success-icon">✓</span>
            <p className="cf-success-msg">{tx.success}</p>
          </div>
        ) : (
          <form className="cf-form" onSubmit={handleSubmit} noValidate>
            <div className="cf-row">
              <div className="cf-field">
                <label className="cf-label">{tx.name}</label>
                <input
                  className="cf-input"
                  type="text"
                  placeholder="Nicollas Freitas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === "sending"}
                />
              </div>
              <div className="cf-field">
                <label className="cf-label">{tx.email}</label>
                <input
                  className="cf-input"
                  type="email"
                  placeholder="nicollas@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "sending"}
                />
              </div>
            </div>

            <div className="cf-field">
              <label className="cf-label">{tx.message}</label>
              <textarea
                className="cf-input cf-textarea"
                placeholder="Preciso de um site para minha empresa..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "sending"}
              />
            </div>

            {validErr && (
              <p className="cf-feedback cf-error">{tx.errReq}</p>
            )}
            {status === "error" && (
              <p className="cf-feedback cf-error">{tx.errSend}</p>
            )}

            <button
              className="cf-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <><span className="cf-spinner" /> {tx.sending}</>
              ) : tx.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
