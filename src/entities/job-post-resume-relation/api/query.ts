import { queryOptions } from '@tanstack/react-query'

import {
  getJobPostResumeRelations,
  GetJobPostResumeRequest,
} from './get-job-post-resume'

export const jobPostResumeRelationQueries = {
  all: () => ['job-post-resume-relation'],
  lists: () => [...jobPostResumeRelationQueries.all(), 'list'],
  list: (params: GetJobPostResumeRequest) =>
    queryOptions({
      queryKey: [...jobPostResumeRelationQueries.lists(), params],
      queryFn: () => getJobPostResumeRelations(params),
    }),
}
