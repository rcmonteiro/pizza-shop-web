import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()
  expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('filter by order by orderId', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('filter by order by Customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})

test('filter by order by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  expect(page.getByRole('cell', { name: 'order-16' })).toBeVisible()

  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()
  expect(tableRows).toHaveLength(10)

  // hack para corrigir o problema de tela em branco do playwright
  await page.waitForTimeout(2000)
})
