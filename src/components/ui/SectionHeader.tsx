import React from "react";
import { HighlightText } from "./HighlightText";

type SectionHeaderProps = {
  title: string;
  intro?: string;
  id?: string;
  className?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, intro, id, className }) => (
  <div className={["section-header", className].filter(Boolean).join(" ")}>
    <h2 id={id} className="section-title">
      <HighlightText text={title} />
    </h2>
    {intro ? <p className="section-intro">{intro}</p> : null}
  </div>
);
