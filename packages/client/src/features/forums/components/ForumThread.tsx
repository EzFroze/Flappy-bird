import { Theme } from '@emotion/react'
import {
  FavoriteBorder,
  Reply,
  SentimentVeryDissatisfied,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  SxProps,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
import { ForumsNames, ForumsNamesRu, Topic, User } from '../types'
import { ForumSendMessage } from './ForumSendMessage'

const postContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}

const postUsernameSx: SxProps<Theme> = {
  p: 2,
  pt: 3,
  pb: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const tooltipAttrs = {
  arrow: true,
  enterDelay: 1000,
  enterNextDelay: 1000,
}

export const ForumThread: React.FC = () => {
  const { thread } = useParams()
  const nav = useNavigate()
  const [ topic, setTopic ] = useState<Topic>()
  const [ user, setUser ] = useState<User>()
  const [ avatar, setAvatar ] = useState('')

  // loading post info
  useEffect(() => {
    fetch(`http://localhost:3001/posts/${thread}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('thread:', res)
        setTopic(res)
      })
  }, [])

  // loading user info for the post
  useEffect(() => {
    if (!topic) return

    fetch(`${BASE_URL}/user/${topic.userId}`, baseOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log('user by id', res)
        setUser(res)
      })
  }, [topic])

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">{topic?.title || '<Нет названия>'}</Typography>
        <Button onClick={() => nav(RoutesEnum.Forums)}>На форум</Button>
      </Box>
      {[1].map((_, i) => (
        <Paper key={i + 'msg'} className="post" sx={{ display: 'flex', mt: 2 }}>
          <Box className="post__avatar" sx={{ pl: 2, pt: 2 }}>
            <Avatar
              src={`${BASE_URL}/resources${user?.avatar}` || ''} 
              variant="rounded" 
              sx={{ width: 64, height: 64 }}
            />
          </Box>
          <Box style={postContentStyle}>
            <Box sx={postUsernameSx}>
              <Box>
                <Typography variant="h5">
                  {user?.display_name || user?.login || 'Anonymous'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  #{ topic?.id || 0}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  { topic?.datetime ? new Date(topic.datetime).toLocaleDateString() : ''}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ ml: 2, mr: 2 }} />
            <Box id="post__message" sx={{ p: 2, pt: 2 }}>
              <Box id="message__content">
                <Typography variant="body1">{topic?.message || ''}</Typography>
              </Box>
              <Box
                id="message__control"
                sx={{ display: 'flex', pt: 2, gap: 1 }}>
                <Tooltip title="Лайк" placement="left" {...tooltipAttrs}>
                  <IconButton size="small" color="primary">
                    <FavoriteBorder />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Ответить + цитата"
                  placement="right"
                  {...tooltipAttrs}>
                  <IconButton size="small" color="primary">
                    <Reply />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Жалоба" placement="left" {...tooltipAttrs}>
                  <IconButton sx={{ ml: 'auto' }} size="small" color="error">
                    <SentimentVeryDissatisfied />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}
      <ForumSendMessage 
        setMessage={(text: string) => {}} />
    </Container>
  )
}
