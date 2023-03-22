import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
import { fetchGetUser } from './GetUser'
import { RootState } from '../../../app/store/store'
import { UserData } from '../types'

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    data: undefined,
    status: 'idle',
    error: '',
  } as UserData,
  reducers: {
    clearUser(state) {
      state.data = undefined
      state.status = 'error'
      state.error = 'Пользователь не авторизован'
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchGetUser.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.data = payload
    }),
      builder.addCase(fetchGetUser.pending, state => {
        state.status = 'pending'
      }),
      builder.addCase(fetchGetUser.rejected, state => {
        state.status = 'error'
      })
  },
})

export const getUser = (state: RootState) => state.user

export const { clearUser } = authSlice.actions

export default authSlice.reducer
