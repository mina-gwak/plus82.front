import { useQuery } from '@tanstack/react-query'

import { countryQueries } from 'entities/country'

export const useCountries = () => {
  return useQuery(countryQueries.list())
}
