import { expect, test } from '@playwright/test'

test('display month revenue', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('R$ 89,70', { exact: true })).toBeVisible()
  await expect(
    page.getByText('+6% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})

test('display month orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('1.245', { exact: true })).toBeVisible()
  await expect(
    page.getByText('+15% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})

test('display day orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('20', { exact: true })).toBeVisible()
  await expect(
    page.getByText('-5% em relação a ontem', { exact: true }),
  ).toBeVisible()
})

test('display month canceled orders', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page.getByText('103', { exact: true })).toBeVisible()
  await expect(
    page.getByText('+7% em relação ao mês passado', { exact: true }),
  ).toBeVisible()
})
