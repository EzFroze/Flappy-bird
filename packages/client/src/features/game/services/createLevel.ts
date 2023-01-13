import { Block, Canvas } from '../types'

export const createLevel = ({
  array,
  canvas,
  block,
}: {
  array: number[][]
  canvas: Canvas
  block: Block
}) => {
  const createBlocksPair = (top: number, down: number) => {
    return [
      { x: canvas.width, y: 0, width: block.width, height: top },
      {
        x: canvas.width,
        y: canvas.height - down,
        width: block.width,
        height: down,
      },
    ]
  }

  const level = array.reduce((prev, [t, d]) => {
    return [...prev, ...createBlocksPair(t, d)]
  }, [] as any[])

  return level
}

export const levels = [
  [
    [100, 150],
    [100, 50],
    [50, 100],
    [120, 20],
    [100, 150],
    [120, 40],
    [20, 110],
  ],
  [
    [100, 150],
    [100, 50],
    [50, 100],
    [120, 20],
    [100, 150],
    [120, 40],
    [20, 110],
  ].reverse()
]
