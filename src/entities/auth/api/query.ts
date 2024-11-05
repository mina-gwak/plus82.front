import { queryOptions } from '@tanstack/react-query'

import {
  checkCodeValidity,
  type CheckCodeValidityRequest,
} from './check-code-validity'

export const authQueries = {
  all: () => ['auth'],
  password: () => [authQueries.all(), 'password'],
  validate: (params: CheckCodeValidityRequest) =>
    queryOptions({
      queryKey: [...authQueries.password(), 'validate', params],
      queryFn: () => checkCodeValidity(params),
    }),
}
