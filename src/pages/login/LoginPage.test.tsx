import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { LoginPage } from './LoginPage'

function LocationProbe() {
  return <span data-testid="location">{useLocation().pathname}</span>
}

describe('LoginPage', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /登录/ }))

    expect(await screen.findByText('请输入邮箱地址')).toBeInTheDocument()
    expect(screen.getByText('请输入密码')).toBeInTheDocument()
  })

  it('submits valid credentials and enters the workspace', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
        <LocationProbe />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('邮箱地址'), 'admin@pulseops.com')
    await user.type(screen.getByLabelText('密码'), 'password')
    await user.click(screen.getByRole('button', { name: /登录/ }))
    await vi.runAllTimersAsync()

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/'))
    vi.useRealTimers()
  })
})
