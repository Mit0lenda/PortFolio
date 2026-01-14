import React from "react";

type HighlightTextProps = {
  text: string;
  highlightClassName?: string;
};

const isHighlightedToken = (segment: string) =>
  segment.startsWith("[") && segment.endsWith("]");

export const stripHighlightTokens = (text: string) =>
  text.replace(/\[([^\]]+)\]/g, "$1");

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlightClassName = "text-accent",
}) => {
  const segments = text.split(/(\[[^\]]+\])/g).filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        if (isHighlightedToken(segment)) {
          return (
            <span key={`${segment}-${index}`} className={highlightClassName}>
              {segment.slice(1, -1)}
            </span>
          );
        }

        return (
          <React.Fragment key={`${segment}-${index}`}>
            {segment}
          </React.Fragment>
        );
      })}
    </>
  );
};
