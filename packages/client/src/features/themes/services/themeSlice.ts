import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store/store'
//import { ExampleInitialState } from '../types'
import { getTheme } from './themeApi'
import { blue } from '@mui/material/colors';
import { Theme } from '../types';

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    mode: 'light' as 'light' | 'dark',
    status: 'idle' as 'idle' | 'pending' | 'success' | 'error',
  } as const ,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    updateTheme(state, { payload }: PayloadAction<Theme>) {
      state.mode = payload
    },

  },
  extraReducers(builder) {
    builder.addCase(getTheme.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.mode = payload
    }),
      builder.addCase(getTheme.pending, state => {
        state.status = 'pending'
      }),
      builder.addCase(getTheme.rejected, state => {
        state.status = 'error'
      })
  },
})

export const { toggleTheme, updateTheme } = themeSlice.actions

export default themeSlice.reducer
