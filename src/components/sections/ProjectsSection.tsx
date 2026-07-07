'use client'

import React from "react";
import Image from "next/image";
import { useCopy } from "../../lib/useCopy";

// Mapeado por ID estável do projeto (não por posição no array nem pelo
// `name` traduzido) — evita que a imagem/stack de um projeto "vaze" para
// outro quando a ordem muda em src/content/copy.*.ts ou quando o `name`
// é traduzido por idioma (ex.: "CRM Autônomo" vira "Autonomous CRM" em EN).
type ProjectMedia = { img: string; stack: string[]; contain?: boolean };

const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "promocode": {
    // TODO: trocar por print/GIF real de uma conversa no WhatsApp assim que
    // a integração com marketplaces fechar (ver DEV-158 no Linear).
    img: "/og/og-default.png",
    stack: ["n8n", "LangChain", "Supabase", "Chatwoot", "RAG"],
  },
  "haven-link": {
    img: "/assets/photo-trofeu.png",
    stack: ["React", "Node.js", "IA", "iTwin", "Mapas"],
    contain: true,
  },
  "nexus": {
    img: "/assets/site-nexium.png",
    stack: ["React", "Leaflet", "Python", "CV", "Bentley"],
  },
  "atlas": {
    img: "/assets/work-atlas-dashboard.png",
    stack: ["React", "Node.js", "JWT", "MySQL", "Azure"],
  },
  "crm-autonomo": {
    img: "/assets/work-propostas.png",
    stack: ["Node.js", "Scraping", "Automation", "CRM", "API"],
  },
};

const FALLBACK_MEDIA: ProjectMedia = { img: "/og/og-default.png", stack: [] };

export const ProjectsSection: React.FC = () => {
  const t = useCopy();

  return (
    <section id="projetos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{t.projects.eyebrow}</span>
          <h2>
            {t.projects.h2a} <span className="impact">{t.projects.h2b}</span>
          </h2>
          <p className="desc">{t.projects.desc}</p>
        </div>

        <div className="feat-grid">
          {t.projects.list.map((p, i) => {
            const media = PROJECT_MEDIA[p.id] || FALLBACK_MEDIA;
            const isTrophy = !!media.contain;
            return (
              <article className="feat" key={p.id}>
                <div className="feat-shot" style={{ position: "relative" }}>
                  <Image
                    src={media.img}
                    alt={p.name}
                    fill
                    className={isTrophy ? "trophy" : ""}
                    style={{ objectFit: isTrophy ? "contain" : "cover" }}
                  />
                </div>
                <div className="feat-body">
                  <div className="feat-eyebrow">
                    <span className="num">
                      // {t.projects.labelProj} {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{p.tag}</span>
                  </div>
                  <span className="feat-trophy">{p.trophy}</span>
                  <h3 className="feat-name">
                    {p.name}
                    <span className="impact">.</span>
                  </h3>
                  <p className="feat-desc">{p.desc}</p>
                  <div className="feat-stack">
                    {media.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
