import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  resumeQueries,
  type GetRepresentativeResumesRequest,
} from 'entities/resume'

export const useRepresentativeResumes = (
  params: GetRepresentativeResumesRequest,
) => {
  const { data, isLoading } = useQuery({
    ...resumeQueries.representativeList({
      ...params,
      rowCount: 10,
    }),
    placeholderData: keepPreviousData,
  })

  console.log(params, data)

  return {
    isLoading,
    resumes: data?.content ?? [],
    hasNoResume: data?.content?.length === 0,
    totalPages: data?.totalPages === 0 ? 1 : data?.totalPages,
  }
}
