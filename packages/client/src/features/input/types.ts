import { FieldError } from 'react-hook-form'

export interface Inputs {
  control: any
  name: string
  rules: {
    required: string
    pattern?: {
      value: RegExp
      message: string
    }
    validate?: (value: string) => string | undefined
    maxLength?: {
      value: number
      message: string
    }
    minLength?: {
      value: number
      message: string
    }
  }
  errors: Record<string, FieldError>
  label: string
  handleShow?: boolean
  handleClick?: () => void
  handleMouseDown?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
