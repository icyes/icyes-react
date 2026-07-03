import { Card, Empty, Input, Select, Space, Typography } from 'antd'

const { Paragraph, Title } = Typography

export function TicketsPage() {
  return (
    <Space orientation="vertical" size={20} style={{ width: '100%' }}>
      <section>
        <Title level={2}>工单列表</Title>
        <Paragraph type="secondary">
          后续迭代会在这里接入 URL 筛选、分页、排序和 MSW 接口契约。
        </Paragraph>
      </section>

      <Card>
        <Space wrap>
          <Input.Search placeholder="搜索标题或编号" style={{ width: 260 }} />
          <Select
            placeholder="状态"
            style={{ width: 160 }}
            options={[
              { label: '待处理', value: 'todo' },
              { label: '处理中', value: 'doing' },
              { label: '待验证', value: 'review' },
              { label: '已完成', value: 'done' },
            ]}
          />
          <Select
            placeholder="优先级"
            style={{ width: 160 }}
            options={[
              { label: '高', value: 'high' },
              { label: '中', value: 'medium' },
              { label: '低', value: 'low' },
            ]}
          />
        </Space>
      </Card>

      <Card>
        <Empty description="暂无工单数据" />
      </Card>
    </Space>
  )
}
