import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUser = {
  fetchData: () => {
    const requestOptions: RequestOptions = {
      method: Method.GET,
    }

    const res = fetch(`${BASE_URL}/auth/user`, {
      ...requestOptions,
      ...baseOptions,
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        reject()
      }
    })

    return res
  },
}

export const fetchGetUser = createAsyncThunk('user', async () => {
  return getUser.fetchData()
})
function reject() {
  throw new Error('Пользователь не зарегистрирован')
}
