import { useEffect } from 'react'
import { useSet } from '../app/store/hooks'
import { fetchGetUser } from '../features/profile/services/GetUser'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../features/profile/types'

export const useValidationRoute = (path: string, user: UserData) => {
  const set = useSet()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.data) {
      navigate(path)
    } else {
      set(fetchGetUser())
    }
  }, [user.data])
}
