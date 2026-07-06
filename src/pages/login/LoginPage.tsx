import {
  ArrowRightOutlined,
  CheckCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateFilled,
} from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './LoginPage.css'

const { Link, Paragraph, Text, Title } = Typography

type LoginValues = {
  email: string
  password: string
  remember?: boolean
}

export function LoginPage() {
  const [submitting, setSubmitting] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setSubmitting(false)
    void message.success('登录成功，欢迎回来')
    void navigate('/')
  }

  return (
    <main className="login-page">
      <section className="login-page__showcase" aria-label="PulseOps 产品介绍">
        <div className="login-page__glow login-page__glow--top" />
        <div className="login-page__glow login-page__glow--bottom" />
        <div className="login-page__showcase-content">
          <div className="login-page__brand login-page__brand--light">
            <span className="login-page__brand-mark">P</span>
            <span>PulseOps</span>
          </div>

          <div className="login-page__hero">
            <Text className="login-page__eyebrow">让协作始终清晰可见</Text>
            <Title level={1}>
              让每一个问题，
              <br />
              都有清晰的答案。
            </Title>
            <Paragraph>
              从客户反馈到线上故障，PulseOps 帮助团队统一管理、协同处理，并持续推动工作向前。
            </Paragraph>

            <div className="login-page__features">
              <div>
                <CheckCircleFilled /> 实时追踪工单状态与负责人
              </div>
              <div>
                <CheckCircleFilled /> 聚合团队协作与处理记录
              </div>
              <div>
                <CheckCircleFilled /> 用数据发现瓶颈，提升效率
              </div>
            </div>
          </div>

          <div className="login-page__trust">
            <SafetyCertificateFilled />
            <span>
              <strong>企业级安全保障</strong>
              <small>数据加密传输，操作全程可追溯</small>
            </span>
          </div>
        </div>
      </section>

      <section className="login-page__panel">
        <div className="login-page__panel-inner">
          <div className="login-page__mobile-brand login-page__brand">
            <span className="login-page__brand-mark">P</span>
            <span>PulseOps</span>
          </div>

          <header className="login-page__heading">
            <Text className="login-page__welcome">欢迎回来</Text>
            <Title level={2}>登录你的账号</Title>
            <Paragraph>输入账号信息，继续进入团队工作台。</Paragraph>
          </header>

          <Form<LoginValues>
            layout="vertical"
            requiredMark={false}
            initialValues={{ remember: true }}
            onFinish={() => void handleSubmit()}
            className="login-page__form"
          >
            <Form.Item
              label="邮箱地址"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱地址' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined />}
                placeholder="name@company.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少需要 6 个字符' },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                suffix={
                  <button
                    type="button"
                    className="login-page__password-toggle"
                    onClick={() => setPasswordVisible((visible) => !visible)}
                    aria-label={passwordVisible ? '隐藏密码' : '显示密码'}
                  >
                    {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                }
              />
            </Form.Item>

            <div className="login-page__options">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我的登录状态</Checkbox>
              </Form.Item>
              <Link onClick={() => void message.info('请联系系统管理员重置密码')} role="button">
                忘记密码？
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
              className="login-page__submit"
            >
              登录 <ArrowRightOutlined />
            </Button>
          </Form>

          <div className="login-page__signup">
            还没有账号？{' '}
            <Link onClick={() => void message.info('请联系团队管理员开通账号')}>申请加入团队</Link>
          </div>
        </div>

        <footer className="login-page__footer">
          <span>© 2026 PulseOps</span>
          <span>
            <a href="/privacy">隐私政策</a>
            <a href="/terms">服务条款</a>
          </span>
        </footer>
      </section>
    </main>
  )
}
