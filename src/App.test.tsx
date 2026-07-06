import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the PulseOps shell', async () => {
    render(<App />)

    expect(await screen.findByRole('link', { name: 'PulseOps 首页' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: '团队工作台' })).toBeInTheDocument()
    expect(await screen.findByText('最近工单')).toBeInTheDocument()
  })

  it('navigates to the tickets placeholder page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('link', { name: '工单列表' }))

    expect(await screen.findByRole('heading', { name: '工单列表' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('搜索标题或编号')).toBeInTheDocument()
  })

  it('logs out from the account dropdown', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('button', { name: '打开账号菜单' }))
    await user.click(await screen.findByText('退出登录'))

    expect(await screen.findByRole('heading', { name: '登录你的账号' })).toBeInTheDocument()
  })
})
