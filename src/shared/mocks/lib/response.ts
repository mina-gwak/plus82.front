import { isArray } from 'lodash-es'

import {
  CommonResponseCode,
  NotSuccessResponse,
  Pagination,
  ResponseCode,
  SuccessResponse,
} from 'shared/api'

export const getCommonResponse = <T>(data?: T): SuccessResponse<T> => ({
  code: CommonResponseCode.SUCCESS,
  data: data ?? ({} as T),
  message: 'success',
})

export const getErrorResponse = (
  code: Exclude<ResponseCode, CommonResponseCode.SUCCESS>,
): NotSuccessResponse => ({
  code,
  data: null,
  message: 'fail',
})

const TOTAL_ELEMENTS = 125

export type PageSize = '5' | '10' | '30'

type PaginationResponseOptions = {
  pageNumber?: string
  rowCount?: PageSize
  isEmpty?: boolean
  isRepetitive?: boolean
}

type GetPaginationResponse = <T>(
  content: T | T[],
  options?: PaginationResponseOptions,
) => SuccessResponse<Pagination<T>>

export const getPaginationResponse: GetPaginationResponse = <T>(
  content: T | T[],
  {
    pageNumber = '0',
    rowCount = '10',
    isEmpty = false,
    isRepetitive = false,
  } = {},
) => {
  const totalElements = (() => {
    if (isEmpty) return 0
    if (isRepetitive) return TOTAL_ELEMENTS
    if (isArray(content)) return content.length

    return 1
  })()

  const currentPage = Number(pageNumber)
  const pageSize = Number(rowCount)

  const totalPages = Math.ceil(totalElements / pageSize)
  const offset = currentPage * pageSize
  const first = isEmpty || currentPage === 0
  const last = isEmpty || currentPage + 1 === totalPages
  const numberOfElements = last ? totalElements - offset : pageSize

  const contentList: T[] = (() => {
    if (isEmpty) return []
    if (isRepetitive && !isArray(content))
      return Array.from({ length: numberOfElements }, () => content)
    if (isRepetitive && isArray(content)) {
      // 배열의 요소를 반복해서 넣어준 뒤 총 개수만큼 잘라서 반환
      const roundedQuotient = Math.ceil(totalElements / content.length)

      return Array.from({ length: roundedQuotient }, () => content)
        .flat(2)
        .slice(0, Number(rowCount)) as T[]
    }

    return isArray(content) ? content : [content]
  })()

  const data = {
    size: pageSize,
    content: contentList,
    number: currentPage,
    sort: { sorted: false, unsorted: true, empty: true },
    numberOfElements,
    pageable: {
      sort: { sorted: false, unsorted: true, empty: true },
      pageNumber: currentPage,
      pageSize,
      offset,
      paged: true,
      unpaged: false,
    },
    first,
    last,
    empty: isEmpty,
    totalPages,
    totalElements,
  }

  return getCommonResponse(data)
}
