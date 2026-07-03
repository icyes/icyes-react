import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/shared/components/AppLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { TicketsPage } from '@/pages/TicketsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'tickets',
        element: <TicketsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
