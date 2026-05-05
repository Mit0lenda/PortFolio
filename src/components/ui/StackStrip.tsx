import React from "react";

const ITEMS = ["React", "TypeScript", "Node.js", "Python", "n8n", "Supabase", "MySQL", "Azure", "JWT", "OAuth2", "GSAP", "Java"];

export const StackStrip: React.FC = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="strip">
      <div className="track">
        {row.map((x, i) => (
          <React.Fragment key={i}>
            <span className="item">{x}</span>
            <span className="sep">//</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
