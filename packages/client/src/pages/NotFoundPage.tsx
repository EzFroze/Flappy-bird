import React from 'react'
import { NotFound } from '../features/notFound/components/NotFound'

export const NotFoundPage: React.FC = () => {
  return (
    <NotFound
      title="404"
      description="Не туда попали"
      link="/"
      linkText="Назад на главную"
    />
  )
}
