import { Button, Result } from 'antd'
import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return error.statusText || '路由请求失败。'
  }

  if (error instanceof Error) {
    return error.message
  }

  return '页面加载时发生未知错误。'
}

export function RouteErrorPage() {
  const error = useRouteError()

  return (
    <Result
      status="500"
      title="页面出错了"
      subTitle={getErrorMessage(error)}
      extra={
        <Button type="primary">
          <Link to="/">回到仪表盘</Link>
        </Button>
      }
    />
  )
}
