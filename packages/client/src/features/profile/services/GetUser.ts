import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'

export const getUser = async (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.GET,
  }
  const response = await fetch(`${BASE_URL}/auth/user`, {
    ...requestOptions,
    ...baseOptions,
  })

  if ('serviceWorker' in navigator && response.status === 200) {
    navigator.serviceWorker.register('/serviceWorker.js')
  } else {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.map(registration => registration.unregister())
    })
  }

  return response
}
