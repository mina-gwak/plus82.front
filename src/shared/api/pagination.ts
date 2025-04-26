import { NewObject } from 'shared/type'

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

type Pageable = {
  pageNumber: number
  pageSize: number
  offset: number
  sort: Sort
  paged: boolean
  unpaged: boolean
}

export type Pagination<Content> = {
  totalPages: number
  totalElements: number
  size: number
  content: Content[]
  number: number
  sort: Sort
  numberOfElements: number
  pageable: Pageable
  first: boolean
  last: boolean
  empty: boolean
}

export type PaginationParams<T extends NewObject> = T & {
  pageNumber: number
  rowCount: number
}
