"use client";

import { useEffect, useRef, useCallback, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PIN_DURATION_VH, SCROLL_PROJECT_CONFIG, type ScrollProjectId } from "./data";
import { PROJECT_BEATS, CUT_BEATS, RELEASE_BEAT, getActiveIndex } from "./beats";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Args = {
  active: boolean;
  stageRef: RefObject<HTMLDivElement | null>;
  wipeRef: RefObject<HTMLDivElement | null>;
  progressBarRef: RefObject<HTMLSpanElement | null>;
  indexLabelRef: RefObject<HTMLButtonElement | null>;
  projectRefs: RefObject<(HTMLDivElement | null)[]>;
  mediaRefs: RefObject<(HTMLDivElement | null)[][]>;
  projectIds: ScrollProjectId[];
};

const EASE = "power2.out";
const ACCENT_HEX = { orange: "#F24A00", blue: "#00AEEF" } as const;

/**
 * Builds the pinned scrub timeline for the flagship projects sequence.
 * Only runs when `active` (desktop viewport + no reduced-motion — see
 * ScrollProjects.tsx's useEnhancementMode). Animates transform/opacity/
 * clip-path only, matches the approved storyboard's beat timing 1:1.
 *
 * Returns `jumpToProgress`/`getActiveProject` so the component's nav
 * controls can drive real scroll positions — every `.sp-project` sits at
 * `position:absolute;inset:0` while pinned (they're stacked, not laid out
 * side by side), so `scrollIntoView` on a project element is a no-op: all
 * three report the identical bounding rect. The only way to "go to Nexus"
 * is to compute where in the pin's own scroll range that is and scroll the
 * real document there.
 */
export function useScrollProjectsGSAP({
  active,
  stageRef,
  wipeRef,
  progressBarRef,
  indexLabelRef,
  projectRefs,
  mediaRefs,
  projectIds,
}: Args) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!active) return;
    const stage = stageRef.current;
    const wipe = wipeRef.current;
    if (!stage || !wipe) return;

    const projects = projectRefs.current;
    const media = mediaRefs.current;
    const results = projects.map((p) => p?.querySelector<HTMLElement>(".sp-result") ?? null);

    const ctx = gsap.context(() => {
      // Initial state: only project 0 visible, only its first media beat shown.
      gsap.set(projects, { opacity: 0, autoAlpha: 0 });
      gsap.set(projects[0], { opacity: 1, autoAlpha: 1 });
      media.forEach((beats) => {
        // opacity:0 alone doesn't remove an element from the a11y tree —
        // aria-hidden on the 2 inactive beats does.
        gsap.set(beats, { opacity: 0, clipPath: "inset(0 100% 0 0)", attr: { "aria-hidden": "true" } });
        gsap.set(beats[0], { opacity: 1, clipPath: "inset(0 0% 0 0)", attr: { "aria-hidden": "false" } });
      });
      gsap.set(results, { opacity: 0, y: 8 });
      gsap.set(wipe, { xPercent: -100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: `+=${PIN_DURATION_VH}%`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (indexLabelRef.current) {
              const activeIdx = getActiveIndex(self.progress);
              indexLabelRef.current.textContent = `${String(activeIdx + 1).padStart(2, "0")}/${String(
                projectIds.length
              ).padStart(2, "0")}`;
            }
          },
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      // Beat positions below are authored as 0..1 fractions of the whole
      // sequence. Reserve that full [0,1] window as the very first thing
      // added to the timeline (empty target, no visual effect) so GSAP's
      // duration is exactly 1 from the start — ScrollTrigger snapshots the
      // timeline's duration when it's created, so fixing it up later with
      // .totalDuration() is too late to affect the scrub mapping.
      tl.to({}, { duration: 1 });

      projectIds.forEach((id, i) => {
        const config = SCROLL_PROJECT_CONFIG[id];
        const beats = PROJECT_BEATS[i];
        const projectEl = projects[i];
        const [m0, m1, m2] = media[i];
        const resultEl = results[i];
        if (!projectEl || !m0 || !m1 || !m2) return;

        const enterFromX = config.side === "left" ? -6 : 6;
        const driftX = config.side === "left" ? 2.5 : -2.5;

        // Accent laranja/azul/laranja — troca no exato instante em que o
        // corte troca o projeto visível (meio do cut anterior), não no
        // início da abertura — senão o índice mostra a cor errada por um
        // instante enquanto o projeto novo já está visível. Nunca usa verde
        // (reservado pro resultado/CTA).
        const accentSwitchAt = i === 0 ? beats.enter[0] : CUT_BEATS[i - 1][0] + (CUT_BEATS[i - 1][1] - CUT_BEATS[i - 1][0]) * 0.5;
        tl.set(stage, { "--accent": ACCENT_HEX[config.accent] }, accentSwitchAt);

        // ENTER — imagem principal desliza minimamente do lado onde a
        // composição a posiciona (não um slide dramático, uma assentada).
        // NOTE: opacity is deliberately NOT part of this tween. m0 is already
        // opacity:1 by the time this plays — either from the initial
        // gsap.set (project 0, visible from progress 0) or from the cut
        // transition's autoAlpha:1 swap, which always lands *before*
        // beats.enter[0] (cut midpoint < next project's enter start). A
        // fromTo({opacity:0}) here would snap an already-visible image back
        // to invisible then fade it back in — a visible flash-to-blank on
        // every single project transition, including the very first one.
        tl.set(projectEl, { opacity: 1, autoAlpha: 1 }, beats.enter[0]);
        tl.fromTo(
          m0,
          { xPercent: enterFromX },
          { xPercent: 0, ease: EASE, duration: beats.enter[1] - beats.enter[0], immediateRender: false },
          beats.enter[0]
        );

        // READ — problema+solução já estão no DOM e ficam parados (ver
        // ProjectCopy); a única coisa que se move é a mídia, um deslocamento
        // lateral mínimo — não um reenquadre da mesma foto.
        tl.to(m0, { xPercent: driftX, ease: "none", duration: beats.read[1] - beats.read[0] }, beats.read[0]);

        // REVEAL ("prova visual") — máscara curta troca pro detalhe do
        // sistema. Corte, não crossfade: clip-path varre, só então o
        // frame anterior some.
        const revealDur = beats.reveal[1] - beats.reveal[0];
        tl.set(m1, { clipPath: "inset(0 100% 0 0)", opacity: 1, attr: { "aria-hidden": "false" } }, beats.reveal[0]);
        tl.to(
          m1,
          { clipPath: "inset(0 0% 0 0)", ease: "power2.inOut", duration: revealDur * 0.55 },
          beats.reveal[0] + revealDur * 0.1
        );
        tl.set(m0, { opacity: 0, attr: { "aria-hidden": "true" } }, beats.reveal[0] + revealDur * 0.65);

        // RESULT — sobreposição controlada revela a prova (troféu/CRM/build),
        // depois o valor de resultado (verde) entra. m2 has been hidden
        // (opacity:0) since setup and this is its first reveal, so — unlike
        // m0's enter — there's no pre-existing visible state to clash with.
        const resultDur = beats.result[1] - beats.result[0];
        tl.set(m2, { attr: { "aria-hidden": "false" } }, beats.result[0]);
        tl.fromTo(
          m2,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, ease: EASE, duration: resultDur * 0.5, immediateRender: false },
          beats.result[0]
        );
        tl.set(m1, { opacity: 0, attr: { "aria-hidden": "true" } }, beats.result[0] + resultDur * 0.35);
        if (resultEl) {
          tl.fromTo(
            resultEl,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: resultDur * 0.4, immediateRender: false },
            beats.result[0] + resultDur * 0.45
          );
        }

        // will-change only while this project's media is actually animating
        tl.set(m0, { willChange: "transform, opacity" }, beats.enter[0]);
        tl.set([m1, m2], { willChange: "auto" }, beats.enter[0]);
        tl.set(m1, { willChange: "clip-path, opacity" }, beats.reveal[0]);
        tl.set(m2, { willChange: "transform, opacity" }, beats.result[0]);
        const cleanupAt = i < 2 ? CUT_BEATS[i][1] : RELEASE_BEAT[0];
        tl.set([m0, m1, m2], { willChange: "auto" }, cleanupAt);
      });

      // Cuts between projects — corte seco (clip-path/solid wipe), direção
      // ligada à composição de destino (não alternância por alternância).
      CUT_BEATS.forEach((range, cutIdx) => {
        const fromEl = projects[cutIdx];
        const toEl = projects[cutIdx + 1];
        const toConfig = SCROLL_PROJECT_CONFIG[projectIds[cutIdx + 1]];
        const dir = toConfig.side === "left" ? -1 : 1; // wipe travels FROM this side
        const dur = range[1] - range[0];

        tl.set(wipe, { xPercent: dir * -100 }, range[0]);
        tl.to(wipe, { xPercent: 0, ease: "power1.in", duration: dur * 0.5 }, range[0]);
        tl.set(fromEl, { opacity: 0, autoAlpha: 0 }, range[0] + dur * 0.5);
        tl.set(toEl, { opacity: 1, autoAlpha: 1 }, range[0] + dur * 0.5);
        tl.to(wipe, { xPercent: dir * 100, ease: "power1.out", duration: dur * 0.5 }, range[0] + dur * 0.5);
      });
    }, stage);

    // ScrollTrigger measures start/end synchronously at creation time, but in
    // a SPA the component mounts long after the browser's own "load" event —
    // the automatic refresh-on-load that keeps traditional multi-page sites
    // accurate never fires here, so start/end stay at degenerate values
    // (0/undefined) until something else forces a recompute. A deferred
    // (rAF/setTimeout) refresh is unreliable here: browsers suspend rAF for
    // backgrounded/inactive tabs, and this section can easily mount while the
    // tab isn't focused. Refresh synchronously, right after setup, instead.
    // Scoped to this instance (not the static ScrollTrigger.refresh(), which
    // would re-measure every trigger on the page) so this never has side
    // effects on any other scroll-linked section.
    scrollTriggerRef.current?.refresh();

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [active, stageRef, wipeRef, progressBarRef, indexLabelRef, projectRefs, mediaRefs, projectIds]);

  /** Scrolls the real document to a given fraction (0..1) of the pin's own
   * scroll range. No-ops if the pin isn't currently active (e.g. mobile). */
  const jumpToProgress = useCallback((progress: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const getCurrentProgress = useCallback(() => scrollTriggerRef.current?.progress ?? 0, []);

  return { jumpToProgress, getCurrentProgress };
}
