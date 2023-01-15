import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { PassData } from '../types'
import { RequestOptions, Method } from '../../../app/api/types'

export const passChange = (data: PassData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.PUT,
    body: JSON.stringify(data),
  }
  return fetch(`${BASE_URL}/user/password`, {
    ...requestOptions,
    ...baseOptions,
  })
}
