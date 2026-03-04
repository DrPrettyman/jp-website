import { useEffect } from 'react'

export default function PLDashboardRedirect() {
  useEffect(() => {
    window.location.href = 'https://pl-dashboard-production.up.railway.app'
  }, [])
  return null
}
