import { Canvas, Player, Position } from "../types"
import { getCollision } from "../utils/getCollision"

const blocks: Position[] = [
  { x: 10, y: 0, h: 10, w: 10 },
  { x: 10, y: 90, h: 10, w: 10}
]

const getPlayer = (y: number): Position => {
  return { x: 5, y, w: 10, h: 10 }
}

const canvasSize: Canvas = {
  width: 200,
  height: 100
}

describe('game utils', () => {
  describe('getCollision', () => {
    test('should return block instance on collision', () => {
      expect(getCollision(blocks, getPlayer(0) as Player, canvasSize)).toBeDefined()
    })
    test('should return undefined without collision', () => {
      expect(getCollision(blocks, getPlayer(20) as Player, canvasSize)).toBeUndefined()
    })
  })
})