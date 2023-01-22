import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React from 'react'

export const GameDialog: React.FC<{
  title: string
  buttonTitle: string
  open: boolean
  onClick: () => void
}> = ({ title, buttonTitle, open, onClick }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button
          onClick={onClick}>
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  )
}