import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store/store'
import { User } from '../types'

export const forumSlice = createSlice({
  name: 'forumSlice',
  initialState: {
    drawerOpen: false,
    drawerComment: '',
    selectedComment: 0,
    users: [] as User[],
    user: undefined as User | undefined,
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
    },
    saveUser(state, { payload }: PayloadAction<User>) {
      state.user = payload
    },
  },
})

export const userSelector = (state: RootState) => state.forum.user

export const {
  toggleDrawer,
  drawerComment,
  selectedComment,
  saveUser,
  updateUsers,
} = forumSlice.actions

export default forumSlice.reducer
