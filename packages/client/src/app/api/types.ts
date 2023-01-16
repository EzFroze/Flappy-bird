export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Headers = {
  [key: string]: string
}

export type Options = {
  headers: Headers
  credentials?: RequestCredentials | undefined
}

export type RequestOptions = {
  method: Method
  body?: string | FormData
}
