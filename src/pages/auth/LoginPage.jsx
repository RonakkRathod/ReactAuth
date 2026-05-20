import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FormField from '../../components/FormField'
import StatusBanner from '../../components/StatusBanner'
import { useAuth } from '../../app/AuthProvider'
import { isStrongEnoughPassword, isValidEmail } from '../../utils/validators'

const LoginPage = () => {
  const { login, isAuthenticated, status, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/dashboard/profile'

  const [form, setForm] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTo])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!isValidEmail(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!isStrongEnoughPassword(form.password)) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }
    setFormErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) {
      return
    }

    const result = await login({
      email: form.email,
      password: form.password,
    })

    if (!result.ok) {
      setSubmitError(result.message)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="login-shell">
      <div className="login-card">
        <div>
          <p className="eyebrow">Secure access</p>
          <h1>Welcome back</h1>
          <p className="subtle">
            Sign in with the email and password from the public users API.
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="username"
            error={formErrors.email}
          />
          <FormField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            autoComplete="current-password"
            error={formErrors.password}
          />
          <StatusBanner message={submitError || error} variant="error" />
          <button type="submit" className="primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
