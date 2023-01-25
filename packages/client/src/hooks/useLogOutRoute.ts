import { useEffect } from 'react'
import { useSet } from '../app/store/hooks'
import { fetchGetUser } from '../features/profile/services/GetUser'
import { useNavigate } from 'react-router-dom'

export const useLogOutRoute = (path: string, user: any) => {
  const set = useSet()
  const navigate = useNavigate()

  useEffect(() => {
    set(fetchGetUser())
  }, [])

  useEffect(() => {
    if (user.status === 'error') {
      navigate(path)
    }
  }, [user.status])
}
