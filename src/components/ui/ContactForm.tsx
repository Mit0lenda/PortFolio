'use client'

import React, { useState } from "react";
import { useLanguage } from "../../_vite/LanguageProvider";

// ── i18n ─────────────────────────────────────────────────────────────────────
const i18n = {
  pt: {
    title:     "Ou me manda uma mensagem direta",
    name:      "Seu nome *",
    email:     "Seu e-mail *",
    message:   "O que você precisa?",
    messagePh: "Conta brevemente o seu projeto ou dúvida...",
    send:      "Enviar mensagem →",
    sending:   "Enviando...",
    success:   "✓ Mensagem enviada! Retorno em até 24h.",
    errReq:    "Nome, e-mail e mensagem são obrigatórios.",
    errSend:   "Erro ao enviar. Tente pelo WhatsApp ou e-mail.",
  },
  en: {
    title:     "Or send me a direct message",
    name:      "Your name *",
    email:     "Your email *",
    message:   "What do you need?",
    messagePh: "Briefly describe your project or question...",
    send:      "Send message →",
    sending:   "Sending...",
    success:   "✓ Message sent! I'll reply within 24h.",
    errReq:    "Name, email and message are required.",
    errSend:   "Send failed. Try WhatsApp or email instead.",
  },
  es: {
    title:     "O envíame un mensaje directo",
    name:      "Tu nombre *",
    email:     "Tu email *",
    message:   "¿Qué necesitas?",
    messagePh: "Describe brevemente tu proyecto o pregunta...",
    send:      "Enviar mensaje →",
    sending:   "Enviando...",
    success:   "✓ ¡Mensaje enviado! Respuesta en 24h.",
    errReq:    "Nombre, email y mensaje son obligatorios.",
    errSend:   "Error al enviar. Intenta por WhatsApp o email.",
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
    <div className="contact-form-wrap">
      <p className="contact-form-title">{tx.title}</p>

      {status === "success" ? (
        <p className="cf-feedback cf-success">{tx.success}</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-row">
            <input
              className="cf-input"
              type="text"
              placeholder={tx.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "sending"}
            />
            <input
              className="cf-input"
              type="email"
              placeholder={tx.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
            />
          </div>

          <textarea
            className="cf-input cf-textarea"
            placeholder={`${tx.message} — ${tx.messagePh}`}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status === "sending"}
          />

          {validErr && (
            <p className="cf-feedback cf-error">{tx.errReq}</p>
          )}
          {status === "error" && (
            <p className="cf-feedback cf-error">{tx.errSend}</p>
          )}

          <button
            className="btn-primary cf-btn"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? tx.sending : tx.send}
          </button>
        </form>
      )}
    </div>
  );
};
