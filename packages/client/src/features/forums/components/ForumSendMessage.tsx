import { Send } from '@mui/icons-material'
import { Button, Paper, TextField } from '@mui/material'
import { useState } from 'react'

export const ForumSendMessage: React.FC<{
  disabled?: boolean 
  submitButtonTitle?: string 
  onClick?: (arg: any) => void
  message: string
  setMessage: (text: string) => void
}> = ({
  submitButtonTitle,
  onClick,
  message,
  setMessage,
  disabled
}) => {
  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <TextField
        className="thread__answer"
        label="Новое сообщение"
        multiline
        minRows={3}
        maxRows={20}
        variant="outlined"
        sx={{ width: '100%' }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button 
        disabled={disabled}
        variant={'contained'} 
        startIcon={<Send />} sx={{ mt: 2 }}
        onClick={onClick}
      >
        {submitButtonTitle || 'Отправить'}
      </Button>
    </Paper>
  )
}
