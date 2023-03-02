import { Box, Drawer } from "@mui/material"
import { useEffect, useState } from "react"
import { useSet, useStore } from "../../../app/store/hooks"
import { toggleDrawer } from "../services/forumSlice"
import { Topic, Comment } from "../types"
import { CommentPost } from "./CommentPost"
import { ForumSendMessage } from "./ForumSendMessage"

export const CommentDrawer: React.FC<{ topic: Topic | Comment }> = ({ topic }) => {
  const set = useSet()
  const drawerOpen = useStore((state) => state.forum.drawerOpen)

  const [ message, setMessage ] = useState('')

  const handlePostComment = () => {
    if (topic === undefined) return

    const body: Comment & { subCommentId: string } = {
      message,
      user: topic.user,
      postId: topic.id,
      subCommentId: '123'
    }

    console.log('thread bdoy', body)

    fetch('http://localhost:3001/comments/sub', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((res) => res.json()).then((res) => {
      console.log('res comments', res)
      setMessage((c) => c.concat(res))
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
        flexDirection: 'column',
        height: 20000
      }}>
        <CommentPost topic={topic} isTopic={true} isSub={true} />
        <ForumSendMessage 
          sx={{ p: 2, mt: 'auto' }} 
          message={message} 
          setMessage={setMessage}
          onClick={handlePostComment} 
        />
      </Box>
    </Drawer>
  )
}