import { GameStatus } from '../types'
import { GameDialog } from './GameDialog'

export const Dialogs: React.FC<{
  status: GameStatus
  updateStatus: React.Dispatch<React.SetStateAction<GameStatus>>
  restorePlayer: () => void
  restartLevel: () => void
  progress: number
}> = ({ status, updateStatus, restorePlayer, restartLevel, progress }) => {
  return (
    <>
      <GameDialog
        open={status === 'screenChanged'}
        title="Разрешение экрана изменилось"
        buttonTitle="Начать заново"
        onClick={() => {
          updateStatus('start')
          restorePlayer()
          restartLevel()
        }}
      />
      <GameDialog
        open={status === 'start'}
        title="Начать игру?"
        buttonTitle="Старт"
        onClick={() => {
          updateStatus('run')
          restorePlayer()
        }}
      />
      <GameDialog
        open={status === 'pause'}
        title="Продолжить?"
        buttonTitle="Вперед"
        onClick={() => {
          updateStatus('run')
        }}
      />
      <GameDialog
        open={status === 'finish'}
        title={`Вы прошли игру!`}
        buttonTitle={'Начать заново'}
        onClick={() => {
          updateStatus('start')
          restorePlayer()
          restartLevel()
        }}
      />
      <GameDialog
        open={status === 'gameover'}
        title={`Игра окончена! Ваш прогресс: ${progress}`}
        buttonTitle="Начать заново"
        onClick={() => {
          updateStatus('start')
          restorePlayer()
          restartLevel()
        }}
      />
    </>
  )
}