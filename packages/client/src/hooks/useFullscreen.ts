import { useEffect, useState } from 'react'

export const useFullscreen = () => {
  const [enabled, setEnabled] = useState<boolean>(false)

  const toggle = () => setEnabled(e => !e)

  useEffect(() => {
    const exit = () => {
      setEnabled(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', exit)

    return () => {
      document.removeEventListener('fullscreenchange', exit)
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
  }, [enabled])

  return { enabled, toggle }
}
