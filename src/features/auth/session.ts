import type { AuthUser, LoginResponse } from './api'

const TOKEN_KEY = 'pulseops_token'
const USER_KEY = 'pulseops_user'

function getStorageWithToken(): Storage | null {
  if (localStorage.getItem(TOKEN_KEY)) return localStorage
  if (sessionStorage.getItem(TOKEN_KEY)) return sessionStorage
  return null
}

export function saveSession(session: LoginResponse, remember: boolean) {
  clearSession()
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(TOKEN_KEY, session.accessToken)
  storage.setItem(USER_KEY, JSON.stringify(session.user))
}

export function getAccessToken() {
  return getStorageWithToken()?.getItem(TOKEN_KEY) ?? null
}

export function getStoredUser(): AuthUser | null {
  const rawUser = getStorageWithToken()?.getItem(USER_KEY)
  if (!rawUser) return null

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    return null
  }
}

export function clearSession() {
  for (const storage of [localStorage, sessionStorage]) {
    storage.removeItem(TOKEN_KEY)
    storage.removeItem(USER_KEY)
  }
}
