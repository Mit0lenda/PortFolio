import React from "react";

type TagProps = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
};

export const Tag: React.FC<TagProps> = ({ text, icon, className }) => {
  const classes = ["tag", className].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {icon ? <span className="tag-icon" aria-hidden="true">{icon}</span> : null}
      <span className="tag-text">{text}</span>
    </span>
  );
};
