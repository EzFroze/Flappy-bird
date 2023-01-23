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
  speed: number
  progress: number
  gravity: number
  wave: number
} & Position

export type GameStatus =
  | 'start'
  | 'run'
  | 'pause'
  | 'finish'
  | 'gameover'
  | 'screenChanged'