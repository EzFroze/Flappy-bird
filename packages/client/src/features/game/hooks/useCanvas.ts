import { useEffect, useRef } from 'react'
import { useFullscreen } from '../../../hooks/useFullscreen'

export const useCanvas = () => {
  const fullscreen = useFullscreen()
  const canvas = useRef<HTMLCanvasElement | null>(null)

  const updateCanvasSize = () => {
    if (canvas.current === null) return

    const { width } = document.body.getBoundingClientRect()

    canvas.current.width = width * 0.95
    canvas.current.height = (width * 0.95) / 1.78
  }

  useEffect(() => {
    updateCanvasSize()

    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [fullscreen])

  return canvas
}
