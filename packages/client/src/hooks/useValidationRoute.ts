import { useEffect } from 'react'
import { useSet } from '../app/store/hooks'
import { fetchGetUser } from '../features/profile/services/GetUser'
import { useNavigate } from 'react-router-dom'

export const useValidationRoute = (path: string, user: any) => {
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
