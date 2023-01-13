export type Canvas = {
  width: number
  height: number
}

export type Player = {
  x: number
  y: number
  width: number
  height: number
  gravity: number
  move: number
  level: number
}

export type Block = {
  x: number
  y: number
  width: number
  height: number
}

export type ModalEndProps = {
  ended: boolean
  isLastLevel: boolean
  goNextLevel: () => void
}

export type ModalStartProps = {
  launched: boolean
  setLaunched: (a: boolean) => void
  setPaused: (a: boolean) => void
}

export type ModalOverProps = {
  gameOver: boolean
  frame: number
}
