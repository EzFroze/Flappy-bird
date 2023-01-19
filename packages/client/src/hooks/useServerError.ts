import { useEffect, useState } from 'react'

export const useServerError = (error: Error) => {
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    setServerError(`⚠ ${error.message || 'Неизвестная ошибка'}`)
  }, [error])

  return [serverError, setServerError]
}
