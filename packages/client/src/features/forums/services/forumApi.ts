import { createAsyncThunk } from '@reduxjs/toolkit'


export const forumApi = {
  fetchData: (): Promise<any[]> => {
    return new Promise(resolve =>
      setTimeout(() => resolve([{ id: 100 }, { id: 101 }, { id: 110 }]), 2000)
    )
  },
}

export const fetchForumData = createAsyncThunk(
  'example/fetchData',
  async () => {
    return forumApi.fetchData()
  }
)
