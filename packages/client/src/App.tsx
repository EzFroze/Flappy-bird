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
} from './pages'

export const App = () => {
  return (
    <>
      <div style={{ display: 'flex', gap: 5 }}>
        {Object.values(RoutesEnum).map((link, i) => {
          return (
            <div key={i}>
              <Link to={link}>{link}</Link>
            </div>
          )
        })}
      </div>
      <hr />
      <Routes>
        <Route index element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
    </>
  )
}
