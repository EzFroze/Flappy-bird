// этот компонент - контейнер для страницы - используем для роутера

import React from 'react'
import { Leaderboard } from '../features/leaderboard/components/Leaderboard'

export const LeaderboardPage: React.FC = () => {
  return (
    <>
      <Leaderboard />
    </>
  )
}
