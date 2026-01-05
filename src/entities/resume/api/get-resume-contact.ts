'use server'

import { getBusinessSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { ResumeContact } from '../model/resume'

type GetResumeContactResponse = ResumeContact

export const getResumeContact = async (resumeContactId: string) => {
  const { accessToken } = await getBusinessSession()

  const response = await apiClient.get<GetResumeContactResponse>({
    endpoint: `/resume-contacts/${resumeContactId}`,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
