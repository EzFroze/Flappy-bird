import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { ProfileData } from '../types'
import { RequestOptions, Method } from '../../../app/api/types'

export const profileChange = (data: ProfileData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.PUT,
    body: JSON.stringify(data),
  }
  return fetch(`${BASE_URL}/user/profile`, {
    ...requestOptions,
    ...baseOptions,
  })
}
