import { Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
import { useDb } from '../../../hooks/useDb'
import { Topic, User } from '../types'
import { ForumSendMessage } from './ForumSendMessage'

export const NewForumThread: React.FC = () => {
  const [ topic, setTopic ] = useState({
    title: '',
    message: ''
  })
  const [user, setUser] = useState({
    id: 0,
    display_name: '',
    login: '',
    avatar: ''
  })

  const nav = useNavigate()

  const [ postNewTopic ] = useDb('posts', 'post')

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((res) => res.json())
      .then(({ id, display_name, login, avatar }: User) => {
        setUser({ display_name, login, id, avatar })
      })
  }, [])
  
  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Typography variant="h3">Новая тема</Typography>
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

            console.log('user', user)

            postNewTopic({ body: JSON.stringify({ ...topic, user }) })
              .then(() => nav(RoutesEnum.Forums))
        } } 
        message={topic.message}
      />
    </Container>
  )
}
