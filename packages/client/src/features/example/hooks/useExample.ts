import { useEffect, useState } from 'react'

export const useExample = (arg?: unknown) => {
  const [data, setData] = useState<unknown | null>(null)

  useEffect(() => {
    console.log('example hook argument', arg)
  }, [arg])

  return [data, setData]
}
