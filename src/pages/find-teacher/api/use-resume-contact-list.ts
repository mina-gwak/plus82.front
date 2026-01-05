import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { GetResumeContactListRequest, resumeQueries } from 'entities/resume'

export const useResumeContactList = (params: GetResumeContactListRequest) => {
  const { data, isLoading } = useQuery({
    ...resumeQueries.resumeContactList(params),
    placeholderData: keepPreviousData,
  })

  return {
    isLoading,
    resumeContactList: data?.content ?? [],
    hasNoResumeContact: data?.content?.length === 0,
    totalPages: data?.totalPages === 0 ? 1 : data?.totalPages,
  }
}
