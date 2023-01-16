import React from 'react'
import { NotFound } from '../features/not-found/components/NotFound'
import { RoutesEnum } from '../app/router/routes'

export const ServerErrorPage: React.FC = () => {
  return (
    <NotFound
      title="500"
      description="Кажется сервер перестал отвечать, скоро починим"
      link={RoutesEnum.SignIn}
      linkText="На главную"
    />
  )
}
