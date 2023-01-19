export type Canvas = {
  width: number
  height: number
}

export type Position = {
  x: number
  y: number
  w: number
  h: number
}

export type Player = {
  move: number
} & Position

export type GameStatus = {
  started: boolean
  ended: boolean
  overed: boolean
  paused: boolean
  speed: number
  progress: number
  gravity: number
}