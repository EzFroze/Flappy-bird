import { useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, Position } from '../types'

export const useLevels = (canvasSize: Canvas, levels: number[][][]) => {
  const [level, setLevel] = useState(0)

  const createLevel = useCallback(() => {
    return levels[level]
      .map(([top, down], i) => {
        return [
          { x: canvasSize.width + 150 * i, y: 0, w: 50, h: top },
          {
            x: canvasSize.width + 150 * i,
            y: canvasSize.height - down,
            w: 50,
            h: down,
          },
        ]
      })
      .reduce((arr, curr) => [...arr, ...curr], [])
  }, [level])

  const blocks = useRef<Position[]>(createLevel())

  const isLastLevel = level === levels.length - 1

  const restartLevel = () => {
    blocks.current = createLevel()
  }

  useEffect(() => {
    blocks.current = createLevel()
  }, [level])

  return {
    blocks,
    isLastLevel,
    level,
    setLevel,
    restartLevel,
  } as const
}
