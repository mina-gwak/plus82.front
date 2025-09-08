import { queryOptions } from '@tanstack/react-query'

import { getBusinessUserMe, getUserMe } from './get-user-me'

export const userQueries = {
  all: () => ['user'],
  teacherMe: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'me', 'teacher'],
      queryFn: getUserMe,
    }),
  businessMe: () =>
    queryOptions({
      queryKey: [...userQueries.all(), 'me', 'business'],
      queryFn: getBusinessUserMe,
    }),
}
