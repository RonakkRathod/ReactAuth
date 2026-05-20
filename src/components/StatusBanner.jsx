const StatusBanner = ({ message, variant = 'info' }) => {
  if (!message) {
    return null
  }

  return <div className={`status-banner status-${variant}`}>{message}</div>
}

export default StatusBanner
