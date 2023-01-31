import { useEffect, useState } from 'react'

export const useServerError = () => {
  const [serverError, setServerError] = useState('')
  const [error, setError] = useState<undefined | Error>(undefined)

  useEffect(() => {
    setServerError(error ? `⚠ ${error.message || 'Неизвестная ошибка'}` : '')
  }, [error])

  return { serverError, setError }
}
