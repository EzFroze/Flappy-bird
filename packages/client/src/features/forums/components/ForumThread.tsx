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
  Skeleton,
  SxProps,
  Tooltip,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
import { Topic, User, Comment } from '../types'
import { CommentPost } from './CommentPost'
import { ForumSendMessage } from './ForumSendMessage'

export const ForumThread: React.FC = () => {
  const { thread } = useParams()
  const nav = useNavigate()
  const [ topic, setTopic ] = useState<Topic>()
  const [ op, setOp ] = useState<User>()
  const [ currentUser, setCurrentUser ] = useState<User>()
  const [ loading, setLoading ] = useState(false)
  const [ comment, setComment ] = useState('')
  const [ comments, setComments ] = useState<Comment[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log('currentUser:', res)
        setCurrentUser(res)
      })
  }, [])

  // loading post info
  useEffect(() => {
    setLoading(true)
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
        setOp(res)
      })
      .finally(() => setLoading(false))
  }, [topic])

  useEffect(() => {
    fetch('http://localhost:3001/comments')
      .then((res) => res.json())
      .then((res) => {
        console.log('res comments', res)
        setComments(res)
      })
  }, [])

  const handlePostComment = () => {
    if (topic === undefined || currentUser === undefined) return

    const body: Comment = {
      message: comment,
      postId: topic.id,
      userId: currentUser.id,
      user: currentUser
    }

    fetch('http://localhost:3001/comments/create', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((res) => res.json()).then((res) => {
      console.log('res comments', res)
      setComments((c) => c.concat(res))
      setComment('')
    })
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">
          {topic?.title}
        </Typography>
        <Button onClick={() => nav(RoutesEnum.Forums)}>На форум</Button>
      </Box>
      {/* POST */}
      { op !== undefined && topic !== undefined && (
        <CommentPost user={op} topic={topic} isTopic={true} />
      )}
      {comments.map((comment, i) => {
        return <CommentPost 
          key={1000 + i} 
          user={comment.user!} 
          topic={comment!} 
        />
      })}
      <ForumSendMessage
        disabled={loading}
        onClick={handlePostComment}
        message={comment}
        setMessage={setComment} 
      />
    </Container>
  )
}
