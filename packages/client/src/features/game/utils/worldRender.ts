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
  ctx.fillStyle = '#964B00'
  ctx.fillRect(0, height - 20, width, 20)
  ctx.fillStyle = '#000000'
  ctx.lineWidth = 1
  ctx.strokeRect(0, height - 20, width, 20)
}
