/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/shared/components/app-layout/AppLayout'
import { PageLoading } from '@/shared/components/page-loading/PageLoading'
import { RouteErrorPage } from '@/pages/route-error/RouteErrorPage'

const DashboardPage = lazy(() =>
  import('@/pages/dashboard/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)
const ForbiddenPage = lazy(() =>
  import('@/pages/forbidden/ForbiddenPage').then((module) => ({
    default: module.ForbiddenPage,
  })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)
const TicketsPage = lazy(() =>
  import('@/pages/tickets/TicketsPage').then((module) => ({ default: module.TicketsPage })),
)
const LoginPage = lazy(() =>
  import('@/pages/login/LoginPage').then((module) => ({ default: module.LoginPage })),
)

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
    errorElement: <RouteErrorPage />,
  },
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
