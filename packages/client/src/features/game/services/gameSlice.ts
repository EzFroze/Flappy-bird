import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  },
})

export const getExampleInput = (state: RootState) => state.example.input

export const { toggleFullscreen } = gameSlice.actions

export default gameSlice.reducer
