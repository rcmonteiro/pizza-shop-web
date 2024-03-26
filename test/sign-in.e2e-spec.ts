import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('valid-user@domain.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail',
  )

  expect(toast).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('sign in with invalid credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('invalid-user@domain.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Usuário não encontrado')

  expect(toast).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('go to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})
