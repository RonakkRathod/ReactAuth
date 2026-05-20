import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section className="page">
    <div className="panel">
      <p className="eyebrow">404</p>
      <h2>Page not found</h2>
      <p className="subtle">This route is not part of the console.</p>
      <Link className="text-link" to="/dashboard/profile">
        Go to profile
      </Link>
    </div>
  </section>
)

export default NotFoundPage
