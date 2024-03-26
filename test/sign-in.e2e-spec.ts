import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('valid-user@domain.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail',
  )

  await expect(toast).toBeVisible()
})

test('sign in with invalid credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('invalid-user@domain.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Usuário não encontrado')

  await expect(toast).toBeVisible()
})

test('go to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  await expect(page.url()).toContain('/sign-up')
})
