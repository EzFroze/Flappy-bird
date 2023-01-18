import { Canvas, Player, Position } from '../types'

export const getCollision = (
  blocks: Position[],
  player: Player,
  canvasSize: Canvas
) => {
  return blocks
    .filter((_b, i) => i < 4)
    .find(block => {
      const playerLeft = player.x
      const playerRight = player.x + player.w
      const blockLeft = block.x
      const blockRight = block.x + block.w

      const playerTop = player.y
      const playerBottom = player.y + player.h
      const blockTop = block.y
      const blockBottom = block.y + block.h

      let intersectedVertically = false

      if (playerRight > blockLeft && playerRight < blockRight) {
        intersectedVertically = true
      }

      if (playerLeft > blockLeft && playerLeft < blockRight) {
        intersectedVertically = true
      }

      if (blockTop === 0) {
        return playerTop < blockBottom && intersectedVertically
      }

      if (blockBottom === canvasSize.height) {
        return playerBottom > blockTop && intersectedVertically
      }
    })
}
