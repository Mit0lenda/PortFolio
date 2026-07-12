import { describe, expect, it } from 'vitest'
import { slugify } from './slug'

describe('slugify', () => {
  it('remove acentos e converte para kebab-case', () => {
    expect(slugify('Como automatizei meu portfólio com n8n')).toBe(
      'como-automatizei-meu-portfolio-com-n8n',
    )
  })

  it('remove pontuação e símbolos', () => {
    expect(slugify('Ação & Reação: 100% Não-Testável!')).toBe('acao-reacao-100-nao-testavel')
  })

  it('colapsa espaços múltiplos e hífens duplicados', () => {
    expect(slugify('a   b---c')).toBe('a-b-c')
  })

  it('remove hífens nas bordas', () => {
    expect(slugify('-teste-')).toBe('teste')
  })

  it('retorna string vazia para entrada só com espaços/símbolos', () => {
    expect(slugify('   ')).toBe('')
    expect(slugify('!!!')).toBe('')
  })

  it('trunca em 200 caracteres', () => {
    const long = 'a'.repeat(300)
    expect(slugify(long).length).toBe(200)
  })
})
