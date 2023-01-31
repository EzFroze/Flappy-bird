import { SignUpData } from '../types'
import { signup } from '../services/SignUp'
import { useSet } from '../../../app/store/hooks'
import { fetchGetUser } from '../../profile/services/GetUser'
import { useServerError } from '../../../hooks/useServerError'

export const useSignUpSubmit = () => {
  const set = useSet()
  const { serverError, setError } = useServerError()
  const onSubmit = (data: SignUpData) => {
    signup(data)
      .then(response => {
        if (response.status === 200) {
          set(fetchGetUser())
        } else {
          return response.json()
        }
      })
      .then(result => {
        setError(new Error(`${result.reason}`))
      })
      .catch(setError)
  }

  return { onSubmit, serverError }
}
