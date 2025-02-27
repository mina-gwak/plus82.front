import { ApplicationStatus } from './status'

export type JobPostRelation = {
  id: number
  coverLetter: string
  status: ApplicationStatus
  submittedDate: string
  resumeId: number
  resumeTitle: string
  resumeFirstName: string
  resumeLastName: string
  jobPostId: number
  jobPostTitle: string
  academyId: number
  academyName: string
}
