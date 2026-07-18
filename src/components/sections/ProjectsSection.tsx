'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopy } from "../../lib/useCopy";
import { useTilt } from "../../lib/useTilt";
import { PROJECT_ASSETS, FALLBACK_ASSETS } from "../../content/projectAssets";
import { FlowDiagram } from "../media/FlowDiagram";
import { Reveal, SplitHeading } from "../motion";
import { ScrollProjects } from "./ScrollProjects/ScrollProjects";
import { SCROLL_PROJECT_IDS } from "./ScrollProjects/data";

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
    <Reveal.Item as="div">
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
          <h3 className="feat-name">{p.name}</h3>
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
    </Reveal.Item>
  );
};

export const ProjectsSection: React.FC = () => {
  const t = useCopy();
  const moreProjects = t.projects.list.filter(
    (p) => !SCROLL_PROJECT_IDS.includes(p.id as (typeof SCROLL_PROJECT_IDS)[number])
  );

  return (
    <section id="projetos">
      <div className="container">
        <ScrollProjects
          projects={t.projects.list}
          eyebrow={t.projects.eyebrow}
          headingA={t.projects.h2a}
          headingB={t.projects.h2b}
        />

        <div id="mais-projetos">
          <SplitHeading
            className="section-head"
            eyebrow={t.projects.moreEyebrow}
            heading={<>{t.projects.moreH2a} <span className="impact">{t.projects.moreH2b}</span></>}
          />

          <Reveal as="div" className="feat-grid" stagger staggerDelay={0.1}>
            {moreProjects.map((p, i) => (
              <ProjectCard p={p} i={i} labelProj={t.projects.labelProj} key={p.id} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
