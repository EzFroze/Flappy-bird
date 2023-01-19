import { useState } from 'react'

export const useFetching = (
  callback: (usersInPage: number, page: number) => void
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetching = async (usersInPage: number, page: number) => {
    try {
      setIsLoading(true)
      callback(usersInPage, page)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error]
}
