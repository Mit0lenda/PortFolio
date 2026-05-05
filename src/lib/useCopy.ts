import { copyEn } from "../content/copy.en";
import { copyPt } from "../content/copy.pt";
import { copyEs } from "../content/copy.es";
import { useLanguage } from "../app/LanguageProvider";
import type { Copy } from "./types";

export const useCopy = (): Copy => {
  const { language } = useLanguage();
  if (language === "pt") return copyPt;
  if (language === "es") return copyEs;
  return copyEn;
};
