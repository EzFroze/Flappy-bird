// этот компонент - контейнер для страницы - используем для роутера

import React from 'react'
import { Page } from '../features/example/components/Page'

export const ExamplePage: React.FC = () => {
  return (
    <>
      <Page />
    </>
  )
}
