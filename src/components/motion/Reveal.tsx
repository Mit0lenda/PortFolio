"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

type RevealTag = "div" | "span" | "ul" | "li" | "article" | "section" | "nav" | "a";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MOTION_TAGS: Record<RevealTag, React.ComponentType<any>> = {
  div: motion.div,
  span: motion.span,
  ul: motion.ul,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  nav: motion.nav,
  a: motion.a,
};

type RevealProps = {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** When true, renders as a stagger container — direct children should be <Reveal.Item>. */
  stagger?: boolean;
  staggerDelay?: number;
};

/**
 * Scroll-triggered fade/slide-up reveal. Fires once when ~20% of the element
 * enters the viewport. Skips straight to the visible state under
 * prefers-reduced-motion — Framer Motion's inline styles aren't reachable by
 * the CSS `prefers-reduced-motion` block, so this check has to happen in JS.
 */
function RevealBase({
  children,
  as = "div",
  className,
  style,
  delay = 0,
  stagger = false,
  staggerDelay = 0.08,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Static = as as keyof React.JSX.IntrinsicElements;
    return (
      <Static className={className} style={style}>
        {children}
      </Static>
    );
  }

  const Component = MOTION_TAGS[as];
  const containerVariants: Variants = stagger
    ? { hidden: {}, visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } } }
    : {
        hidden: defaultItemVariants.hidden,
        visible: { ...defaultItemVariants.visible, transition: { duration: 0.45, ease: EASE_OUT, delay } },
      };

  return (
    <Component
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      variants={containerVariants}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};

/**
 * Child of a `<Reveal stagger>` container — inherits the parent's stagger
 * timing. Passes any extra props (href, onClick, style, target...) straight
 * through, so this can BE a card's root element rather than wrap it in an
 * extra div.
 */
const RevealItem = React.forwardRef<HTMLElement, RevealItemProps>(function RevealItem(
  { children, as = "div", className, ...rest },
  ref
) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Static = as as any;
    return (
      <Static className={className} ref={ref} {...rest}>
        {children}
      </Static>
    );
  }

  const Component = MOTION_TAGS[as as RevealTag];
  return (
    <Component ref={ref} className={className} variants={defaultItemVariants} {...rest}>
      {children}
    </Component>
  );
});

type RevealComponent = typeof RevealBase & { Item: typeof RevealItem };

export const Reveal = RevealBase as RevealComponent;
Reveal.Item = RevealItem;
