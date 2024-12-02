import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

import type { FilterValue } from './use-filter'

type FilterState = {
  name: string
  close: () => void
  hasChecked: (value: FilterValue) => boolean
  hasLimitExceeded: (values: FilterValue[]) => boolean
  updateCheckedValues: (value: FilterValue) => FilterValue[]
}

const FilterContext = createContext<FilterState | null>(null)

export const useFilterContext = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('This component must be used within Filter component')
  }

  return context
}

type FilterProviderProps = {
  value: FilterState
}

export const FilterProvider = ({
  value,
  children,
}: PropsWithChildren<FilterProviderProps>) => {
  const { name, close, hasChecked, hasLimitExceeded, updateCheckedValues } =
    value

  const contextValue = useMemo(
    () => ({
      name,
      close,
      hasChecked,
      hasLimitExceeded,
      updateCheckedValues,
    }),
    [name, close, hasChecked, hasLimitExceeded, updateCheckedValues],
  )

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}
