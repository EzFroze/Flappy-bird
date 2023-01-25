import { signin } from '../services/SignIn'
import { SignInData } from '../types'
import { useSet } from '../../../app/store/hooks'
import { fetchGetUser } from '../../profile/services/GetUser'
import { useServerError } from '../../../hooks/useServerError'

export const useSubmit = () => {
  const set = useSet()
  const { serverError, setError } = useServerError()
  const onSubmit = (data: SignInData) => {
    signin(data)
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
