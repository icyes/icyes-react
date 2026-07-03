/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/shared/components/AppLayout'
import { PageLoading } from '@/shared/components/PageLoading'
import { RouteErrorPage } from '@/pages/RouteErrorPage'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
)
const ForbiddenPage = lazy(() =>
  import('@/pages/ForbiddenPage').then((module) => ({ default: module.ForbiddenPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)
const TicketsPage = lazy(() =>
  import('@/pages/TicketsPage').then((module) => ({ default: module.TicketsPage })),
)

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(<DashboardPage />),
      },
      {
        path: '403',
        element: withSuspense(<ForbiddenPage />),
      },
      {
        path: 'tickets',
        element: withSuspense(<TicketsPage />),
      },
      {
        path: '*',
        element: withSuspense(<NotFoundPage />),
      },
    ],
  },
])
