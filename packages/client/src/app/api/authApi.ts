import { Method, Options, RequestOptions } from './types'
import { SignUpData } from '../../features/sign-up/types'
import { SignInData } from '../../features/sign-in/types'

const API_BASE_URL = 'https://ya-praktikum.tech/api/v2'
const SIGNIN_URL = `${API_BASE_URL}/auth/signin`
const SIGNUP_URL = `${API_BASE_URL}/auth/signup`
const LOGOUT_URL = `${API_BASE_URL}/auth/logout`
const USER_URL = `${API_BASE_URL}/auth/user`

const options: Options = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
}

export const signup = (data: SignUpData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify(data),
  }
  return fetch(SIGNUP_URL, { ...requestOptions, ...options })
}

export const signin = (data: SignInData): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify(data),
  }
  return fetch(SIGNIN_URL, { ...requestOptions, ...options })
}

export const logout = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
  }
  return fetch(LOGOUT_URL, { ...requestOptions, ...options })
}

export const getUser = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.GET,
  }
  return fetch(USER_URL, { ...requestOptions, ...options })
}
