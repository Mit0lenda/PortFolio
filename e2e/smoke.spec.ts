import { test, expect } from '@playwright/test'

test.describe('home', () => {
  test('carrega sem erro de console', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      // Ignora falhas de carregamento de recurso de terceiros (ex.: widget do
      // Chatwoot sob carga de testes em paralelo) — foco em erros da própria app.
      if (msg.type() === 'error' && !/Failed to load resource/.test(msg.text())) {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('CTA de WhatsApp abre o link correto', async ({ page }) => {
    await page.goto('/')
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: 'Falar comigo →' }).click(),
    ])
    await expect(popup).toHaveURL(/whatsapp\.com|wa\.me/)
  })
})

test.describe('menu mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('abre, fecha, e é navegável por teclado', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('.nav-toggle')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    const firstLink = page.getByRole('link', { name: 'Serviços' })
    await expect(firstLink).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })
})

test.describe('formulário de contato', () => {
  test('caso válido mostra sucesso', async ({ page }) => {
    await page.goto('/#contato')
    await page.getByPlaceholder('Seu nome').fill('Teste Playwright')
    await page.getByPlaceholder('seu@email.com').fill('teste@example.com')
    await page
      .getByPlaceholder('Conte um pouco sobre seu projeto ou necessidade…')
      .fill('Preciso de um site institucional novo para minha empresa de consultoria.')
    await page.getByRole('button', { name: /quero conversar/i }).click()

    await expect(page.getByText(/mensagem recebida/i)).toBeVisible()
  })

  test('caso inválido mostra erro', async ({ page }) => {
    await page.goto('/#contato')
    await page.getByPlaceholder('Seu nome').fill('A')
    await page.getByPlaceholder('seu@email.com').fill('nao-e-um-email')
    await page
      .getByPlaceholder('Conte um pouco sobre seu projeto ou necessidade…')
      .fill('oi')
    await page.getByRole('button', { name: /quero conversar/i }).click()

    await expect(page.locator('.cf-error')).toBeVisible()
  })
})

test('página 404 existe', async ({ page }) => {
  const response = await page.goto('/pagina-que-nao-existe')
  expect(response?.status()).toBe(404)
})

test('página de serviço carrega', async ({ page }) => {
  await page.goto('/servicos/criacao-de-sites')
  await expect(page.getByRole('heading', { name: 'Criação de Sites Profissionais' })).toBeVisible()
})
