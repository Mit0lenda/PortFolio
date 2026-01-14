import React from "react";
import { useCopy } from "../../lib/useCopy";

export const Footer: React.FC = () => {
  const copy = useCopy();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p className="footer-note">{copy.footer.note}</p>
        <p className="footer-meta">© {new Date().getFullYear()} {copy.brand.name}</p>
      </div>
    </footer>
  );
};
