import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { App } from './App'

describe('App', () => {
  it('renders the PulseOps shell', async () => {
    render(<App />)

    expect(await screen.findByRole('link', { name: 'PulseOps 首页' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '团队工作台' })).toBeInTheDocument()
    expect(screen.getByText('最近工单')).toBeInTheDocument()
  })
})
