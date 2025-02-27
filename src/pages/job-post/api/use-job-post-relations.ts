import { keepPreviousData, useQuery } from '@tanstack/react-query'

import {
  ApplicationStatus,
  jobPostResumeRelationQueries,
} from 'entities/job-post-resume-relation'

export const useJobPostRelations = (active: ApplicationStatus | null) => {
  const { data } = useQuery({
    ...jobPostResumeRelationQueries.list({
      pageNumber: 0,
      rowCount: 10,
      ...(active ? { status: active } : {}),
    }),
    placeholderData: keepPreviousData,
  })

  return {
    applications: data?.content,
  }
}
