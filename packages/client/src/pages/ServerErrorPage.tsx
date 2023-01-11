import React from 'react'
import { NotFound } from '../features/notFound/components/NotFound'

export const ServerErrorPage: React.FC = () => {
  return (
    <NotFound
      title="500"
      description="Кажется сервер перестал отвечать, скоро починим"
      link="/"
      linkText="На главную"
    />
  )
}
