"use client";

import { useEffect, useRef } from "react";

const MAX_TILT_DEG = 6;

type UseTiltOptions = {
  /** Rotate the element with pointer-relative tilt. Default true. */
  tilt?: boolean;
  /** Write a --spot-x/--spot-y pointer position for a cursor-following glow overlay. Default true. */
  spotlight?: boolean;
};

/**
 * Bounded pointer-relative tilt and/or cursor-spotlight for a card. Returns a
 * ref to attach to the card's root element; everything is written directly
 * via CSS custom properties (--tilt-x/--tilt-y, --spot-x/--spot-y), no React
 * state/re-renders involved, one shared rAF loop and pointer listener pair
 * for both effects. No-op on touch devices or when reduced motion is
 * requested.
 */
export function useTilt<T extends HTMLElement>(options: UseTiltOptions = {}) {
  const { tilt = true, spotlight = true } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    let rafId: number | null = null;
    let latestTiltX = 0;
    let latestTiltY = 0;
    let latestSpotX = 50;
    let latestSpotY = 50;

    const applyTilt = () => {
      rafId = null;
      if (tilt) {
        el.style.setProperty("--tilt-x", `${latestTiltX.toFixed(2)}deg`);
        el.style.setProperty("--tilt-y", `${latestTiltY.toFixed(2)}deg`);
      }
      if (spotlight) {
        el.style.setProperty("--spot-x", `${latestSpotX.toFixed(1)}%`);
        el.style.setProperty("--spot-y", `${latestSpotY.toFixed(1)}%`);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      latestTiltY = (px - 0.5) * 2 * MAX_TILT_DEG; // left/right → rotateY
      latestTiltX = -(py - 0.5) * 2 * MAX_TILT_DEG; // up/down → rotateX
      latestSpotX = px * 100;
      latestSpotY = py * 100;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyTilt);
      }
    };

    const onPointerLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (tilt) {
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
      }
      if (spotlight) {
        el.style.setProperty("--spot-x", "50%");
        el.style.setProperty("--spot-y", "50%");
      }
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.style.removeProperty("--spot-x");
      el.style.removeProperty("--spot-y");
    };
  }, [tilt, spotlight]);

  return ref;
}
