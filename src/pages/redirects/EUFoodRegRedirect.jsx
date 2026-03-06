import { useEffect } from 'react'

export default function EUFoodRegRedirect() {
  useEffect(() => {
    window.location.href = 'https://foodsafetyintelligence.up.railway.app'
  }, [])
  return null
}
