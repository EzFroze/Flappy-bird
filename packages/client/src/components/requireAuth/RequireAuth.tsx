import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../features/profile/services/authSlice'
import { RoutesEnum } from '../../app/router/types'
import { useStore, useSet } from '../../app/store/hooks'
import { fetchGetUser } from '../../features/profile/services/GetUser'

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useStore(getUser)
  const set = useSet()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.status !== 'success') {
      set(fetchGetUser())
    }
  }, [])

  useEffect(() => {
    if (user.status === 'error') {
      return navigate(RoutesEnum.SignIn)
    }
  }, [user.status])

  return <>{children}</>
}
