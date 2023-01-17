import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { SignInData } from '../types'

export const signin = (data: SignInData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify(data),
  }
  return fetch(`${BASE_URL}/auth/signin`, { ...requestOptions, ...baseOptions })
}
