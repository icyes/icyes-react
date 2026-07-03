import { expect, test } from '@playwright/test'

test('opens the dashboard and navigates to tickets', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: '团队工作台' })).toBeVisible()

  await page.getByRole('link', { name: '工单列表' }).click()

  await expect(page.getByRole('heading', { name: '工单列表' })).toBeVisible()
  await expect(page.getByPlaceholder('搜索标题或编号')).toBeVisible()
})
