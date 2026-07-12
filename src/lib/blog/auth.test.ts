import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { NextRequest } from 'next/server'
import { isAuthorized } from './auth'

function makeRequest(authHeader?: string): NextRequest {
  const headers = new Headers()
  if (authHeader !== undefined) headers.set('authorization', authHeader)
  return { headers } as unknown as NextRequest
}

describe('isAuthorized', () => {
  const ORIGINAL_SECRET = process.env.BLOG_WEBHOOK_SECRET

  beforeEach(() => {
    process.env.BLOG_WEBHOOK_SECRET = 'super-secret-value'
  })

  afterEach(() => {
    process.env.BLOG_WEBHOOK_SECRET = ORIGINAL_SECRET
  })

  it('autoriza quando o Bearer token bate com o secret', () => {
    expect(isAuthorized(makeRequest('Bearer super-secret-value'))).toBe(true)
  })

  it('rejeita token incorreto', () => {
    expect(isAuthorized(makeRequest('Bearer valor-errado'))).toBe(false)
  })

  it('rejeita header ausente', () => {
    expect(isAuthorized(makeRequest())).toBe(false)
  })

  it('rejeita scheme diferente de Bearer', () => {
    expect(isAuthorized(makeRequest('Basic super-secret-value'))).toBe(false)
  })

  it('rejeita token de tamanho diferente sem lançar erro', () => {
    expect(isAuthorized(makeRequest('Bearer curto'))).toBe(false)
  })

  it('fail-closed quando BLOG_WEBHOOK_SECRET não está configurado', () => {
    delete process.env.BLOG_WEBHOOK_SECRET
    expect(isAuthorized(makeRequest('Bearer super-secret-value'))).toBe(false)
  })
})
