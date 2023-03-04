import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../../app/store/store'
//import { ExampleInitialState } from '../types'
import { getTheme } from './themeApi'
import { blue, grey, teal } from '@mui/material/colors';
import { Theme } from '../types';

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    mode: 'light' as Theme,
    status: 'idle' as 'idle' | 'pending' | 'success' | 'error',
    config: {
      bgr: [grey[50], teal[900]],
      btn: [blue[500], blue[900]],
      txt: [grey[900], grey[50]]
    }
  } as const,
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

export const getThemeConfig = (state: RootState) => state.themes.config 

export const { toggleTheme, updateTheme } = themeSlice.actions

export default themeSlice.reducer
