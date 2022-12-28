import { Box, Container, Paper, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { ForumsNames, ForumsNamesRu } from '../types'
import { ForumSendMessage } from './ForumSendMessage'

export const NewForumThread: React.FC = () => {
  const { forum } = useParams()

  const forumName = forum as ForumsNames

  return (
    <Container maxWidth="lg">
      {forumName !== undefined && (
        <Typography variant="h3">{ForumsNamesRu[forumName]}</Typography>
      )}
      <Paper sx={{ mt: 2, p: 2 }}>
        <TextField label="Название темы" sx={{ width: '100%' }} />
      </Paper>
      <ForumSendMessage submitButtonTitle={'Создать'} />
    </Container>
  )
}