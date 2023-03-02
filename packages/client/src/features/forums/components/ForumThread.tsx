import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseOptions, BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
import { useStore } from '../../../app/store/hooks'
import { Topic, Comment } from '../types'
import { CommentDrawer } from './CommentDrawer'
import { CommentPost } from './CommentPost'
import { ForumSendMessage } from './ForumSendMessage'

export const ForumThread: React.FC = () => {
  const { thread } = useParams()
  const nav = useNavigate()
  const [ topic, setTopic ] = useState<Topic>()
  const [ currentUser, setCurrentUser ] = useState<any>()
  const [ loading, setLoading ] = useState(false)
  const [ comment, setComment ] = useState('')
  const [ comments, setComments ] = useState<Comment[]>([])

  const selectedCommentId = useStore(({ forum }) => forum.selectedComment)

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((res) => res.json())
      .then(({ id, display_name, login, avatar }) => {
        //console.log('currentUser:', res)
        setCurrentUser({ id, display_name, login, avatar })
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
  }, [thread])

  useEffect(() => {
    fetch(`http://localhost:3001/comments/thread/${thread}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('comments: ', res)
        setComments(res)
      }).finally(() => setLoading(false))
  }, [thread])

  const handlePostComment = () => {
    if (topic === undefined || currentUser === undefined) return

    const body: Comment = {
      message: comment,
      user: currentUser,
      postId: topic.id
    }

    console.log('thread bdoy', body)

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

  const selectedComment = useMemo(() => {
    return comments.find((comment) => comment.id === selectedCommentId)
  }, [selectedCommentId])

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">
          {topic?.title || ''}
        </Typography>
        <Button onClick={() => nav(RoutesEnum.Forums)}>На форум</Button>
      </Box>
      {/* POST */}
      { topic !== undefined && (
        <CommentPost topic={topic} isTopic={true} />
      )}
      {comments.map((comment, i) => {
        return <CommentPost 
          key={1000 + i} 
          topic={comment!}
        />
      })}
      <div style={{ marginTop: 20 }}></div>
      <ForumSendMessage
        disabled={loading}
        onClick={handlePostComment}
        message={comment}
        setMessage={setComment} 
      />
      {
        selectedComment && (
          <CommentDrawer 
              topic={selectedComment} 
          />
        )
      }
    </Container>
  )
}
