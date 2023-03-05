import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../../features/example/services/exampleSlice'
import authReducer from '../../features/profile/services/authSlice'
import gameReducer from '../../features/game/services/gameSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    user: authReducer,
    game: gameReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
