import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  ApplicationStatus,
  jobPostResumeRelationQueries,
} from 'entities/job-post-resume-relation'

export const useJobPostRelations = ({
  status,
  pageNumber,
}: {
  status: ApplicationStatus
  pageNumber: number
}) => {
  const { data } = useQuery({
    ...jobPostResumeRelationQueries.businessList({
      pageNumber,
      rowCount: 10,
      status,
    }),
    placeholderData: keepPreviousData,
  })

  return {
    applications: data?.content ?? [],
    totalPages: data?.totalPages === 0 ? 1 : data?.totalPages,
  }
}
