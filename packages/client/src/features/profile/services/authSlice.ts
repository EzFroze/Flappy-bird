import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGetUser } from './GetUser'
import { RootState } from '../../../app/store/store'
import { SignUpData } from '../../sign-up/types'

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    data: undefined as undefined | SignUpData,
    status: 'idle',
    error: '',
  },
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
