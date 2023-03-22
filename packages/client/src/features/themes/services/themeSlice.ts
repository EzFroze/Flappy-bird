import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
import { RootState } from '../../../app/store/store'
//import { ExampleInitialState } from '../types'
import { getTheme } from './themeApi'
//import { blue, grey, teal } from '@mui/material/colors';
import { Theme } from '../types';

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: {
    mode: 'light' as Theme,
    status: 'idle' as 'idle' | 'pending' | 'success' | 'error',
    config: {
      bgr: ['', ''],
      btn: ['', ''],
      txt: ['', '']
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
