import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { loginWithEmail } from '../services/authService'
import { clearSession, loadSession, saveSession } from '../utils/storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  useEffect(() => {
    const session = loadSession()
    if (session?.token && session?.user) {
      setUser(session.user)
      setToken(session.token)
    }
    setStatus('ready')
  }, [])

  const login = useCallback(async ({ email, password }) => {
    setStatus('loading')
    setError(null)

    try {
      const session = await loginWithEmail(email, password)
      setUser(session.user)
      setToken(session.token)
      saveSession({ user: session.user, token: session.token })
      setStatus('ready')
      return { ok: true }
    } catch (loginError) {
      setStatus('ready')
      setError(loginError.message)
      return { ok: false, message: loginError.message }
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    setToken(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      error,
      login,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token, status, error, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }
  return context
}
