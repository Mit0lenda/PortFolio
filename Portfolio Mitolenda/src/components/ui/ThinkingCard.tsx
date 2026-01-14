import React from "react";

type ThinkingCardProps = {
  title: string;
  body: string;
  icon: React.ReactNode;
  highlights?: string[];
  style?: React.CSSProperties;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const renderHighlightedTitle = (title: string, highlights: string[]) => {
  if (highlights.length === 0) {
    return title;
  }

  const pattern = highlights.map(escapeRegExp).join("|");
  if (!pattern) {
    return title;
  }

  const regex = new RegExp(`(${pattern})`, "gi");

  return title.split(regex).map((part, index) => {
    const isHighlighted = highlights.some((word) => word.toLowerCase() === part.toLowerCase());
    if (!isHighlighted) {
      return part;
    }

    return (
      <span key={`${part}-${index}`} className="thinking-card-highlight">
        {part}
      </span>
    );
  });
};

export const ThinkingCard: React.FC<ThinkingCardProps> = ({
  title,
  body,
  icon,
  highlights = [],
  style,
}) => (
  <article className="card thinking-card" style={style}>
    <div className="thinking-card-icon" aria-hidden="true">
      {icon}
    </div>
    <h3 className="thinking-card-title">{renderHighlightedTitle(title, highlights)}</h3>
    <p>{body}</p>
  </article>
);
