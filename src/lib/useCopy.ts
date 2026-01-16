import { copyEn } from "../content/copy.en";
import { copyPt } from "../content/copy.pt";
import { useLanguage } from "../app/LanguageProvider";
import type { Copy } from "./types";

export const useCopy = (): Copy => {
  const { language } = useLanguage();
  return language === "pt" ? copyPt : copyEn;
};
