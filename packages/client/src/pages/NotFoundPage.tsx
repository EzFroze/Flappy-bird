import React from 'react'
import { RoutesEnum } from '../app/router/routes'
import { NotFound } from '../features/notFound/components/NotFound'

export const NotFoundPage: React.FC = () => {
  return (
    <NotFound
      title="404"
      description="Не туда попали"
      link={RoutesEnum.SignIn}
      linkText="Назад на главную"
    />
  )
}
