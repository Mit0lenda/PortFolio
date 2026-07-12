import { describe, expect, it } from 'vitest'
import { estimateReadingTime } from './readingTime'

describe('estimateReadingTime', () => {
  it('retorna no mínimo 1 minuto para textos curtos', () => {
    expect(estimateReadingTime('Um texto bem curto.')).toBe(1)
  })

  it('calcula ~200 palavras por minuto', () => {
    const words = Array(420).fill('palavra').join(' ')
    expect(estimateReadingTime(words)).toBe(3)
  })

  it('ignora sintaxe de code fences, links e imagens na contagem', () => {
    const markdown = '# Título\n\n![alt](img.png) [texto](https://x.com) ```\ncode block aqui\n```'
    // "Título" + "texto" ≈ 2 palavras relevantes → ainda 1 minuto
    expect(estimateReadingTime(markdown)).toBe(1)
  })
})
