"use client";

import { useEffect, useRef } from "react";

const MAX_TILT_DEG = 6;

/**
 * Bounded pointer-relative tilt for a card. Returns a ref to attach to the
 * card's root element; the transform is written directly via CSS custom
 * properties (--tilt-x/--tilt-y), no React state/re-renders involved.
 * No-op on touch devices or when reduced motion is requested.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const applyTilt = () => {
      rafId = null;
      el.style.setProperty("--tilt-x", `${latestX.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${latestY.toFixed(2)}deg`);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      latestY = (px - 0.5) * 2 * MAX_TILT_DEG; // left/right → rotateY
      latestX = -(py - 0.5) * 2 * MAX_TILT_DEG; // up/down → rotateX
      if (rafId === null) {
        rafId = requestAnimationFrame(applyTilt);
      }
    };

    const onPointerLeave = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };
  }, []);

  return ref;
}
