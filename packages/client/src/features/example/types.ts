export interface Example {
  id: number
}

export type ExampleType = {
  name: string
}

export type ExampleInitialState = {
  input: string
  select: number
  data: Example[]
  status: 'idle' | 'pending' | 'success' | 'error'
}
