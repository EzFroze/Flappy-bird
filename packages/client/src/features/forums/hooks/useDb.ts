import { useEffect, useState } from "react"
import { DbRequest } from "../types"

export const useDb = <T>(
  model: DbRequest['model'], 
  method: DbRequest['method'] = 'get'
) => {
  const [ result, setResult ] = useState<T>()
  const [ error, setError ] = useState<any>()
  const [ loading, setLoading ] = useState(false)

  const request = async ({ id, body }: Partial<Pick<DbRequest, 'id' | 'body'>>) => {
    setLoading(true)
    fetch(`http://localhost:3001/${model}/${id || ''}`, {
      method,
      body,
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => setResult(result))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }

  return [ request, { result, error, loading }] as const
}