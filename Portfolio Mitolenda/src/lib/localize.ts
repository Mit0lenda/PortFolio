import type { Language, LocalizedText } from "./types";

export const getLocalizedText = (value: LocalizedText, language: Language): string => value[language];
