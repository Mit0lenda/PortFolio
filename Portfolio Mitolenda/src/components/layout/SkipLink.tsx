import React from "react";
import { useCopy } from "../../lib/useCopy";

export const SkipLink: React.FC = () => {
  const copy = useCopy();

  return (
    <a className="skip-link" href="#main-content">
      {copy.nav.skipToContent}
    </a>
  );
};
