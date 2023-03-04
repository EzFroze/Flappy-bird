import { Box, createTheme, IconButton, ThemeProvider } from '@mui/material'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { RoutesEnum } from './app/router/types'
import { RequireAuth } from './components/requireAuth/RequireAuth'
import { actionPaths, User } from './features/forums/types'
import { toggleTheme, updateTheme } from './features/themes/services/themeSlice'
import {
  ForumCreateThreadPage,
  ForumPage,
  ForumThreadPage,
  GamePage,
  LeaderboardPage,
  NotFoundPage,
  PasswordPage,
  ProfileChangePage,
  ProfilePage,
  ServerErrorPage,
  SignInPage,
  SignUpPage,
  ExamplePage,
} from './pages'

import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSet, useStore } from './app/store/hooks'
import { useEffect, useState } from 'react'
import { useDb } from './hooks/useDb'
import { baseOptions, BASE_URL } from './app/api/variables'
import { grey, teal } from '@mui/material/colors';

import './App.css'

let themeEnabled = false

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[500]
    },
    error: {
      main: grey[300]
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h3: {
          color: grey[50]
        },
      }
    }
  }
})

export const App = () => {
  const theme = useStore((s) => s.themes.mode)
  const set = useSet()
  const [ user, setUser ] = useState<Partial<User & { theme: 'light' | 'dark' }>>({})

  const [ createUser ] = useDb('users', 'post')
  const [ getUsers ] = useDb<User[]>('users')

  useEffect(() => {
    const body = document.querySelector('body')
    
    body.style.background = theme === 'light' ? 'white' : 'black'
  }, [theme])

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, baseOptions)
      .then((response) => response.json())
      .then(({ id, display_name, login, avatar }) => {
        if (!id) return

        // check if user in db
        getUsers({}).then((users) => {
          const user = users.find((user) => user.id === id)

          // adding user to db
          if (!user) {
            createUser({ 
              body: JSON.stringify({ 
                id, display_name, login, avatar, 
                theme
              }) 
            })
          } else {
            set(updateTheme(user.theme))
          }
        }).finally(() => {
          // user is logger so we add him to local state
          setUser({ id, display_name, login, avatar, theme })
        })
      }).then(() => themeEnabled = true)
  }, [])

  useEffect(() => {
    if (!user?.id) return
    if (!themeEnabled) return

    // updating user and theme
    createUser({ 
      body: JSON.stringify({ ...user, theme }) 
    })
  }, [theme])

  return (
    <ThemeProvider theme={ theme === 'light' ? lightTheme : darkTheme }>
      <Box sx={{ height: 20 }}></Box>
        <Box sx={{ position: 'absolute', top: 0, right: 0, height: 20 }}>
          {user.login}
          <IconButton onClick={() => {
            set(toggleTheme())
          }}>{
                theme === 'dark' ? <ModeNightIcon /> : <LightModeIcon />
              }</IconButton>
        </Box>
      <Routes>
        <Route index element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path={RoutesEnum.Example} element={<ExamplePage />} />
        <Route path={RoutesEnum.SignUp} element={<SignUpPage />} />
        <Route path={RoutesEnum.ServerError} element={<ServerErrorPage />} />
        <Route
          path={RoutesEnum.Profile}
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path={RoutesEnum.ProfileChange}
          element={
            <RequireAuth>
              <ProfileChangePage />
            </RequireAuth>
          }
        />
        <Route
          path={RoutesEnum.Password}
          element={
            <RequireAuth>
              <PasswordPage />
            </RequireAuth>
          }
        />
        <Route path={RoutesEnum.Forums} element={
            <RequireAuth><ForumPage /></RequireAuth>
          }>
          <Route path={':thread'} element={
            <RequireAuth><ForumThreadPage /></RequireAuth>
          } />
          <Route
            path={actionPaths.createThread}
            element={<RequireAuth><ForumCreateThreadPage /></RequireAuth>}
          />
        </Route>
        <Route path={RoutesEnum.Leaderboard} element={<LeaderboardPage />} />
        <Route path={RoutesEnum.Game} element={
          <RequireAuth><GamePage /></RequireAuth>
        } />
      </Routes>
    </ThemeProvider>
  )
}
