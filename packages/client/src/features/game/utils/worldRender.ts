import { brown, green } from '@mui/material/colors'
import { Player, Position } from '../types'
import wingUpFrame from '/bird/frame-1.png'
import wingDownFrame from '/bird/frame-2.png'

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
  player,
}: {
  ctx: CanvasRenderingContext2D
  blocks: Position[]
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

export const renderBirdFall = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  height: number
) => {
  const bird = new Image()

  if (Math.round(player.y) >= height - 20 - player.h) {
    bird.src = wingDownFrame
  } else {
    player.y += 2
    bird.src = wingUpFrame
  }

  ctx.globalAlpha = 0.7
  ctx.drawImage(bird, player.x, player.y, player.w, player.h)
  ctx.globalAlpha = 1
}

export const renderBirdWave = (
  ctx: CanvasRenderingContext2D,
  player: Player
) => {
  const bird = new Image()

  if (Math.ceil(player.wave) % 2 === 0) {
    bird.src = wingUpFrame
  } else {
    bird.src = wingDownFrame
  }

  ctx.drawImage(bird, player.x, player.y, player.w, player.h)
}
