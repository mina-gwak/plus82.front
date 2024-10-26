import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { getCountries } from './get-countries'

export const countryQueries = {
  all: () => ['countries'],
  list: () =>
    queryOptions({
      queryKey: [...countryQueries.all(), 'list'],
      queryFn: getCountries,
      placeholderData: keepPreviousData,
    }),
}
