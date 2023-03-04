import { Theme } from '@emotion/react'
import {
  FavoriteBorder,
  Reply,
  SentimentVeryDissatisfied,
  FavoriteTwoTone
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Input,
  Modal,
  Paper,
  Popover,
  SxProps,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { useSet } from '../../../app/store/hooks'
import { useDb } from '../../../hooks/useDb'
import { selectedComment, toggleDrawer } from '../services/forumSlice'
import { Comment, Complain, ForumTopic, Like, Subcomment, Topic, User } from '../types'
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

export const CommentPost: React.FC<{
  isTopic?: boolean
  isSub?: boolean
  topic: Topic | Comment | Subcomment
}> = ({ isTopic = false, isSub = false, topic }) => {
  const set = useSet()
  const [user, setUser] = useState<User>()
  const [complainOpen, setComplainOpen] = useState(false)
  const [complainMessage, setComplainMessage] = useState('')

  const [ getLikes, { result: likes } ] = useDb<Like[]>('likes')
  const [ postLike ] = useDb<Like>('likes', 'post')
  const [ postComplain ] = useDb<Complain>('complains', 'post')
  const [ getComplains ] = useDb<Complain[]>('complains')

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then(r => r.json())
      .then(setUser)
  }, [])

  useEffect(() => {
    getLikes({})
  }, [])

  const handleLike = (id: number, userId: number) => {
    postLike({ body: JSON.stringify({
      userId,
      [isTopic ? 'postId' : 'commentId']: id,
    })}).then(() => setTimeout(() => {
      getLikes({})
    }, 100))
  }

  const defineLike = () => {
    const like = likes?.find(like => {
      if (isTopic) {
        return topic.id === like.postId && user?.id === like.userId
      }

      return topic.id === like.commentId && user?.id === like.userId
    })

    return like
  }

  const complain = () => {
    const body: Complain = { message: complainMessage }

    if (isTopic) {
      body.postId === topic.id
    }

    if (!isTopic && !isSub) {
      body.commentId === topic.id
    }

    if (isSub) {
      body.subcommentId = topic.id
    }

    postComplain({ body: JSON.stringify(body) }).then(() => {
      setTimeout(() => getComplains({}), 100)
    })
  }

  return (
    <>
      <Paper
        elevation={isTopic ? 4 : 1}
        className="post"
        sx={{
          display: 'flex',
          mt: 2,
        }}>
        <Box className="post__avatar" sx={{ pl: 2, pt: 2 }}>
          <Avatar
            src={`${BASE_URL}/resources${topic.user?.avatar}`}
            variant="rounded"
            sx={{ width: 64, height: 64 }}
          />
        </Box>
        <Box style={postContentStyle}>
          <Box sx={postUsernameSx}>
            <Box>
              <Typography variant="h5">
                {topic.user?.display_name || topic.user?.login || 'Anonymous'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ textAlign: 'right' }}>
                #{topic?.id || 0}
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'right' }}>
                {topic?.datetime
                  ? new Date(topic.datetime).toLocaleDateString()
                  : ''}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ ml: 2, mr: 2 }} />
          <Box id="post__message" sx={{ p: 2, pt: 2 }}>
            <Box id="message__content">
              <Typography variant="body1">{topic?.message || ''}</Typography>
            </Box>
            <Box id="message__control" sx={{ display: 'flex', pt: 2, gap: 1 }}>
              {!isSub && user?.id !== topic?.user?.id && (
                <Tooltip title="Лайк" placement="left" {...tooltipAttrs}>
                  <IconButton
                    size="small"
                    color={defineLike() ? 'error' : 'primary'}
                    onClick={() => {
                      if (topic?.id && user?.id) {
                        handleLike(topic.id, user?.id)
                      }
                    }}>
                    {defineLike() ? <FavoriteTwoTone /> : <FavoriteBorder />}
                  </IconButton>
                </Tooltip>
              )}
              {!isTopic && !isSub && (
                <Tooltip
                  title="Ответить на пост"
                  placement="right"
                  {...tooltipAttrs}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      set(toggleDrawer())
                      set(selectedComment(topic.id))
                    }}>
                    <Reply />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Жалоба" placement="left" {...tooltipAttrs}>
                <IconButton
                  sx={{ ml: 'auto' }}
                  size="small"
                  color="error"
                  onClick={() => setComplainOpen(true)}>
                  <SentimentVeryDissatisfied />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Dialog maxWidth='lg' open={complainOpen} onClose={() => {
        setComplainMessage('')
        setComplainOpen(false)
      }}>
        <DialogTitle>Пожаловаться на сообщение</DialogTitle>
        <DialogContent>
          <TextField
            variant='standard' 
            fullWidth
            maxRows={1} 
            helperText={complainMessage === '' 
              ? 'Не более 25 символов' 
              : `Всего символов: ${complainMessage.length} (не более 25)`
            }
            onChange={(ev) => setComplainMessage(ev.target.value)}
            onKeyDown={(key) => {
              if (
                complainMessage.length > 24
                && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(key.code)
              ) {
                key.preventDefault()
              } 
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => {
            setComplainMessage('')
            setComplainOpen(false)
          }}>Отмена</Button>
          <Button 
            disabled={complainMessage.length > 25}
            onClick={() => {
            complain()
            setComplainMessage('')
            setComplainOpen(false)
          }}>Отправить</Button>
        </DialogActions>
      </Dialog>             
    </>
    
  )
}
