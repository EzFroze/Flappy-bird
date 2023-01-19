import { useMemo } from 'react'
import { SortOrder, User, UsersFilter } from '../types'

export const useSortedUsers = (
  users: User[],
  sort: keyof User,
  order: SortOrder
) => {
  const sortedUsers: User[] = useMemo(() => {
    if (sort) {
      return [...users].sort((a, b) => {
        if (a[sort] < b[sort]) {
          return order == SortOrder.AscendingOrder ? 1 : -1
        }

        if (a[sort] > b[sort]) {
          return order == SortOrder.AscendingOrder ? -1 : 1
        }

        return 0
      })
    }
    return users
  }, [sort, users, order])

  return sortedUsers
}

export const useUsers = (users: User[], filter: UsersFilter) => {
  const sortedUsers = useSortedUsers(users, filter.sort, filter.order)
  const sortedAndSearchedUsers = useMemo(() => {
    return sortedUsers.filter(user =>
      user.name.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedUsers])

  return sortedAndSearchedUsers
}
