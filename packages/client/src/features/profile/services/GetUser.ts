import { BASE_URL, baseOptions } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import * as toolkitRaw from '@reduxjs/toolkit';
const { createAsyncThunk } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;

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
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/serviceWorker.js')
        }
        return response.json()
      } else if (response.status !== 200) {
        if ('serviceWorker' in navigator) {
          unregisterSW()
        }
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

export const unregisterSW = () => {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    registrations.map(registration => registration.unregister())
  })
}
