const WORDS_PER_MINUTE = 200

/**
 * Estima o tempo de leitura em minutos a partir do Markdown bruto. Remove
 * marcações comuns (code fences, links, imagens, headings) antes de contar
 * palavras, para não inflar a contagem com sintaxe.
 */
export function estimateReadingTime(markdown: string): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~-]/g, ' ')

  const wordCount = plainText.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}
