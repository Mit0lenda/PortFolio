'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCopy } from "../../lib/useCopy";
import { useLanguage } from "../../_vite/LanguageProvider";
import type { Language } from "../../lib/types";
import { trackCtaClick } from "../../lib/analytics/trackEvent";

export const Navbar: React.FC = () => {
  const t = useCopy();
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const links: [string, string][] = [
    ["#servicos", t.nav.servicos],
    ["#projetos", t.nav.projetos],
    ["#sites", t.nav.sites],
    ["#stack", t.nav.stack],
    ["#sobre", t.nav.sobre],
    ["#faq", t.nav.faq],
  ];

  const go = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a[href]");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <button
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="p">DEV</span>
          <span className="u" />
          MITOLENDA
        </button>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav className="nav-links">
          <div id="nav-menu" ref={menuRef} className={`nav-menu${open ? " open" : ""}`}>
            {links.map(([hash, label], i) => (
              <a
                key={hash}
                href={hash}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={(e) => go(e, hash)}
              >
                {label}
              </a>
            ))}
            <Link href="/blog" onClick={() => setOpen(false)}>
              Conteúdos
            </Link>
          </div>

          <div className="lang-switch">
            {(["pt", "en", "es"] as Language[]).map((l) => (
              <button
                key={l}
                className={language === l ? "on" : ""}
                onClick={() => setLanguage(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className="nav-cta"
            onClick={() => {
              trackCtaClick("whatsapp", "navbar");
              window.open(t.contact.cards[0].href, "_blank");
            }}
          >
            {t.nav.cta}
          </button>
        </nav>
      </div>
    </header>
  );
};
