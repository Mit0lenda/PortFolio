import React from "react";
import { useLanguage } from "../../app/LanguageProvider";
import { useCopy } from "../../lib/useCopy";

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const copy = useCopy();

  return (
    <div className="toggle-group" role="group" aria-label={copy.nav.languageLabel}>
      <button
        type="button"
        className={`toggle-button ${language === "en" ? "is-active" : ""}`}
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`toggle-button ${language === "pt" ? "is-active" : ""}`}
        aria-pressed={language === "pt"}
        onClick={() => setLanguage("pt")}
      >
        PT-BR
      </button>
    </div>
  );
};
