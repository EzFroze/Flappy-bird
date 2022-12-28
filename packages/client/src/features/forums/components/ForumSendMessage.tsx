import { Send } from '@mui/icons-material'
import { Button, Paper, Stack, TextField } from '@mui/material'

export const ForumSendMessage: React.FC<{ submitButtonTitle?: string }> = ({
  submitButtonTitle,
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
      />
      <Stack direction={'row'} sx={{ mt: 2 }}>
        <Button variant={'contained'} startIcon={<Send />}>
          {submitButtonTitle || 'Отправить'}
        </Button>
      </Stack>
    </Paper>
  )
}