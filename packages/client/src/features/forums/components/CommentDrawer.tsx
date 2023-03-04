import { Box, Divider, Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { baseOptions, BASE_URL } from "../../../app/api/variables"
import { useSet, useStore } from "../../../app/store/hooks"
import { useDb } from "../../../hooks/useDb"
import { toggleDrawer } from "../services/forumSlice"
import { Topic, Comment, User, Subcomment } from "../types"
import { CommentPost } from "./CommentPost"
import { ForumSendMessage } from "./ForumSendMessage"

export const CommentDrawer: React.FC<{ topic: Topic | Comment }> = ({ topic }) => {
  const set = useSet()
  const drawerOpen = useStore((state) => state.forum.drawerOpen)

  const [ message, setMessage ] = useState('')
  const [ user, setUser ] = useState<User>()

  const [ 
    getSubcomments, 
    { result: subcomments } 
  ] = useDb<Subcomment[]>('subcomments')
  const [ postSubcomments ] = useDb<Subcomment[]>('subcomments', 'post')

  useEffect(() => {
    if (!topic?.id) return

    getSubcomments({ id: topic.id })
  }, [topic?.id])

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then(r => r.json())
      .then((res) => setUser(res))
  }, [])

  const handlePostSubcomment = async () => {
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

    await postSubcomments({ body: JSON.stringify(body) })

    setMessage('')
    getSubcomments({ id: topic.id })
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
        {(subcomments || []).map((sc) => (
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