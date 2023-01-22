import { useCallback, useEffect, useRef, useState } from 'react'
import { level } from '../data'
import { Canvas, GameStatus, Position } from '../types'

export const useBlocks = ({
  canvas,
  x,
  frame,
}: {
  canvas: Canvas
  x: number
  frame: number
  status: GameStatus
}) => {
  const blocks = useRef<Position[]>([])
  const createLevel = useCallback(() => {
    return (blocks.current = level
      .map(([t, d], i) => {
        const width = canvas.width / 20

        return [
          {
            // top
            x: canvas.width,
            y: 0,
            h: 100 * t,
            w: width,
          },
          {
            // down
            x: canvas.width - width * 2,
            y: canvas.height - 100 * d,
            h: 100 * d,
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
    createLevel()
  }, [canvas])

  useEffect(() => {
    blocks.current = blocks.current
      .map((block, i) => {
        return {
          ...block,
          x: block.x - x,
        }
      })
      .filter(({ x, w }) => x + w > 0)
  }, [frame])

  return {
    blocks,
    createLevel,
  } as const
}