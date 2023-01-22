import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useFullscreen } from '../../../hooks/useFullscreen'
import { Canvas } from '../types'

export const useCanvas = () => {
  const fullscreen = useFullscreen()
  const canvasElement = useRef<HTMLCanvasElement>(null)
  const { current: canvas } = useRef<Canvas>({ width: 0, height: 0 })

  const updateCanvasSize = () => {
    if (canvasElement.current === null) return

    const { width } = document.body.getBoundingClientRect()

    canvasElement.current.width = width * 0.95
    canvasElement.current.height = (width * 0.95) / 1.78

    canvas.width = width * 0.95
    canvas.height = (width * 0.95) / 1.78
  }

  useLayoutEffect(() => {
    updateCanvasSize()

    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [fullscreen.enabled])

  return {
    canvasElement,
    canvas,
  } as const
}
