'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";
import { PROJECT_ASSETS, FALLBACK_ASSETS } from "../../content/projectAssets";
import { FlowDiagram } from "../media/FlowDiagram";

type Project = {
  id: string;
  name: string;
  tag: string;
  trophy: string;
  desc: string;
};

const ProjectCard: React.FC<{ p: Project; i: number; labelProj: string }> = ({
  p,
  i,
  labelProj,
}) => {
  const media = PROJECT_ASSETS[p.id] || FALLBACK_ASSETS;
  const isTrophy = media.cover?.type === "photo";
  const tiltRef = useTilt<HTMLElement>();

  return (
    <Link
      className="feat-link"
      href={`/projects/${p.id}`}
      aria-label={`Ver projeto ${p.name}`}
    >
      <article className="feat tilt" ref={tiltRef}>
        <div className="feat-shot" style={{ position: "relative" }}>
          {media.cover ? (
            <Image
              src={media.cover.src}
              alt={media.cover.alt}
              fill
              className={isTrophy ? "trophy" : ""}
              style={{ objectFit: isTrophy ? "contain" : "cover" }}
            />
          ) : (
            media.flow && <FlowDiagram steps={media.flow} labelPrefix={p.name} compact />
          )}
        </div>
        <div className="feat-body">
          <div className="feat-eyebrow">
            <span className="num">
              // {labelProj} {String(i + 1).padStart(2, "0")}
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
    </Link>
  );
};

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
            <ProjectCard p={p} i={i} labelProj={t.projects.labelProj} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
};
