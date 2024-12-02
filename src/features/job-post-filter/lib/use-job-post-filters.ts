import { useMemo, useState } from 'react'

import { FilterValue } from 'shared/ui'

import { JobPostFilter } from '../model/filter'

const defaultFilters: JobPostFilter = {
  locations: [],
  studentTypes: [],
  searchText: '',
}

const FILTER_LIMIT = 5

type Props = {
  defaultFilters?: JobPostFilter | null
}

export const useJobPostFilters = ({
  defaultFilters: defaultFilterProp,
}: Props) => {
  const [filters, setFilters] = useState<JobPostFilter>(
    defaultFilterProp ?? defaultFilters,
  )

  const isFilterExist =
    [...filters.locations, ...filters.studentTypes].length > 0

  const selectionLimit = useMemo(
    () => ({
      locations: FILTER_LIMIT - filters.studentTypes.length,
      studentTypes: FILTER_LIMIT - filters.locations.length,
    }),
    [filters],
  )

  const updateLocationFilter = (updatedLocations: FilterValue[]) => {
    setFilters(prev => ({
      ...prev,
      locations: updatedLocations,
    }))
  }

  const updateStudentTypeFilter = (updatedStudentTypes: FilterValue[]) => {
    setFilters(prev => ({
      ...prev,
      studentTypes: updatedStudentTypes,
    }))
  }

  const updateSearchText = (updatedSearchText: string) => {
    setFilters(prev => ({
      ...prev,
      searchText: updatedSearchText,
    }))
  }

  const removeLocationFilter = (locationToBeRemoved: FilterValue) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.filter(
        location => location !== locationToBeRemoved,
      ),
    }))
  }

  const removeStudentTypeFilter = (studentTypeToBeRemoved: FilterValue) => {
    setFilters(prev => ({
      ...prev,
      studentTypes: prev.studentTypes.filter(
        studentType => studentType !== studentTypeToBeRemoved,
      ),
    }))
  }

  const resetFilters = () => setFilters(defaultFilters)

  return {
    filters,
    isFilterExist,
    selectionLimit,
    updateLocationFilter,
    updateStudentTypeFilter,
    updateSearchText,
    removeLocationFilter,
    removeStudentTypeFilter,
    resetFilters,
  }
}
