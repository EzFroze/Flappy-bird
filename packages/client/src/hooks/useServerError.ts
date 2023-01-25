import { useEffect, useState } from 'react'

export const useServerError = () => {
  const [serverError, setServerError] = useState('')
  const [error, setError] = useState(undefined as undefined | Error)

  useEffect(() => {
    setServerError(error ? `⚠ ${error.message || 'Неизвестная ошибка'}` : '')
  }, [error])

  return { serverError, setError }
}
