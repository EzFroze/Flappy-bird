import { BASE_URL, baseOptions, teamName } from '../../../app/api/variables'
import { RequestOptions, Method } from '../../../app/api/types'
import { UserStats } from '../types'

export const sendUserResult = (data: UserStats): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify({
      data,
      ratingFieldName: 'progress',
      teamName: teamName,
    }),
  }
  return fetch(`${BASE_URL}/leaderboard`, { ...requestOptions, ...baseOptions })
}

export const getLeaderboard = (): Promise<Response> => {
  const requestOptions: RequestOptions = {
    method: Method.POST,
    body: JSON.stringify({
      ratingFieldName: 'progress',
      cursor: 0,
      limit: 10,
    }),
  }
  return fetch(`${BASE_URL}/leaderboard/${teamName}`, {
    ...requestOptions,
    ...baseOptions,
  })
}

export const transformLeaderboard = (array: { data: UserStats }[]) => {
  return array
    .filter(item => item.data.id && item.data.name && item.data.progress)
    .map((filteredItem, index) => ({
      id: filteredItem.data.id,
      place: index + 1,
      name: filteredItem.data.name,
      avatar: filteredItem.data.avatar,
      progress: filteredItem.data.progress,
    }))
}
