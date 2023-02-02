import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { unregisterSW } from './GetUser'

export const logout = async (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
  }
  const cacheNames = await caches.keys()

  await Promise.all(cacheNames.map(name => caches.delete(name)))

  if ('serviceWorker' in navigator) {
    unregisterSW()
  }

  return fetch(`${BASE_URL}/auth/logout`, {
    ...requestOptions,
    ...baseOptions,
  })
}
