export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type StatusSummary = {
  total: number
  submitted: number
  reviewed: number
  accepted: number
  rejected: number
}
