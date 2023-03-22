import { Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../../../app/router/types'
import { useStore } from '../../../app/store/hooks'
import { useDb } from '../../../hooks/useDb'
import { User } from '../types'
import { ForumSendMessage } from './ForumSendMessage'

export const NewForumThread: React.FC = () => {
  const [ topic, setTopic ] = useState({
    title: '',
    message: ''
  })
  const user = useStore((s) => s.user.data as unknown as User)
  const nav = useNavigate()

  const [ postNewTopic ] = useDb('posts', 'post')
  
  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant="h3">Новая тема</Typography>
        <Button onClick={() => nav(RoutesEnum.Forums)}>На форум</Button>
      </Stack>
      <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
        <TextField 
          label="Название темы" 
          sx={{ width: '100%' }} 
          onChange={(e) => setTopic((t) => ({ ...t, title: e.target.value }))}
        />
      </Paper>
      <ForumSendMessage 
        submitButtonTitle={'Создать'}
        setMessage={(message) => setTopic((t) => ({ ...t, message }))}
        onClick={() => {
          if (user.id === 0)
            return

            postNewTopic({ body: JSON.stringify({ ...topic, user }) })
              .then(() => nav(RoutesEnum.Forums))
        } } 
        message={topic.message}
      />
    </Container>
  )
}
