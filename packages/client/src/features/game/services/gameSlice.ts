import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
import { RootState } from '../../../app/store/store'

export const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: {
    fullscreen: false as boolean,
  },
  reducers: {
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen
    },
    updateFullscreen(state, action: PayloadAction<boolean>) {
      state.fullscreen = action.payload
    }
  },
})

export const getExampleInput = (state: RootState) => state.example.input

export const { toggleFullscreen, updateFullscreen } = gameSlice.actions

export default gameSlice.reducer
