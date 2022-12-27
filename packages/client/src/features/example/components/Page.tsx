import React from 'react'
import { PageComponent } from './PageComponent'
import { useExample } from '../hooks/useExample'

export const Page: React.FC = () => {
  useExample()

  return (
    <>
      <PageComponent />
    </>
  )
}
