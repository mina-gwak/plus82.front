'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient, Pagination, PaginationParams } from 'shared/api'

import { RepresentativeResumeSummary } from '../model/resume'

export type GetRepresentativeResumesRequest = PaginationParams<{
  genderType: 'MALE' | 'FEMALE' | null
  countryIdList: number[]
  fromAge: number | null
  toAge: number | null
  visaTypeList: string[]
  forKindergarten?: boolean
  forElementary?: boolean
  forMiddleSchool?: boolean
  forHighSchool?: boolean
  forAdult?: boolean
}>

type GetRepresentativeResumesResponse = Pagination<RepresentativeResumeSummary>

export const getRepresentativeResumes = async (
  queryParams: GetRepresentativeResumesRequest,
) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetRepresentativeResumesResponse>({
    endpoint: '/resumes/representatives',
    queryParams,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
