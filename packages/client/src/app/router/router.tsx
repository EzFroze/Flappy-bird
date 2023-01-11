import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { SignInPage } from '../../pages/SignInPage'
import { SignUpPage } from '../../pages/SignUpPage'
import { ServerErrorPage } from '../../pages/ServerErrorPage'

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
    path: '/500',
    element: <ServerErrorPage />,
  },
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
