import { SignUpData } from '../sign-up/types'
export interface Lists {
  label: string
  text?: string
  name?: string
  handleChange?: (e: any) => void
  defaultVal?: string
}
interface UserInformation extends SignUpData {
  id: number
}

export interface UserData {
  data: undefined | UserInformation
  status: string
  error: string
}
