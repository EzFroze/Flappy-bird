import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'

export const logout = async (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
  }
  const cacheNames = await caches.keys()

  await Promise.all(cacheNames.map(name => caches.delete(name)))

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.map(registration => registration.unregister())
    })
  }

  return fetch(`${BASE_URL}/auth/logout`, {
    ...requestOptions,
    ...baseOptions,
  })
}
