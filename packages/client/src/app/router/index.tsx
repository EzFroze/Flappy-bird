import { createBrowserRouter } from 'react-router-dom'
import {
  SignIn,
  SignUp,
  Game,
  Profile,
  Leaderboard,
  NotFound,
} from '../../pages'

export const routes = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/game',
    element: <Game />,
  },
])
