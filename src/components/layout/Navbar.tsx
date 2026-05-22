'use client'

import React from "react";
import { useCopy } from "../../lib/useCopy";
import { useLanguage } from "../../_vite/LanguageProvider";
import type { Language } from "../../lib/types";

const go = (hash: string) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Navbar: React.FC = () => {
  const t = useCopy();
  const { language, setLanguage } = useLanguage();

  const links: [string, string][] = [
    ["#servicos", t.nav.servicos],
    ["#projetos", t.nav.projetos],
    ["#sites", t.nav.sites],
    ["#stack", t.nav.stack],
    ["#sobre", t.nav.sobre],
    ["#faq", t.nav.faq],
  ];

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

        <nav className="nav-links">
          {links.map(([hash, label]) => (
            <a key={hash} onClick={() => go(hash)}>
              {label}
            </a>
          ))}

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

          <button className="nav-cta" onClick={() => window.open(t.contact.cards[0].href, "_blank")}>
            {t.nav.cta}
          </button>
        </nav>
      </div>
    </header>
  );
};
