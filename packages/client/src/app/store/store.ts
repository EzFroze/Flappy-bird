import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../../features/example/services/exampleSlice'
import authReducer from '../../features/profile/services/authSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    user: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
