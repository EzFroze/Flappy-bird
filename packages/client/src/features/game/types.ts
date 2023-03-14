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

export enum GameStatus {
  start = 'start',
  run = 'run',
  pause = 'pause',
  finish = 'finish',
  gameover = 'gameover',
  screenChanged = 'screenChanged',
}

export type DialogProps = {
  open: boolean
  title: string
  buttonTitle: string
  onClick: () => void
  progress?: number
}

export type Bird = Record<'waveUp' | 'waveDown', HTMLImageElement>