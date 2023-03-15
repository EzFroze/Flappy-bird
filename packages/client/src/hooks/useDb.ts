import { useEffect, useState } from "react"
import { DbRequest } from "../features/forums/types"

export const useDb = <T>(
  model: DbRequest['model'], 
  method: DbRequest['method'] = 'get'
) => {
  const [ result, setResult ] = useState<T | undefined>()
  const [ error, setError ] = useState<any>()
  const [ loading, setLoading ] = useState(false)

  const request = async ({ 
    id, body, params 
  }: Partial<Pick<DbRequest, 'id' | 'body' | 'params'>>) => {
    setLoading(true)

    const urlId = `https://bug-and-play-flappy-bird-21.ya-praktikum.tech/${model}/${id || ''}`
    const urlParams = `https://bug-and-play-flappy-bird-21.ya-praktikum.tech/${model}/${params}`

    try {
      const response = await fetch(params ? urlParams : urlId, {
        method,
        body,
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
        },
      })
  
      const result = await response.json() as T

      setResult(result)

      return result
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return [ request, { result, error, loading }] as const
}