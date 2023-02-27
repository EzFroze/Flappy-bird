import { Box, Drawer } from "@mui/material"
import { useState } from "react"
import { useSet, useStore } from "../../../app/store/hooks"
import { toggleDrawer } from "../services/forumSlice"
import { CommentPost } from "./CommentPost"
import { ForumSendMessage } from "./ForumSendMessage"

export const CommentDrawer: React.FC<{ topic: any }> = ({ topic }) => {
  const set = useSet()
  const drawerOpen = useStore((state) => state.forum.drawerOpen)

  return (
    <Drawer
      PaperProps={{
        sx: { width: 600 },
      }}
      anchor='right'
      open={drawerOpen}
      onClose={() => set(toggleDrawer())}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <CommentPost topic={topic} isTopic={true} isSub={true} />
        <ForumSendMessage message={''} setMessage={()=>{}} />
      </Box>
    </Drawer>
  )
}