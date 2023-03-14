import { useEffect, useState } from 'react'
import { useSet, useStore } from '../app/store/hooks'
import { updateFullscreen } from '../features/game/services/gameSlice'

export const useFullscreen = () => {
  const fullscreen = useStore(s => s.game.fullscreen)
  const set = useSet()

  useEffect(() => {
    const exit = () => {
      set(updateFullscreen(Boolean(document.fullscreenElement)))
    }

    document.addEventListener('fullscreenchange', exit)

    return () => {
      document.removeEventListener('fullscreenchange', exit)
    }
  }, [])

  useEffect(() => {
    if (fullscreen) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
  }, [fullscreen])

  return { fullscreen }
}
