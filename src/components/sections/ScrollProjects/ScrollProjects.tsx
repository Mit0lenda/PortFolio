'use client'

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectItem, ProjectMedia } from "../../../lib/types";
import { PROJECT_ASSETS } from "../../../content/projectAssets";
import { Reveal } from "../../motion";
import {
  SCROLL_PROJECT_IDS,
  SCROLL_PROJECT_CONFIG,
  MEDIA_BEAT_LABEL,
  PIN_DURATION_VH,
  ATLAS_PLACEHOLDER_MEDIA,
  type ScrollProjectId,
} from "./data";
import { PROJECT_BEATS, RELEASE_BEAT, getActiveIndex } from "./beats";
import { useScrollProjectsGSAP } from "./useScrollProjectsGSAP";

type Mode = "static" | "mobile-light" | "desktop-pin";

/**
 * Resolves each flagship project's 3 images into the editorial order
 * defined in SCROLL_PROJECT_CONFIG. Atlas uses a scoped placeholder instead
 * of PROJECT_ASSETS' real (discontinued, client-disliked) screenshots.
 * Falls back to `cover` for a missing gallery slot instead of crashing —
 * PROJECT_ASSETS' gallery is a plain array, not a guaranteed 2-item tuple.
 */
function resolveMedia(id: ScrollProjectId): [ProjectMedia, ProjectMedia, ProjectMedia] {
  if (id === "atlas") return ATLAS_PLACEHOLDER_MEDIA;
  const assets = PROJECT_ASSETS[id];
  const bySlot = { cover: assets.cover, gallery0: assets.gallery?.[0], gallery1: assets.gallery?.[1] };
  const order = SCROLL_PROJECT_CONFIG[id].mediaOrder;
  return order.map((slot) => bySlot[slot] ?? assets.cover) as [ProjectMedia, ProjectMedia, ProjectMedia];
}

function useEnhancementMode(): Mode {
  const [mode, setMode] = useState<Mode>("static");

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 900px)");

    const compute = () => {
      if (reduceQuery.matches) return setMode("static");
      setMode(desktopQuery.matches ? "desktop-pin" : "mobile-light");
    };

    compute();
    reduceQuery.addEventListener("change", compute);
    desktopQuery.addEventListener("change", compute);
    return () => {
      reduceQuery.removeEventListener("change", compute);
      desktopQuery.removeEventListener("change", compute);
    };
  }, []);

  return mode;
}

const ProjectCopy: React.FC<{ p: ProjectItem; stack: string[] }> = ({ p, stack }) => {
  const result = p.results?.[0];
  const resultText = result
    ? `${result.value}${result.context ? ` — ${result.context}` : ""}`
    : p.trophy.replace(/^\/\/\s*/, "").replace(/^🥉\s*|^🚀\s*/, "");

  return (
    <div className="sp-copy">
      <span className="sp-tag">{p.tag}</span>
      <h3 className="sp-name">
        {p.name}
        <span className="impact">.</span>
      </h3>
      <div className="sp-field">
        <span className="k">Problema</span>
        <span className="v">{p.problem ?? p.desc}</span>
      </div>
      {p.solution && (
        <div className="sp-field">
          <span className="k">Solução</span>
          <span className="v">{p.solution}</span>
        </div>
      )}
      <div className="sp-stack">
        {stack.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="sp-result">
        <span className="k">Resultado</span>
        <span className="v">{resultText}</span>
      </div>
      <Link href={`/projects/${p.id}`} className="sp-cta">
        Ver case completo →
      </Link>
    </div>
  );
};

type ScrollProjectsProps = {
  projects: ProjectItem[];
  eyebrow: string;
  headingA: string;
  headingB: string;
};

export const ScrollProjects: React.FC<ScrollProjectsProps> = ({
  projects,
  eyebrow,
  headingA,
  headingB,
}) => {
  const mode = useEnhancementMode();
  const shouldReduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const indexLabelRef = useRef<HTMLButtonElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[][]>([[], [], []]);

  const flagship = SCROLL_PROJECT_IDS.map(
    (id) => projects.find((p) => p.id === id)!
  ).filter(Boolean);

  const { jumpToProgress, getCurrentProgress } = useScrollProjectsGSAP({
    active: mode === "desktop-pin",
    stageRef,
    wipeRef,
    progressBarRef,
    indexLabelRef,
    projectRefs,
    mediaRefs,
    projectIds: SCROLL_PROJECT_IDS,
  });

  /** Every `.sp-project` sits at `position:absolute;inset:0` while pinned —
   * they're stacked, not laid out, so all 3 report an identical bounding
   * rect and `scrollIntoView` can't tell them apart. Jump by computing the
   * real scroll position for that project's stable "read" beat instead. */
  const jumpToProject = (i: number) => {
    jumpToProgress(PROJECT_BEATS[i].read[0] + 0.005);
  };

  /** "01/03" clicável — pula pro PRÓXIMO projeto (cíclico), distinto dos
   * botões de navegação direta por nome. */
  const jumpToNextProject = () => {
    const current = getActiveIndex(getCurrentProgress());
    jumpToProject((current + 1) % flagship.length);
  };

  const jumpToMoreProjects = () => {
    jumpToProgress(RELEASE_BEAT[1]);
  };

  return (
    <div className="sp-root">
      <div className="sp-head">
        <span className="eyebrow">{eyebrow}</span>
        <motion.h2
          className="sp-title"
          initial={shouldReduceMotion ? false : { scale: 1.12, opacity: 0.4, filter: "blur(6px)" }}
          whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {headingA} <span className="impact">{headingB}</span>
        </motion.h2>
      </div>

      <div
        className="sp-stage"
        ref={stageRef}
        data-mode={mode}
        style={mode === "desktop-pin" ? { height: "100vh" } : undefined}
      >
        {mode === "desktop-pin" && (
          <>
            <div className="sp-controls">
              <button
                type="button"
                className="sp-index"
                ref={indexLabelRef}
                onClick={jumpToNextProject}
                aria-label="Ir para o próximo projeto"
              >
                01/{String(flagship.length).padStart(2, "0")}
              </button>
              <div className="sp-progress-line">
                <span className="sp-progress-fill" ref={progressBarRef} />
              </div>
              <nav className="sp-jump-nav" aria-label="Navegar direto para um projeto">
                {flagship.map((p, i) => (
                  <button key={p.id} type="button" onClick={() => jumpToProject(i)}>
                    {p.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="sp-wipe" ref={wipeRef} aria-hidden="true" />
          </>
        )}

        {flagship.map((p, i) => {
          const media = resolveMedia(p.id as ScrollProjectId);
          const config = SCROLL_PROJECT_CONFIG[p.id as ScrollProjectId];
          const assets = PROJECT_ASSETS[p.id];

          const project = (
            <div
              className={`sp-project sp-project--${config.side}`}
              key={p.id}
              id={`projeto-${p.id}`}
              ref={(el) => {
                projectRefs.current[i] = el;
              }}
              data-accent={config.accent}
            >
              <div className="sp-media">
                {media.map((m, bi) => (
                  <div
                    className="sp-media-frame"
                    key={bi}
                    data-beat={bi}
                    ref={(el) => {
                      mediaRefs.current[i][bi] = el;
                    }}
                  >
                    {m.src.endsWith(".svg") ? (
                      // Plain <img>, not next/image: static SVG placeholder,
                      // Next's optimizer blocks local SVGs by default.
                      <img
                        src={m.src}
                        alt={m.alt}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={m.src}
                        alt={m.alt}
                        fill
                        // Only the very first beat of the very first project is
                        // a real LCP candidate — flag just that one `priority`
                        // (preload + fetchPriority=high). The other 8 still need
                        // to load before their turn (autoAlpha:0 on inactive
                        // projects blocks native lazy-loading from ever firing),
                        // but as eager, not competing for bandwidth with the
                        // page's actual above-the-fold image.
                        priority={mode === "desktop-pin" && i === 0 && bi === 0}
                        loading={mode === "desktop-pin" ? "eager" : undefined}
                        sizes="(max-width: 900px) 100vw, 55vw"
                        style={{ objectFit: m.type === "photo" ? "contain" : "cover" }}
                      />
                    )}
                    <span className="sp-media-beat-label">// {MEDIA_BEAT_LABEL[bi]}</span>
                  </div>
                ))}
              </div>
              <ProjectCopy p={p} stack={assets.stack} />
            </div>
          );

          return mode === "mobile-light" ? (
            <Reveal as="div" key={p.id}>
              {project}
            </Reveal>
          ) : (
            project
          );
        })}
      </div>

      {mode === "desktop-pin" && (
        <a
          href="#mais-projetos"
          className="sp-skip"
          onClick={(e) => {
            e.preventDefault();
            jumpToMoreProjects();
          }}
        >
          Pular para "Mais projetos" →
        </a>
      )}
    </div>
  );
};

export { PIN_DURATION_VH };
