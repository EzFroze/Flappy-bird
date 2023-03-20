import { PayloadAction } from '@reduxjs/toolkit'
import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = ((toolkitRaw as any).default ?? toolkitRaw) as typeof toolkitRaw;
import { RootState } from '../../../app/store/store'
import { ExampleInitialState } from '../types'
import { fetchExampleData } from './exampleApi'

export const exampleSlice = createSlice({
  name: 'exampleSlice',
  initialState: {
    input: 'example default value',
    select: 0,
    data: [],
    status: 'idle',
  } as ExampleInitialState,
  reducers: {
    exampleInput(state, { payload }: PayloadAction<string>) {
      state.input = payload
    },
    exampleSelect(state, { payload }: PayloadAction<number | string>) {
      state.select = Number(payload)
    },
    clearExample(state) {
      state.input = ''
      state.select = 0
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchExampleData.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.data = payload
    }),
      builder.addCase(fetchExampleData.pending, state => {
        state.status = 'pending'
      }),
      builder.addCase(fetchExampleData.rejected, state => {
        state.status = 'error'
      })
  },
})

export const getExampleInput = (state: RootState) => state.example.input

export const { exampleInput, exampleSelect, clearExample } =
  exampleSlice.actions

export default exampleSlice.reducer
