import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginPage } from './LoginPage'

function LocationProbe() {
  return <span data-testid="location">{useLocation().pathname}</span>
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /登录/ }))

    expect(await screen.findByText('请输入账号')).toBeInTheDocument()
    expect(screen.getByText('请输入密码')).toBeInTheDocument()
  })

  it('submits valid credentials and enters the workspace', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          accessToken: 'test-token',
          tokenType: 'Bearer',
          expiresIn: 86400,
          user: {
            id: 1,
            username: 'admin',
            email: 'admin@pulseops.com',
            phone: null,
            nickname: '管理员',
            avatarUrl: null,
            roles: ['ADMIN'],
            permissions: [],
          },
        }),
    })
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
        <LocationProbe />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('账号'), 'admin@pulseops.com')
    await user.type(screen.getByLabelText('密码'), 'password')
    await user.click(screen.getByRole('button', { name: /登录/ }))

    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('/'))
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'admin@pulseops.com', password: 'password' }),
      }),
    )
    expect(localStorage.getItem('pulseops_token')).toBe('test-token')
  })

  it('shows the backend error when credentials are invalid', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ message: 'Invalid username or password' }),
      }),
    )
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
        <LocationProbe />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText('账号'), 'admin')
    await user.type(screen.getByLabelText('密码'), 'incorrect')
    await user.click(screen.getByRole('button', { name: /登录/ }))

    expect(await screen.findByText('账号或密码错误')).toBeInTheDocument()
    expect(screen.getByTestId('location')).toHaveTextContent('/login')
    expect(localStorage.getItem('pulseops_token')).toBeNull()
  })
})
