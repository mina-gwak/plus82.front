export enum JobFilter {
  IN_PROGRESS = 'IN_PROGRESS',
  SAVED = 'SAVED',
  CLOSED = 'CLOSED',
}

export const convertJobFilterToParams = (filter: JobFilter) => {
  switch (filter) {
    case JobFilter.IN_PROGRESS:
      return {
        isDraft: false,
        closed: false,
      }
    case JobFilter.SAVED:
      return {
        isDraft: true,
      }
    case JobFilter.CLOSED:
      return {
        closed: true,
      }
    default:
      return {}
  }
}
