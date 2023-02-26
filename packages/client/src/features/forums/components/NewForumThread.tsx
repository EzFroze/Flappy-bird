import { Container, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
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

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((res) => res.json())
      .then(({ id, display_name, login, avatar }: User) => {
        setUser({ display_name, login, id, avatar })
      })
  }, [])

  useEffect(() => {
    console.log('topic', topic)
  }, [topic])
  
  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Typography variant="h3">Новая тема</Typography>
      <Paper sx={{ mt: 2, p: 2 }}>
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

          fetch('http://127.0.0.1:3001/posts/create', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ ...topic, user })
          }).then(() => nav(RoutesEnum.Forums))
        } } 
        message={topic.message}
      />
    </Container>
  )
}
