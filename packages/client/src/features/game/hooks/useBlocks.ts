import { useCallback, useEffect, useRef, useState } from 'react'
import { level } from '../data'
import { GameStatus, Position } from '../types'

export const useBlocks = ({
  canvas,
  x,
  frame,
  status,
}: {
  canvas: HTMLCanvasElement | null
  x: number
  frame: number
  status: GameStatus
}) => {
  const [initialBlocksLength, setInitialBlocksLength] = useState(0)
  const blocks = useRef<Position[]>([])
  const createLevel = useCallback(() => {
    if (!canvas) return []

    return (blocks.current = level
      .map(([t, d]) => {
        const width = canvas.width / 20

        return [
          {
            // top
            x: canvas.width,
            y: 0,
            h: (canvas.width / 100) * t,
            w: width,
          },
          {
            // down
            x: canvas.width - width * 2,
            y: canvas.height - (canvas.width / 100) * d,
            h: (canvas.width / 100) * d,
            w: width,
          },
        ]
      })
      .flat()
      .map((block: Position, i) => {
        return {
          ...block,
          x: block.x + block.w * 2 * i,
        }
      }))
  }, [canvas])

  useEffect(() => {
    setInitialBlocksLength(createLevel().length)
  }, [canvas])

  useEffect(() => {
    if (status !== 'run') return

    blocks.current = blocks.current
      .map(block => {
        return {
          ...block,
          x: block.x - x,
        }
      })
      .filter(({ x, w }) => x + w > 0)
  }, [frame, status])

  return {
    blocks,
    createLevel,
    initialBlocksLength,
  } as const
}