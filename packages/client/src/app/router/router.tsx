import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { ExamplePage } from '../../pages/ExamplePage'
import { ServerErrorPage } from '../../pages/ServerErrorPage'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/',
    element: <ExamplePage />,
  },
  {
    path: '/500',
    element: <ServerErrorPage />,
  },
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
