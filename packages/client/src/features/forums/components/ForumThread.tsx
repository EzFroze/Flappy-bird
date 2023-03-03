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
import { useDb } from '../hooks/useDb'
import { Topic, Comment } from '../types'
import { CommentDrawer } from './CommentDrawer'
import { CommentPost } from './CommentPost'
import { ForumSendMessage } from './ForumSendMessage'

export const ForumThread: React.FC = () => {
  const { thread } = useParams()
  const nav = useNavigate()
  const [ currentUser, setCurrentUser ] = useState<any>()
  const [ loading, setLoading ] = useState(false)
  const [ comment, setComment ] = useState('')

  const selectedCommentId = useStore(({ forum }) => forum.selectedComment)

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((res) => res.json())
      .then(({ id, display_name, login, avatar }) => {
        if (id === undefined) return

        setCurrentUser({ id, display_name, login, avatar })
      })
  }, [])

  useEffect(() => {
    console.log('cur us', currentUser)
  }, [])

  const [ getTopic, { result: topic } ] = useDb<Topic>('posts')
  const [ getComments, { result: comments } ] = useDb<Comment[]>('comments')
  const [ postComment ] = useDb<Comment>('comments', 'post')

  useEffect(() => {
    getTopic({ id: thread })
    getComments({ id: `thread/${thread}`})
  }, [thread])

  const handlePostComment = async () => {
    if (topic === undefined || currentUser === undefined) return

    const body: Comment = {
      message: comment,
      user: currentUser,
      postId: topic.id
    }

    await postComment({ body: JSON.stringify(body) })

    setComment('')
    getComments({ id: `thread/${thread}`})
  }

  const selectedComment = useMemo(() => {
    return (comments || []).find((comment) => comment.id === selectedCommentId)
  }, [selectedCommentId, comments])

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
      {(comments || []).map((comment, i) => {
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
      <CommentDrawer topic={selectedComment} />
    </Container>
  )
}
