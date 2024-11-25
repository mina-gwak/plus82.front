import { isArray, isNull } from 'lodash-es'
import { useContext, useEffect } from 'react'

import { EmptyContext } from 'shared/api/empty/empty-boundary'

export const useEmptyBoundary = (data: unknown, params: unknown) => {
  const context = useContext(EmptyContext)

  if (!context) {
    throw new Error('useEmptyBoundary must be used within EmptyBoundary')
  }

  const { setIsEmpty } = context

  useEffect(() => {
    setIsEmpty(false)
  }, [params, setIsEmpty])

  useEffect(() => {
    const isEmpty = isNull(data) || (isArray(data) && data.length === 0)
    setIsEmpty(isEmpty)
  }, [data, setIsEmpty])
}
