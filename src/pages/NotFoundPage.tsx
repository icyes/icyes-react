import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="当前页面不存在或已被移动。"
      extra={
        <Button type="primary">
          <Link to="/">回到仪表盘</Link>
        </Button>
      }
    />
  )
}
