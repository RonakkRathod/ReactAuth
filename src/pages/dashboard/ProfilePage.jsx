import { useAuth } from '../../app/AuthProvider'
import StatusBanner from '../../components/StatusBanner'

const ProfilePage = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="page">
        <StatusBanner message="No profile data available." variant="warning" />
      </div>
    )
  }

  return (
    <section className="page">
      <div className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">User profile</p>
            <h2>Your profile</h2>
          </div>
          <span className="pill">Active</span>
        </div>

        <div className="profile-grid">
          <div>
            <p className="label">Name</p>
            <p>{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <p className="label">Username</p>
            <p>{user.username}</p>
          </div>
          <div>
            <p className="label">Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="label">Phone</p>
            <p>{user.phone}</p>
          </div>
          <div>
            <p className="label">Birth date</p>
            <p>{user.birthDate}</p>
          </div>
          <div>
            <p className="label">Company</p>
            <p>{user.company?.name || 'Not available'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
