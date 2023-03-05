import { useCallback, useEffect, useRef, useState } from 'react'
import { GameStatus } from '../types'
import forest from '/background/forest.png'

export const useBackground = () => {
  const [ background, setBackground ] = useState<HTMLImageElement>()

  useEffect(() => {
    const background = new Image()

    background.src = forest

    background.onload = () => {
      setBackground(background)
    }

  }, [])

  const backgroundPosition = useRef({
    first: 0,
    second: 0,
  })

  const renderBackground = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    status: GameStatus  
  ) => {
    if (!canvas) return
    if (!background) return

    const { width, height } = canvas

    ctx.globalAlpha = 0.7
    ctx.drawImage(
      background,
      backgroundPosition.current.first,
      0,
      width,
      height
    )
    ctx.drawImage(
      background,
      backgroundPosition.current.second,
      0,
      width,
      height
    )
    ctx.globalAlpha = 1

    if (['run', 'start', 'finish'].includes(status)) {
      // бесконечная прокрутка
      backgroundPosition.current.first -= 1
      backgroundPosition.current.second -= 1

      if (backgroundPosition.current.second === 0) {
        backgroundPosition.current.first = 0
        backgroundPosition.current.second = width
      }
    }
  }

  return {
    backgroundPosition,
    renderBackground,
  } as const
}
