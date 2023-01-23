import { useCallback, useRef } from 'react'
import { GameStatus } from '../types'
import forest from '/background/forest.png'

export const useBackground = () => {
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

      const { width, height } = canvas
      const background1 = new Image()
      const background2 = new Image()
      background1.src = forest
      background2.src = forest

      ctx.globalAlpha = 0.7
      ctx.drawImage(
        background1,
        backgroundPosition.current.first,
        0,
        width,
        height
      )
      ctx.drawImage(
        background2,
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