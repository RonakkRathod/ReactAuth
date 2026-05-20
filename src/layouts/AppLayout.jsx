import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../app/AuthProvider'

const AppLayout = () => {
  const { user, logout } = useAuth()
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'Account'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">ReactAuth</p>
          <h1 className="app-title">Commerce Console</h1>
          <p className="subtle">Signed in as {displayName}</p>
        </div>
        <nav className="app-nav">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link${isActive ? ' active' : ''}`
            }
          >
            Products
          </NavLink>
          <button type="button" className="ghost-button" onClick={logout}>
            Log out
          </button>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
