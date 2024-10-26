import type { CommonResponseCode, ResponseCode } from './exception'

export interface SuccessResponse<T> {
  code: CommonResponseCode.SUCCESS
  data: T
  message: string
}

export interface NotSuccessResponse {
  code: Exclude<ResponseCode, CommonResponseCode.SUCCESS>
  data: null
  message: string
}

export type CommonResponse<T = unknown> =
  | SuccessResponse<T>
  | NotSuccessResponse
