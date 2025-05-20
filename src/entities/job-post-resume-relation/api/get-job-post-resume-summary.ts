'use server'

import { getTeacherSession } from 'entities/auth'
import { apiClient } from 'shared/api'

import { StatusSummary } from '../model/status'

type GetJobPostResumeSummaryResponse = StatusSummary

export const getJobPostResumeSummary = async () => {
  const { accessToken } = await getTeacherSession()

  const response = await apiClient.get<GetJobPostResumeSummaryResponse>({
    endpoint: `/job-post-resume-relations/summary`,
    option: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
