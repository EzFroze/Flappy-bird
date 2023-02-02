import { createAsyncThunk } from '@reduxjs/toolkit'
import { Example } from '../types'

export const exampleApi = {
  fetchData: (): Promise<Example[]> => {
    return new Promise(resolve =>
      setTimeout(() => resolve([{ id: 100 }, { id: 101 }, { id: 110 }]), 2000)
    )
  },
}

export const fetchExampleData = createAsyncThunk('example/fetchData', async () => {
  return exampleApi.fetchData()
})


