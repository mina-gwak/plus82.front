import { queryOptions } from '@tanstack/react-query'

import { getAcademyMe } from './get-academy-me'

export const academyQueries = {
  all: () => ['academy'],
  me: () =>
    queryOptions({
      queryKey: [...academyQueries.all(), 'me'],
      queryFn: () => getAcademyMe(),
    }),
}
