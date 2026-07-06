export type AuthUser = {
  id: number
  username: string
  email: string | null
  phone: string | null
  nickname: string | null
  avatarUrl: string | null
  roles: string[]
  permissions: string[]
}

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: number
  user: AuthUser
}

type ErrorResponse = {
  message?: string | string[]
}

const { VITE_API_BASE_URL } = import.meta.env as { readonly VITE_API_BASE_URL?: string }
const apiBaseUrl = (VITE_API_BASE_URL ?? '/api').replace(/\/$/, '')

const errorMessages: Record<string, string> = {
  'Invalid username or password': '账号或密码错误',
  'User is disabled': '当前账号已被停用，请联系管理员',
  'User is locked': '当前账号已被锁定，请稍后再试',
  'Username and password are required': '请输入账号和密码',
  'Session is invalid or expired': '登录状态已失效，请重新登录',
}

export class AuthApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AuthApiError'
    this.status = status
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as T | ErrorResponse | null

  if (response.ok) {
    return body as T
  }

  const bodyMessage = (body as ErrorResponse | null)?.message
  const rawMessage = Array.isArray(bodyMessage) ? bodyMessage.join('，') : bodyMessage
  const message = typeof rawMessage === 'string' ? rawMessage : '请求失败，请稍后重试'

  throw new AuthApiError(errorMessages[message] ?? message, response.status)
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  let response: Response

  try {
    response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
  } catch {
    throw new AuthApiError('无法连接认证服务，请检查服务是否已启动', 0)
  }

  return parseResponse<LoginResponse>(response)
}

export async function logout(accessToken: string): Promise<void> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    await parseResponse<{ success: true }>(response)
  } catch {
    // Local session cleanup must still succeed when the server is unavailable
  }
}
