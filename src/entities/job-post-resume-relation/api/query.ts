import { queryOptions } from '@tanstack/react-query'

import {
  getBusinessJobPostResumeRelations,
  getTeacherJobPostResumeRelations,
  GetJobPostResumeRequest,
} from './get-job-post-resumes'

export const jobPostResumeRelationQueries = {
  all: () => ['job-post-resume-relation'],
  lists: () => [...jobPostResumeRelationQueries.all(), 'list'],
  list: (params: GetJobPostResumeRequest) =>
    queryOptions({
      queryKey: [...jobPostResumeRelationQueries.lists(), params],
      queryFn: () => getTeacherJobPostResumeRelations(params),
    }),
  businessList: (params: GetJobPostResumeRequest) =>
    queryOptions({
      queryKey: [...jobPostResumeRelationQueries.lists(), params],
      queryFn: () => getBusinessJobPostResumeRelations(params),
    }),
}
