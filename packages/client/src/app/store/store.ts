import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from '../../features/example/services/exampleSlice'
import authReducer from '../../features/profile/services/authSlice'
import forumReducer from '../../features/forums/services/forumSlice'
import themeReducer from '../../features/themes/services/themeSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    user: authReducer,
    forum: forumReducer,
    themes: themeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
