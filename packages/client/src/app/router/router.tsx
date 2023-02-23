import { createBrowserRouter } from 'react-router-dom'
import { GamePage } from '../../pages/GamePage'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { ExamplePage } from '../../pages/ExamplePage'
import { LeaderboardPage } from '../../pages/LeaderboardPage'
import { ProfilePage } from '../../pages/ProfilePage'
import { PasswordPage } from '../../pages/PasswordPage'
import { SignInPage } from '../../pages/SignInPage'
import { SignUpPage } from '../../pages/SignUpPage'
import { RoutesEnum } from './types'
import { ServerErrorPage } from '../../pages/ServerErrorPage'
import { ForumsPage } from '../../pages/ForumsPage'
import { ForumPage } from '../../pages/ForumPage'
import { ForumThreadPage } from '../../pages/ForumThreadPage'
import { ForumCreateThreadPage } from '../../pages/ForumCreateThreadPage'
import { actionPaths } from '../../features/forums/types'
import { RequireAuth } from '../../components/requireAuth/RequireAuth'
import { ProfileChangePage } from '../../pages/ProfileChangePage'

export const router = createBrowserRouter([
  {
    path: RoutesEnum.NotFound,
    element: <NotFoundPage />,
  },
  {
    path: RoutesEnum.SignIn,
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RoutesEnum.SignUp,
    element: <SignUpPage />,
  },
  {
    path: RoutesEnum.Example,
    element: <ExamplePage />,
  },
  {
    path: RoutesEnum.ServerError,
    element: <ServerErrorPage />,
  },
  {
    path: RoutesEnum.ServerError,
    element: <ServerErrorPage />,
  },
  {
    path: RoutesEnum.Profile,
    element: (
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    ),
  },
  {
    path: RoutesEnum.ProfileChange,
    element: (
      <RequireAuth>
        <ProfileChangePage />
      </RequireAuth>
    ),
  },
  {
    path: RoutesEnum.Password,
    element: (
      <RequireAuth>
        <PasswordPage />
      </RequireAuth>
    ),
  },
  {
    path: 'forum',
    element: <ForumPage />,
    children: [
      {
        path: ':thread',
        element: <ForumThreadPage />,
      },
      {
        path: actionPaths.createThread,
        element: <ForumCreateThreadPage />,
      },
    ],
  },
  {
    path: RoutesEnum.Leaderboard,
    element: <LeaderboardPage />,
  },
  {
    path: RoutesEnum.Game,
    element: <GamePage />,
  },
])
