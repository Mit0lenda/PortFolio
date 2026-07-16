"use client";

import { useEffect } from "react";

/**
 * Writes normalized (-1..1) pointer position to --mx/--my on <html>,
 * driving ambient parallax in CSS. Skips entirely on touch devices and
 * when the user has requested reduced motion — no listener is attached.
 */
export function useMousePosition() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    const root = document.documentElement;
    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const applyPosition = () => {
      rafId = null;
      root.style.setProperty("--mx", latestX.toFixed(4));
      root.style.setProperty("--my", latestY.toFixed(4));
    };

    const onPointerMove = (e: PointerEvent) => {
      latestX = (e.clientX / window.innerWidth) * 2 - 1;
      latestY = (e.clientY / window.innerHeight) * 2 - 1;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, []);
}
