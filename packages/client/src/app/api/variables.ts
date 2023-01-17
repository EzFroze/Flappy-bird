import { Options } from './types'
const BASE_URL = 'https://ya-praktikum.tech/api/v2'
const baseOptions: Options = {
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
  },
}

export { BASE_URL, baseOptions }
