import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Bill Gates')
  await page.getByLabel('Seu e-mail').fill('valid-user@domain.com')
  await page.getByLabel('Seu celular').fill('+55 1234 8975')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso')

  expect(toast).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('sign up with invalid credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do estabelecimento').fill('Beer Shop')
  await page.getByLabel('Seu nome').fill('Bill Gates')
  await page.getByLabel('Seu e-mail').fill('valid-user@domain.com')
  await page.getByLabel('Seu celular').fill('+55 1234 8975')
  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar estabelecimento')

  expect(toast).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('go to sign-in page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Já tem uma conta?' }).click()

  expect(page.url()).toContain('/sign-in')

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})
