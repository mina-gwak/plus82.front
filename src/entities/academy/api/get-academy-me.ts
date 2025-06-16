'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { AcademyDetail } from '../model/academy-detail'

type GetAcademyMeResponse = AcademyDetail

export const getAcademyMe = async () => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetAcademyMeResponse>({
    endpoint: `/academies/me`,
    option: {
      authorization: `Bearer ${accessToken}`,
      tags: ['academy-me'],
    },
  })

  return response
}
