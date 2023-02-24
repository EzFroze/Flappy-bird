import { Send } from '@mui/icons-material'
import { Button, Paper, TextField } from '@mui/material'
import { useState } from 'react'

export const ForumSendMessage: React.FC<{ 
  submitButtonTitle?: string 
  onClick?: (arg: any) => void
  setMessage: (text: string) => void
}> = ({
  submitButtonTitle,
  onClick,
  setMessage
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
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button 
        variant={'contained'} 
        startIcon={<Send />} sx={{ mt: 2 }}
        onClick={onClick}
      >
        {submitButtonTitle || 'Отправить'}
      </Button>
    </Paper>
  )
}
