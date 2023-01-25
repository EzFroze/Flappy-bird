import { useEffect } from 'react'
import { GameStatus, Player } from '../types'
import { usePlayerAction } from './usePlayerAction'

export const useControls = (
  player: Player,
  status: GameStatus,
  setStatus: React.Dispatch<React.SetStateAction<GameStatus>>
) => {
  const playerAction = usePlayerAction(null, player, status)

  useEffect(() => {
    const action = ({ key }: KeyboardEvent) => {
      if (key === 'ArrowUp') {
        playerAction.lift()
      }
    }

    window.addEventListener('keyup', action)

    return () => window.removeEventListener('keyup', action)
  }, [status])

  const togglePause = (
    ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    ev.preventDefault()
    setStatus(s => (s === GameStatus.pause ? GameStatus.run : GameStatus.pause))
  }

  return {
    togglePause
  }
}
