import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'

export const forumSlice = createSlice({
  name: 'forumSlice',
  initialState: {
    drawerOpen: false,
    drawerComment: '',
    selectedComment: 0,
    users: [] as User[]
  },
  reducers: {
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen
    },
    drawerComment(state, { payload }: PayloadAction<string>) {
      state.drawerComment = payload
    },
    selectedComment(state, { payload }: PayloadAction<number>) {
      state.selectedComment = payload
    },
    updateUsers(state, { payload }: PayloadAction<User[]>) {
      state.users = payload
    }
  },
})

export const { toggleDrawer, drawerComment, selectedComment } = forumSlice.actions

export default forumSlice.reducer
