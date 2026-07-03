import {
  LockOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Grid, Layout, Menu, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import './AppLayout.css'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: <Link to="/">仪表盘</Link>,
  },
  {
    key: '/tickets',
    icon: <UnorderedListOutlined />,
    label: <Link to="/tickets">工单列表</Link>,
  },
  {
    key: '/403',
    icon: <LockOutlined />,
    label: <Link to="/403">权限示例</Link>,
  },
]

const routeTitles = new Map([
  ['/', '仪表盘'],
  ['/tickets', '工单列表'],
  ['/403', '无权访问'],
])

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const screens = Grid.useBreakpoint()
  const location = useLocation()
  const selectedKey = routeTitles.has(location.pathname) ? location.pathname : '/'
  const pageTitle = routeTitles.get(location.pathname) ?? '页面不存在'
  const isDesktop = screens.lg !== false

  const breadcrumbItems = useMemo(
    () => [
      {
        title: <Link to="/">PulseOps</Link>,
      },
      {
        title: pageTitle,
      },
    ],
    [pageTitle],
  )

  return (
    <Layout className="app-shell">
      <Sider
        className="app-shell__sider"
        breakpoint="lg"
        collapsedWidth={screens.lg ? 72 : 0}
        collapsible
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          setCollapsed(broken)
        }}
        trigger={null}
      >
        <Link className="app-shell__brand" to="/" aria-label="PulseOps 首页">
          <span className="app-shell__brand-mark">P</span>
          {!collapsed && <span className="app-shell__brand-name">PulseOps</span>}
        </Link>
        <Menu
          className="app-shell__menu"
          mode="inline"
          theme="dark"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={() => {
            if (!isDesktop) {
              setCollapsed(true)
            }
          }}
        />
      </Sider>
      <Layout>
        <Header className="app-shell__header">
          <Space size={16}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? '展开侧边栏' : '折叠侧边栏'}
            />
            <div>
              <Breadcrumb items={breadcrumbItems} />
              <Text strong className="app-shell__title">
                {pageTitle}
              </Text>
            </div>
          </Space>
          <Space size={12}>
            <Button type="text" icon={<SettingOutlined />} aria-label="系统设置" />
            <Avatar className="app-shell__avatar">K</Avatar>
            <Text strong>管理员</Text>
          </Space>
        </Header>
        <Content className="app-shell__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
