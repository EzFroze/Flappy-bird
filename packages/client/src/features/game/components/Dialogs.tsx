import { useCallback } from 'react'
import { GameStatus } from '../types'
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

  return (
    <>
      {[
        {
          open: status === GameStatus.screenChanged,
          title: 'Разрешение экрана изменилось',
          buttonTitle: 'Начать заново',
          onClick: restart,
        },
        {
          open: status === GameStatus.start,
          title: 'Начать игру?',
          buttonTitle: 'Старт',
          onClick: () => {
            updateStatus(GameStatus.run)
            restorePlayer()
          },
        },
        {
          open: status === GameStatus.pause,
          title: 'Продолжить?',
          buttonTitle: 'Вперед',
          onClick: () => {
            updateStatus(GameStatus.run)
          },
        },
        {
          open: status === GameStatus.finish,
          title: `Вы прошли игру!`,
          buttonTitle: 'Начать заново',
          onClick: restart,
        },
        {
          open: status === GameStatus.gameover,
          title: `Игра окончена! Ваш прогресс: ${progress}`,
          buttonTitle: 'Начать заново',
          onClick: restart,
        },
      ].map(dialog => (
        <GameDialog {...dialog} />
      ))}
    </>
  )
}
