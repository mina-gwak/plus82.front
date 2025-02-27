import { useQuery } from '@tanstack/react-query'

import { countryQueries } from './query'

export const useCountries = () => {
  return useQuery(countryQueries.list())
}
