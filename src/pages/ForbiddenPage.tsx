import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

export function ForbiddenPage() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="当前账号没有访问这个页面的权限。"
      extra={
        <Button type="primary">
          <Link to="/">回到仪表盘</Link>
        </Button>
      }
    />
  )
}
