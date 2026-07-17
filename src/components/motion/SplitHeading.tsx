"use client";

import React from "react";
import { Reveal } from "./Reveal";

type SplitHeadingProps = {
  eyebrow?: React.ReactNode;
  eyebrowClassName?: string;
  heading: React.ReactNode;
  headingAs?: "h2" | "h3";
  headingClassName?: string;
  desc?: React.ReactNode;
  descClassName?: string;
  className?: string;
};

/**
 * Staggers the eyebrow → heading → description of a section head as they
 * scroll into view. Blocks that already exist in the markup, not a
 * word-by-word split — per-word splitting would mean re-injecting DOM after
 * hydration, which risks a11y/SEO regressions for very little visual payoff
 * on single-line section headings.
 */
export const SplitHeading: React.FC<SplitHeadingProps> = ({
  eyebrow,
  eyebrowClassName = "eyebrow",
  heading,
  headingAs = "h2",
  headingClassName,
  desc,
  descClassName,
  className,
}) => {
  const Heading = headingAs;

  return (
    <Reveal as="div" className={className} stagger staggerDelay={0.12}>
      {eyebrow && (
        <Reveal.Item as="span" className={eyebrowClassName}>
          {eyebrow}
        </Reveal.Item>
      )}
      <Reveal.Item as="div">
        <Heading className={headingClassName}>{heading}</Heading>
      </Reveal.Item>
      {desc && (
        <Reveal.Item as="div" className={descClassName}>
          {desc}
        </Reveal.Item>
      )}
    </Reveal>
  );
};
