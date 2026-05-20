import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../app/AuthProvider'

const ProtectedRoute = () => {
  const { isAuthenticated, status } = useAuth()
  const location = useLocation()

  if (status === 'idle') {
    return (
      <div className="page">
        <div className="panel">Checking your session...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
