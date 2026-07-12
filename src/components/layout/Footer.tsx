'use client'

import React from "react";
import Link from "next/link";
import { useCopy } from "../../lib/useCopy";

const go = (hash: string) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export const Footer: React.FC = () => {
  const t = useCopy();

  return (
    <footer>
      <div className="container foot">
        <span className="sig">
          <span className="p">DEV_</span>MITOLENDA &nbsp;&nbsp;//2026
        </span>
        <nav className="nav-foot">
          <a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t.footer.inicio}</a>
          <a onClick={() => go("#servicos")}>{t.footer.servicos}</a>
          <a onClick={() => go("#projetos")}>{t.footer.projetos}</a>
          <a onClick={() => go("#sobre")}>{t.footer.sobre}</a>
          <a onClick={() => go("#faq")}>{t.footer.faq}</a>
          <a onClick={() => go("#contato")}>{t.footer.contato}</a>
          <a href="https://instagram.com/dev_mitolenda" target="_blank" rel="noreferrer">
            @dev_mitolenda
          </a>
        </nav>
        <div className="foot-legal">
          <Link href="/termos">Termos de Serviço</Link>
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
};
