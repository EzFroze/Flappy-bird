import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { SignUpData } from '../types'

export const signup = (data: SignUpData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify(data),
  }
  return fetch(`${BASE_URL}/auth/signup`, { ...requestOptions, ...baseOptions })
}
