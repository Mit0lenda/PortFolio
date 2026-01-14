import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = (): null => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};
