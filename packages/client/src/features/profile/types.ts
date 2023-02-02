import { SignUpData } from '../sign-up/types'
export interface Lists {
  label: string
  text?: string
  name?: string
  handleChange?: (e: any) => void
  defaultVal?: string
}

export interface UserData {
  data: undefined | SignUpData
  status: string
  error: string
}
