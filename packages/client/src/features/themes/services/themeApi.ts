import { createAsyncThunk } from '@reduxjs/toolkit'
//import { Example } from '../types'

export const themeApi = {
  fetchData: (arg: 'light' | 'dark'): Promise<'light' | 'dark'> => {
    return new Promise(resolve =>
      setTimeout(() => resolve(arg), 2000)
    )
  },
}

export const getTheme = createAsyncThunk(
  'theme/fetchData',
  async (arg: 'light' | 'dark') => {
    return themeApi.fetchData(arg)
  }
)
