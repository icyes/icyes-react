import { Card, Col, Row, Space, Statistic, Table, Tag, Typography } from 'antd'
import type { TableProps } from 'antd'

const { Paragraph, Title } = Typography

type RecentTicket = {
  key: string
  ticketNo: string
  title: string
  priority: '高' | '中' | '低'
  status: '待处理' | '处理中' | '待验证'
}

const recentTickets: RecentTicket[] = [
  {
    key: '1',
    ticketNo: 'WEB-1024',
    title: '支付回调失败后缺少重试提示',
    priority: '高',
    status: '处理中',
  },
  {
    key: '2',
    ticketNo: 'OPS-238',
    title: '客服导出的工单列表缺少项目字段',
    priority: '中',
    status: '待验证',
  },
  {
    key: '3',
    ticketNo: 'APP-617',
    title: '移动端筛选条件刷新后丢失',
    priority: '中',
    status: '待处理',
  },
]

const columns: TableProps<RecentTicket>['columns'] = [
  {
    title: '编号',
    dataIndex: 'ticketNo',
    key: 'ticketNo',
    width: 120,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    width: 100,
    render: (priority: RecentTicket['priority']) => (
      <Tag color={priority === '高' ? 'red' : priority === '中' ? 'orange' : 'blue'}>
        {priority}
      </Tag>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
  },
]

export function DashboardPage() {
  return (
    <Space orientation="vertical" size={20} style={{ width: '100%' }}>
      <section>
        <Title level={2}>团队工作台</Title>
        <Paragraph type="secondary">
          跟踪工单吞吐、风险积压和本周处理趋势。当前页面是 Sprint 0 的应用壳基线。
        </Paragraph>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="待处理工单" value={42} suffix="个" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="本周完成" value={128} suffix="个" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="高优先级"
              value={9}
              suffix="个"
              styles={{ content: { color: '#dc2626' } }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="最近工单">
        <Table columns={columns} dataSource={recentTickets} pagination={false} />
      </Card>
    </Space>
  )
}
