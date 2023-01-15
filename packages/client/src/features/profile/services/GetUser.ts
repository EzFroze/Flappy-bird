import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'

export const getUser = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.GET,
  }
  return fetch(`${BASE_URL}/auth/user`, { ...requestOptions, ...baseOptions })
}
