import { queryOptions } from '@tanstack/react-query'

import {
  getRepresentativeResumes,
  GetRepresentativeResumesRequest,
} from './get-representative-resumes'
import {
  getResumeContactList,
  GetResumeContactListRequest,
} from './get-resume-contact-list'
import { getResumes } from './get-resumes'

export const resumeQueries = {
  all: () => ['resume'],
  lists: () => [...resumeQueries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...resumeQueries.lists()],
      queryFn: () => getResumes(),
      staleTime: 5000,
    }),
  representativeLists: () => [...resumeQueries.all(), 'representative', 'list'],
  representativeList: (params: GetRepresentativeResumesRequest) =>
    queryOptions({
      queryKey: [...resumeQueries.representativeLists(), params],
      queryFn: () => getRepresentativeResumes(params),
    }),
  resumeContactLists: () => [...resumeQueries.all(), 'resume-contact', 'list'],
  resumeContactList: (params: GetResumeContactListRequest) =>
    queryOptions({
      queryKey: [...resumeQueries.resumeContactLists(), params],
      queryFn: () => getResumeContactList(params),
    }),
}
