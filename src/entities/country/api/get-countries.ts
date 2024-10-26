import { apiClient } from 'shared/api'

import { Country } from '../model/country'

type GetCountriesResponse = Country[]

export const getCountries = async () => {
  const response = await apiClient.get<GetCountriesResponse>('/countries')

  return response
}
