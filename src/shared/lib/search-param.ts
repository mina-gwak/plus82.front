import { isArray, isNil } from 'lodash-es'

import { NewObject } from 'shared/type'

import { isNilOrEmptyString } from './helper'

export const convertToSearchParams = <T extends NewObject>(
  params: T | null,
) => {
  const searchParams = new URLSearchParams()

  if (isNil(params)) return searchParams.toString()

  Object.entries(params).forEach(([key, value]) => {
    if (isNilOrEmptyString(value) || (isArray(value) && value.length === 0))
      return
    searchParams.set(key, value)
  })

  return searchParams.toString()
}
