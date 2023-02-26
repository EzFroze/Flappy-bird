import { Theme } from "@emotion/react"
import { FavoriteBorder, Favorite, Reply, SentimentVeryDissatisfied } from "@mui/icons-material"
import { Avatar, Box, Divider, IconButton, Paper, SxProps, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { baseOptions, BASE_URL } from "../../../app/api/variables"
import { Comment, ForumTopic, Topic, User } from "../types"

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
  topic: Topic | Comment
}> = ({
  isTopic = false,
  topic
}) => {
  const [ likes, setLikes ] = useState<
    Record<'userId' | 'commentId' | 'postId', number>[]
  >()
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then(r => r.json())
      .then(setUser)
  }, [])

  useEffect(() => {
    console.log('user', user)
  }, [user])

  useEffect(() => {
    fetch(`http://localhost:3001/likes`)
      .then(r => r.json())
      .then(setLikes)
  }, [])

  useEffect(() => {
    console.log('likes', likes)
  }, [likes])

  const handleLike = (id: number, userId: number) => {
    fetch(`http://localhost:3001/likes`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ 
        userId, 
        [isTopic ? 'postId' : 'commentId']: id 
      })
    })
  }

  const defineLike = () => {
    const a = likes?.find((like) => {
      if (isTopic) {
        return topic.id === like.postId && user?.id === like.userId
      }

      return topic.id === like.commentId && user?.id === like.userId
    })

    return a
  }

  return (
    <Paper
      elevation={isTopic ? 4 : 1} 
      className="post" 
      sx={{ 
        display: 'flex', 
        mt: 2,
        backgroundColor: isTopic ? '#f5f5f5' : '',
      }}
    >
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
              <IconButton 
                size="small" 
                color={defineLike() ? "error" : "primary"} 
                onClick={() => {
                  if (topic?.id && user?.id) {
                    console.log('liked')
                    handleLike(topic.id, user?.id)
                  }
                }}
              >
                { defineLike() ? <Favorite /> : <FavoriteBorder />}
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
  )
}