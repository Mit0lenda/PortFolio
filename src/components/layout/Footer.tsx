import React from "react";
import { useCopy } from "../../lib/useCopy";
import { site } from "../../lib/site";

export const Footer: React.FC = () => {
  const copy = useCopy();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p className="footer-note">{copy.footer.note}</p>
        <div className="footer-actions">
          <a
            href={site.instagram}
            className="text-link"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram @dev_mitolenda
          </a>
          <p className="footer-meta">{new Date().getFullYear()} {copy.brand.name}</p>
        </div>
      </div>
    </footer>
  );
};
