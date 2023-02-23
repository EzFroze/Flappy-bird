import { Theme } from '@emotion/react'
import {
  FavoriteBorder,
  Reply,
  SentimentVeryDissatisfied,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  SxProps,
  Tooltip,
  Typography,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { ForumsNames, ForumsNamesRu } from '../types'
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
  const { forum, thread } = useParams()

  const forumName = forum as ForumsNames

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Typography variant="subtitle1">{ForumsNamesRu[forumName]}</Typography>
      <Typography variant="h3">Thread Topic {thread}</Typography>
      {[1].map((_, i) => (
        <Paper key={i + 'msg'} className="post" sx={{ display: 'flex', mt: 2 }}>
          <Box className="post__avatar" sx={{ pl: 2, pt: 2 }}>
            <Avatar variant="rounded" sx={{ width: 64, height: 64 }}>
              AVA
            </Avatar>
          </Box>
          <Box style={postContentStyle}>
            <Box sx={postUsernameSx}>
              <Box>
                <Typography variant="h5">Username</Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  #42
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                  01.02.2022
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ ml: 2, mr: 2 }} />
            <Box id="post__message" sx={{ p: 2, pt: 2 }}>
              <Box id="message__content">
                <Typography variant="body1">There some post content</Typography>
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
      <ForumSendMessage />
    </Container>
  )
}
