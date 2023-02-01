import { useCallback, useMemo } from 'react'
import { DialogProps, GameStatus } from '../types'
import { GameDialog } from './GameDialog'

export const Dialogs: React.FC<{
  status: GameStatus
  updateStatus: React.Dispatch<React.SetStateAction<GameStatus>>
  restorePlayer: () => void
  restartLevel: () => void
  progress: number
}> = ({ status, updateStatus, restorePlayer, restartLevel, progress }) => {
  const restart = useCallback(() => {
    updateStatus(GameStatus.start)
    restorePlayer()
    restartLevel()
  }, [updateStatus, restorePlayer, restartLevel])

  const dialogs: Record<string, DialogProps> = useMemo(
    () => ({
      [GameStatus.screenChanged]: {
        open: true,
        title: 'Разрешение экрана изменилось',
        buttonTitle: 'Начать заново',
        onClick: restart,
      },
      [GameStatus.start]: {
        open: true,
        title: 'Начать игру?',
        buttonTitle: 'Старт',
        onClick: () => {
          updateStatus(GameStatus.run)
          restorePlayer()
        },
      },
      [GameStatus.pause]: {
        open: true,
        title: 'Продолжить?',
        buttonTitle: 'Вперед',
        onClick: () => {
          updateStatus(GameStatus.run)
        },
      },
      [GameStatus.finish]: {
        open: true,
        title: `Вы прошли игру!`,
        buttonTitle: 'Начать заново',
        onClick: restart,
      },
      [GameStatus.gameover]: {
        open: true,
        title: `Игра окончена! Ваш прогресс: ${progress}`,
        buttonTitle: 'Начать заново',
        onClick: restart,
      },
    }),
    [status, progress, restart]
  )

  return <GameDialog {...dialogs[status]} />
}
