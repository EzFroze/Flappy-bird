import { createBrowserRouter } from 'react-router-dom'
import {
  // SignIn,
  // SignUp,
  // Game,
  // Profile,
  // Leaderboard,
  NotFoundPage,
} from '../../pages'

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  // {
  //   path: '/',
  //   element: <SignInPage />,
  // },
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
