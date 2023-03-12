import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormHelperText,
} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../../../app/router/types'
import { sendUserResult } from '../../leaderboard/services/leaderboard'
import { DialogProps } from '../types'
import { useStore } from '../../../app/store/hooks'
import { getUser } from '../../profile/services/authSlice'
import { useServerError } from '../../../hooks/useServerError'

export const GameDialog: React.FC<DialogProps> = ({
  title,
  buttonTitle,
  open,
  onClick,
  progress,
}) => {
  const nav = useNavigate()
  const user = useStore(getUser)
  const { serverError, setError } = useServerError()
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={() => nav(RoutesEnum.Leaderboard)}>
          Перейти в "Лидерборд"
        </Button>
        <Button onClick={onClick}>{buttonTitle}</Button>
        <Button
          onClick={() => {
            nav(RoutesEnum.Forums)
          }}>
          {'Форум'}
        </Button>
        {progress ? (
          <Button
            onClick={() => {
              sendUserResult({
                id: user.data.id,
                name: user.data.login,
                avatar: user.data.avatar,
                progress,
              }).then(response => {
                if (response.status === 200) {
                  nav(RoutesEnum.Leaderboard)
                } else {
                  setError(new Error(`Что-то пошло не так.`))
                }
              })
            }}>
            {'Сохранить результат'}
          </Button>
        ) : (
          ''
        )}
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: 16,
          }}>
          {serverError}
        </FormHelperText>
      </DialogActions>
    </Dialog>
  )
}
