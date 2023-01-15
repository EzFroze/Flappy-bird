import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { ExamplePage } from '../../pages/ExamplePage'
import { ProfilePage } from '../../pages/ProfilePage'
import { PasswordPage } from '../../pages/PasswordPage'
import { SignInPage } from '../../pages/SignInPage'
import { SignUpPage } from '../../pages/SignUpPage'
import { ForumsPage } from '../../pages/ForumsPage'
import { ForumPage } from '../../pages/ForumPage'
import { ForumThreadPage } from '../../pages/ForumThreadPage'
import { ForumCreateThreadPage } from '../../pages/ForumCreateThreadPage'
import { actionPaths } from '../../features/forums/types'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/password',
    element: <PasswordPage />,
  },
  {
    path: '/forums',
    element: <ForumsPage />,
    children: [{
      path: ':forum',
      element: <ForumPage />,
      children: [{
        path: ':thread',
        element: <ForumThreadPage />
      }, {
        path: actionPaths.createThread,
        element: <ForumCreateThreadPage />
      }]
    }]
  }
  // {
  //   path: '/sign-up',
  //   element: <SignUpPage />,
  // },
  // {
  //   path: '/profile',
  //   element: <ProfilePage />,
  // },
  // {
  //   path: '/leaderboard',
  //   element: <LeaderboardPage />,
  // },
  // {
  //   path: '/game',
  //   element: <GamePage />,
  // },
])