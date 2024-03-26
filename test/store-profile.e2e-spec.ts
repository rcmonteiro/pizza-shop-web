import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  await page.getByLabel('Nome').fill('Pizza Shop Changed')
  await page.getByRole('button', { name: 'Salvar' }).click()
  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')
  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()
  await page.waitForTimeout(200)

  await expect(
    page.getByRole('button', { name: 'Pizza Shop Changed' }),
  ).toBeVisible()
})

test('update profile with errors', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()
  await page.getByLabel('Nome').fill('Invalid name')
  await page.getByRole('button', { name: 'Salvar' }).click()
  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Falha ao atualizar o perfil, tente novamente!')
  await expect(toast).toBeVisible()
})
