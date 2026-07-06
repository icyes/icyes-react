import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ForbiddenPage } from './forbidden/ForbiddenPage'
import { NotFoundPage } from './not-found/NotFoundPage'

describe('route feedback pages', () => {
  it('renders the 403 page', () => {
    render(
      <MemoryRouter>
        <ForbiddenPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('403')).toBeInTheDocument()
    expect(screen.getByText('当前账号没有访问这个页面的权限。')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '回到仪表盘' })).toHaveAttribute('href', '/')
  })

  it('renders the 404 page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('当前页面不存在或已被移动。')).toBeInTheDocument()
  })
})
