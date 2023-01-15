import { BASE_URL } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'

export const avatarChange = (data: FormData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.PUT,
    body: data,
  }
  return fetch(`${BASE_URL}/user/profile/avatar`, {
    ...requestOptions,
  })
}
