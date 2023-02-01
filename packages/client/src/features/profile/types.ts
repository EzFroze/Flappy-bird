import { SignUpData } from '../sign-up/types'
export interface Lists {
  label: string
  text?: string
  name?: string
  handleChange?: () => void
  disabled: boolean
}

export interface UserData {
  data: undefined | SignUpData
  status: string
  error: string
}
