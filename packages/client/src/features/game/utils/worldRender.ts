import { brown, green } from '@mui/material/colors'
import { GameStatus, Player, Position } from '../types'

export const renderBlock = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  ctx.fillStyle = '#50C878'
  ctx.fillRect(x, y, w, h)

  ctx.fillStyle = '#000000'
  ctx.lineWidth = 4
  ctx.strokeRect(x, y, w, h)
}

export const renderGround = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // ground
  ctx.fillStyle = brown[500]
  ctx.fillRect(0, height - 20, width, 20)
  ctx.fillStyle = '#000000'
  ctx.lineWidth = 1
  ctx.strokeRect(0, height - 30, width, 30)
  // grass
  ctx.fillStyle = green[500]
  ctx.fillRect(0, height - 30, width, 10)
}

export const renderInfo = ({
  ctx,
  blocks,
  initialBlocksLength,
  player
} : {
  ctx: CanvasRenderingContext2D,
  blocks: Position[],
  initialBlocksLength: number
  player: Player
}) => {
  const blocksBehingPlayer = blocks.filter(block => {
    return block.x > player.x
  })
  const startBlocks = initialBlocksLength / 2
  const progress = startBlocks - blocksBehingPlayer.length / 2

  player.progress = progress
  ctx.fillStyle = 'white'
  ctx.font = '24px monospace'
  ctx.fillText(`${progress} / ${startBlocks}`, 50, 50)
}