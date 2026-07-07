'use client'

import React from "react";
import Image from "next/image";
import { useCopy } from "../../lib/useCopy";

const IMGS = [
  "/assets/photo-trofeu.png",
  "/assets/site-nexium.png",
  "/assets/work-atlas-dashboard.png",
  "/assets/work-propostas.png",
];

const STACKS = [
  ["React", "Node.js", "IA", "iTwin", "Mapas"],
  ["React", "Leaflet", "Python", "CV", "Bentley"],
  ["React", "Node.js", "JWT", "MySQL", "Azure"],
  ["Node.js", "Scraping", "Automation", "CRM", "API"],
];

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
            const img = IMGS[i] || "/assets/photo-trofeu.png";
            const stack = STACKS[i] || [];
            const isTrophy = img.includes("trofeu");
            return (
              <article className="feat" key={i}>
                <div className="feat-shot" style={{ position: "relative" }}>
                  <Image
                    src={img}
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
                    {stack.map((s) => (
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
