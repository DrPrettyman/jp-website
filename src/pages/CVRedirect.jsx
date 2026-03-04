import { useEffect } from 'react'

export default function CVRedirect() {
  useEffect(() => {
    window.location.href = '/cv/two_page/JPrettymanCV.pdf'
  }, [])
  return null
}
