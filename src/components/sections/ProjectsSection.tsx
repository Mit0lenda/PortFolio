import React from "react";
import { useCopy } from "../../lib/useCopy";

const IMGS = [
  "/assets/photo-trofeu.png",
  "/assets/site-nexium.png",
  "/assets/work-atlas-dashboard.png",
];

const STACKS = [
  ["React", "Node.js", "IA", "iTwin", "Mapas"],
  ["React", "Leaflet", "Python", "CV", "Bentley"],
  ["React", "Node.js", "JWT", "MySQL", "Azure"],
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
          {t.projects.list.map((p, i) => (
            <article className="feat" key={i}>
              <div className="feat-shot">
                <img
                  src={IMGS[i]}
                  alt={p.name}
                  className={IMGS[i].includes("trofeu") ? "trophy" : ""}
                  loading="lazy"
                  decoding="async"
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
                  {STACKS[i].map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
