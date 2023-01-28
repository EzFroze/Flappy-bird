import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'
import { DialogProps } from '../types'

export const GameDialog: React.FC<DialogProps> = ({
  title,
  buttonTitle,
  open,
  onClick,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClick}>{buttonTitle}</Button>
      </DialogActions>
    </Dialog>
  )
}
