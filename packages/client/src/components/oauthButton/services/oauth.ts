import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { getWindow, ssrWindow, extend } from 'ssr-window'

/*toDo проверить как будет работать авторизация при деплое на хостинг, возможно отказаться от location */
extend(ssrWindow, {
  location: {
    protocol: 'http',
    host: 'https://bug-and-play-flappy-bird-21.ya-praktikum.tech',
  },
})

const window = getWindow()

export const redirectUrl =
  window.location.protocol + '//' + window.location.host

export const getOAuthUrl = (serviceId: string) =>
  `https://oauth.yandex.ru/authorize/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`

export const getServiceId = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.GET,
  }
  return fetch(
    `${BASE_URL}/oauth/yandex/service-id?redirect_uri=${redirectUrl}`,
    {
      ...requestOptions,
      ...baseOptions,
    }
  )
}

export const oAuthAutorize = (code: string | number): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify({
      code,
      redirect_uri: window.location.protocol + '//' + window.location.host,
    }),
  }

  return fetch(`${BASE_URL}/oauth/yandex/`, {
    ...requestOptions,
    ...baseOptions,
  })
}
