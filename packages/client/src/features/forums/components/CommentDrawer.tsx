import { Box, Divider, Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { baseOptions, BASE_URL } from "../../../app/api/variables"
import { useSet, useStore } from "../../../app/store/hooks"
import { toggleDrawer } from "../services/forumSlice"
import { Topic, Comment, User, Subcomment } from "../types"
import { CommentPost } from "./CommentPost"
import { ForumSendMessage } from "./ForumSendMessage"

export const CommentDrawer: React.FC<{ topic: Topic | Comment }> = ({ topic }) => {
  const set = useSet()
  const drawerOpen = useStore((state) => state.forum.drawerOpen)

  const [ message, setMessage ] = useState('')
  const [ subComments, setSubComments ] = useState<Subcomment[]>([])
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    console.log('topic', topic)
    if (topic?.id) {
      fetch(`http://localhost:3001/subcomments/${topic.id}`)
      .then(r => r.json())
      .then((res) => {
        console.log('res sub comments', res)
        setSubComments(res)
      })
    }
  }, [topic?.id])

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then(r=>r.json())
      .then((res) => {
        console.log('res user', res)
        setUser(res)
      })
  }, [])

  const handlePostSubcomment = () => {
    if (topic === undefined) return

    const body: {
      message: string
      commentId: number
      user: User
    } = {
      message,
      commentId: topic.id,
      user
    }

    console.log('thread body', body)

    fetch('http://localhost:3001/subcomments/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((res) => res.json()).then((res) => {
      console.log('res subcomments', res)
      setSubComments((scs) => scs.concat(res))
      setMessage('')
    })
  }

  return (
    <Drawer
      PaperProps={{
        sx: { width: 600 },
      }}
      anchor='right'
      open={drawerOpen}
      onClose={() => set(toggleDrawer())}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex',
        gap: 2, 
        flexDirection: 'column',
        height: 20000
      }}>
        <CommentPost topic={topic} isTopic={true} isSub={true} />
        <Divider />
        {subComments.map((sc) => (
          <CommentPost key={`sc-${sc.id}`} topic={sc} isSub={true} />
        ))}
        <ForumSendMessage 
          sx={{ p: 2, mt: 'auto' }} 
          message={message} 
          setMessage={setMessage}
          onClick={handlePostSubcomment} 
        />
      </Box>
    </Drawer>
  )
}