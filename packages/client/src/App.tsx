import { Routes, Route, Link } from 'react-router-dom'
import { RoutesEnum } from './app/router/types'
import { RequireAuth } from './components/requireAuth/RequireAuth'
import { actionPaths } from './features/forums/types'
import {
  ForumCreateThreadPage,
  ForumsPage,
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
import { ErrorBoundary } from 'react-error-boundary'
import { NavMenu } from './components/navMenu/components/NavMenu'
import './App.css'
import { useEffect } from 'react'

export const App = () => {
  useEffect(() => {
    let message1
    let message2
    Notification.requestPermission().then(function (result) {
      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (result === 'granted') {
        let notification
        notification = new Notification('Flappy-bird!', {
          body: 'Привет, друг! Рады, что ты снами!',
          icon: '/bird/frame-1.png',
        })
        message1 = setTimeout(() => {
          notification = new Notification('Flappy-bird!', {
            body: 'Давай играть?!',
            icon: '/bird/frame-1.png',
          })
        }, 10000)
        message2 = setTimeout(() => {
          notification = new Notification('Flappy-bird!', {
            body: 'Зарегистрируйся и сможешь попасть в таблицу лидеров!',
            icon: '/bird/frame-1.png',
          })
        }, 15000)
      }
    })
    return () => {
      clearTimeout(message1)
      clearTimeout(message2)
    }
  }, [])

  return (
    <>
      <NavMenu />
      <hr />
      <ErrorBoundary FallbackComponent={ServerErrorPage}>
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
          <Route path={RoutesEnum.Forums} element={<ForumsPage />}>
            <Route path={':forum'} element={<ForumPage />}>
              <Route path={':thread'} element={<ForumThreadPage />} />
              <Route
                path={actionPaths.createThread}
                element={<ForumCreateThreadPage />}
              />
            </Route>
          </Route>
          <Route path={RoutesEnum.Leaderboard} element={<LeaderboardPage />} />
          <Route path={RoutesEnum.Game} element={<GamePage />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}
