import { AUTH_STORAGE_KEY } from './constants'

export const loadSession = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      return null
    }
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const saveSession = (session) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

export const clearSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
