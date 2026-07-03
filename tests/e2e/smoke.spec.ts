import { expect, test } from '@playwright/test'

test('opens the dashboard and navigates to tickets', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: '团队工作台' })).toBeVisible()

  await page.getByRole('link', { name: '工单列表' }).click()

  await expect(page.getByRole('heading', { name: '工单列表' })).toBeVisible()
  await expect(page.getByPlaceholder('搜索标题或编号')).toBeVisible()
})

test('shows the 403 and 404 feedback pages', async ({ page }) => {
  await page.goto('/403')

  await expect(page.getByText('当前账号没有访问这个页面的权限。')).toBeVisible()

  await page.goto('/missing-page')

  await expect(page.getByText('当前页面不存在或已被移动。')).toBeVisible()
})
