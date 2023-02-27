import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store/store'
//import { ExampleInitialState } from '../types'
import { fetchForumData } from './forumApi'

export const forumSlice = createSlice({
  name: 'forumSlice',
  initialState: {
    drawerOpen: false,
    drawerComment: '',
    selectedComment: 0,
    data: [],
    status: 'idle',
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
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchForumData.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.data = payload
    }),
    builder.addCase(fetchForumData.pending, state => {
      state.status = 'pending'
    }),
    builder.addCase(fetchForumData.rejected, state => {
      state.status = 'error'
    })
  },
})

export const { toggleDrawer, drawerComment, selectedComment } = forumSlice.actions

export default forumSlice.reducer
