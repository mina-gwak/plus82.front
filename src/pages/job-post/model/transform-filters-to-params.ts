import { isNil } from 'lodash-es'

import { GetJobPostsRequest, Location, StudentType } from 'entities/job-post'
import { JobPostFilter } from 'features/job-post-filter'

export const transformFiltersToParams = (
  filter?: JobPostFilter | null,
): Omit<GetJobPostsRequest, 'pageNumber' | 'rowCount'> => {
  if (isNil(filter)) return {}

  const params: Omit<GetJobPostsRequest, 'pageNumber' | 'rowCount'> = {
    locationTypeList: filter.locations as unknown as Location[],
  }

  if (filter.searchText) {
    params.searchText = filter.searchText
  }

  if (filter.studentTypes.includes(StudentType.KINDERGARTEN)) {
    params.forKindergarten = true
  }

  if (filter.studentTypes.includes(StudentType.ELEMENTARY)) {
    params.forElementary = true
  }

  if (filter.studentTypes.includes(StudentType.MIDDLE_SCHOOL)) {
    params.forMiddleSchool = true
  }

  if (filter.studentTypes.includes(StudentType.HIGH_SCHOOL)) {
    params.forHighSchool = true
  }

  if (filter.studentTypes.includes(StudentType.ADULT)) {
    params.forAdult = true
  }

  return params
}
