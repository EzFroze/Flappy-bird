import { Typography, Container } from '@mui/material'
import { FC, useEffect, useState, useMemo } from 'react'
import UsersList from './UsersList'
import { useFetching } from '../hooks/useFetching'
import UsersService from '../services/UsersService'
import { getPageCount } from '../utils/pages'
import { useUsers } from '../hooks/useUsers'
import { FetchUsersType, SortOrder, User, UsersFilter } from '../types'
import { ColumnHeader } from './ColumnHeader'
import { styles } from '../styles/styles'
import { getUser } from '../../profile/services/authSlice'
import { RoutesEnum } from '../../../app/router/types'
import { useStore } from '../../../app/store/hooks'
import { useLogOutRoute } from '../../../hooks/useLogOutRoute'

export const Leaderboard: FC = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [usersInPage, setUsersInPage] = useState(15)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState<UsersFilter>({
    sort: 'place',
    query: '',
    order: SortOrder.DescendingOrder,
  })
  const sortedAndSearchedUsers = useUsers(users, filter)

  const [fetchUsers, isUsersLoading, userError] = useFetching(
    async (usersInPage: number, page: number) => {
      const [users, headers] = await UsersService.getTop(usersInPage, page)
      const totalCount = headers.get('x-total-count')
      setUsers(users)
      setTotalPages(getPageCount(totalCount, usersInPage))
    }
  )

  const sortFields: Record<keyof User, SortOrder> = useMemo(() => {
    return {
      id: SortOrder.DescendingOrder,
      place: SortOrder.DescendingOrder,
      name: SortOrder.DescendingOrder,
      scores: SortOrder.DescendingOrder,
      date: SortOrder.DescendingOrder,
    }
  }, [])

  const user = useStore(getUser)

  useLogOutRoute(RoutesEnum.SignIn, user)

  useEffect(() => {
    ;(fetchUsers as FetchUsersType)(usersInPage, page)
  }, [page, usersInPage])

  const changeSortOrder = (sort: keyof User) => {
    let order = sortFields[sort]

    Object.keys(sortFields).forEach(
      key => (sortFields[key as keyof User] = SortOrder.DescendingOrder)
    )

    order == SortOrder.AscendingOrder
      ? (order = SortOrder.DescendingOrder)
      : (order = SortOrder.AscendingOrder)
    sortFields[sort] = order
    setFilter({ ...filter, sort, order })
  }

  return (
    <Container sx={styles.startContainer}>
      <Typography textAlign={'center'} variant="h4">
        Результаты
      </Typography>
      <Container disableGutters sx={styles.horizontalContainer}>
        <ColumnHeader
          text="Место"
          width={150}
          changeSortOrder={changeSortOrder}
          sortField={'place'}
          sortOrder={sortFields.place}
        />
        <ColumnHeader
          text="Игрок"
          width={200}
          changeSortOrder={changeSortOrder}
          sortField={'name'}
          sortOrder={sortFields.name}
        />
        <ColumnHeader
          text="Счёт"
          width={200}
          changeSortOrder={changeSortOrder}
          sortField={'scores'}
          sortOrder={sortFields.scores}
        />
        <ColumnHeader
          text="Дата"
          width={200}
          changeSortOrder={changeSortOrder}
          sortField={'date'}
          sortOrder={sortFields.date}
        />
      </Container>
      <UsersList users={sortedAndSearchedUsers} />
    </Container>
  )
}
