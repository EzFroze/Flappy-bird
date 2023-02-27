import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../../../app/router/types'
import { DialogProps } from '../types'

export const GameDialog: React.FC<DialogProps> = ({
  title,
  buttonTitle,
  open,
  onClick,
}) => {
  const nav = useNavigate()
  const goTo = useNavigate()

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={() => goTo(RoutesEnum.Leaderboard)}>
          Перейти в "Лидерборд"
        </Button>
        <Button onClick={onClick}>{buttonTitle}</Button>
        <Button onClick={() => {
          nav(RoutesEnum.Forums)
        }}>{'Форум'}</Button>
      </DialogActions>
    </Dialog>
  )
}
