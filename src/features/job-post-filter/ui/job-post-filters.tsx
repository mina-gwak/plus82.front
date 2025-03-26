import { ChangeEvent, KeyboardEvent } from 'react'

import { Location, StudentType } from 'entities/job-post'
import { useDebounce } from 'shared/lib'
import { Chip, Filter, FilterValue, TextField } from 'shared/ui'

import { useJobPostFilters } from '../lib/use-job-post-filters'
import { JobPostFilter } from '../model/filter'
import { ResetButton } from '../ui/reset-button'

type Props = {
  defaultFilters?: JobPostFilter | null
  useSearchField?: boolean
  onChange: (filters: JobPostFilter | null) => void
}

export const JobPostFilters = ({
  defaultFilters,
  useSearchField = false,
  onChange,
}: Props) => {
  const {
    filters,
    isFilterExist,
    selectionLimit,
    updateLocationFilter,
    updateStudentTypeFilter,
    updateSearchText,
    removeLocationFilter,
    removeStudentTypeFilter,
    resetFilters,
  } = useJobPostFilters({ defaultFilters })

  const { debouncedCallback, immediateCallback } = useDebounce(onChange, 1000)

  const handleLocationFilterRemove = (locationToBeRemoved: FilterValue) => {
    removeLocationFilter(locationToBeRemoved)
    onChange({
      ...filters,
      locations: filters.locations.filter(
        location => location !== locationToBeRemoved,
      ),
    })
  }

  const handleStudentTypeFilterRemove = (
    studentTypeToBeRemoved: FilterValue,
  ) => {
    removeStudentTypeFilter(studentTypeToBeRemoved)
    onChange({
      ...filters,
      studentTypes: filters.studentTypes.filter(
        studentType => studentType !== studentTypeToBeRemoved,
      ),
    })
  }

  const handleFilterReset = () => {
    resetFilters()
    onChange(null)
  }

  const handleFilterClose = () => {
    onChange(filters)
  }

  const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    updateSearchText(newValue)
    debouncedCallback({ ...filters, searchText: newValue })
  }

  const handleSearchTextKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      immediateCallback({ ...filters, searchText: event.currentTarget.value })
    }
  }

  return (
    <div className="flex justify-between">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2">
          <Filter
            name="location"
            value={filters.locations}
            selectionLimit={selectionLimit.locations}
            onChange={updateLocationFilter}
            onClose={handleFilterClose}
          >
            {Object.keys(Location).map(key => (
              <Filter.Item key={key} value={key}>
                {Location[key as keyof typeof Location]}
              </Filter.Item>
            ))}
          </Filter>
          <Filter
            name="studentType"
            value={filters.studentTypes}
            selectionLimit={selectionLimit.studentTypes}
            onChange={updateStudentTypeFilter}
            onClose={handleFilterClose}
          >
            {Object.keys(StudentType).map(key => (
              <Filter.Item
                key={key}
                value={StudentType[key as keyof typeof StudentType]}
              >
                {StudentType[key as keyof typeof StudentType]}
              </Filter.Item>
            ))}
          </Filter>
          {isFilterExist && <ResetButton onClick={handleFilterReset} />}
        </div>
        {isFilterExist && (
          <div className="flex flex-wrap gap-2">
            {filters.locations.map(location => (
              <Chip key={location} selected>
                <Chip.Label>
                  {Location[location as keyof typeof Location]}
                </Chip.Label>
                <Chip.RemoveButton
                  onClick={() => handleLocationFilterRemove(location)}
                />
              </Chip>
            ))}
            {filters.studentTypes.map(studentType => (
              <Chip key={studentType} selected>
                <Chip.Label>{studentType}</Chip.Label>
                <Chip.RemoveButton
                  onClick={() => handleStudentTypeFilterRemove(studentType)}
                />
              </Chip>
            ))}
          </div>
        )}
      </div>
      {useSearchField && (
        <TextField
          value={filters.searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleSearchTextKeyDown}
          placeholder="Search jobs by keywords"
        />
      )}
    </div>
  )
}
