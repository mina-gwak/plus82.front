import { ApplicationStatus } from 'entities/job-post-resume-relation'

export type FormValues = {
  status: ApplicationStatus
  memo: string
}
