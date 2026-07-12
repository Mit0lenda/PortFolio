import { test, expect } from '@playwright/test'

test.describe('blog — listagem', () => {
  test('carrega sem erro de console e mostra algum estado (posts, vazio ou erro)', async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !/Failed to load resource/.test(msg.text())) {
        errors.push(msg.text())
      }
    })

    await page.goto('/blog')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    // A página sempre deve estar em um destes três estados — nunca em branco.
    const hasCards = await page.locator('.blog-card').count()
    const hasEmpty = await page.locator('.blog-empty').count()
    const hasError = await page.locator('.blog-error').count()
    expect(hasCards + hasEmpty + hasError).toBeGreaterThan(0)

    expect(errors).toEqual([])
  })

  test('card de post leva ao artigo correspondente', async ({ page }) => {
    await page.goto('/blog')
    const firstCard = page.locator('.blog-card').first()

    if ((await firstCard.count()) === 0) {
      test.skip(true, 'Nenhum post publicado no ambiente de teste — ver seed documentado no README/PR.')
    }

    const href = await firstCard.getAttribute('href')
    await firstCard.click()
    await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    // Markdown sanitizado nunca deve deixar vazar uma tag <script> real no artigo.
    await expect(page.locator('.article script')).toHaveCount(0)
  })
})

test('artigo inexistente mostra página não encontrada', async ({ page }) => {
  await page.goto('/blog/este-slug-com-certeza-nao-existe-em-nenhum-ambiente')
  await expect(page.getByText(/página.*não encontrada|não foi possível carregar/i)).toBeVisible()
})

test.describe('home — seção de conteúdos', () => {
  test('se presente, a seção de blog leva para /blog', async ({ page }) => {
    await page.goto('/')
    const link = page.getByRole('link', { name: /ver todos os conteúdos/i })

    if ((await link.count()) === 0) {
      test.skip(true, 'Nenhum post publicado — seção de blog não renderiza na home (comportamento esperado).')
    }

    await link.click()
    await expect(page).toHaveURL(/\/blog$/)
  })
})
