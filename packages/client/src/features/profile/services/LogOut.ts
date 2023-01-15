import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'

export const logout = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
  }
  return fetch(`${BASE_URL}/auth/logout`, {
    ...requestOptions,
    ...baseOptions,
  })
}
