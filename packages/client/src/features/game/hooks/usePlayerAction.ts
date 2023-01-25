import { useCallback } from "react"
import { GameStatus, Player } from "../types"

export const usePlayerAction = (canvas: HTMLCanvasElement | null, player: Player, status: GameStatus) => {
  const lift = useCallback(() => {
    if (status !== GameStatus.run) return

    player.y -= player.move
  }, [player, status])

  const restore = useCallback(() => {
    if (canvas === null) return

    player.y = canvas.height / 15
    player.x = canvas.width / 15
  }, [player, canvas])

  return {
    lift,
    restore
  }
}