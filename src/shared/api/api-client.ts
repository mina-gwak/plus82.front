/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray, isNil } from 'lodash-es'

import { SuccessResponse } from 'shared/api/common-response'

import { HttpError } from './error/http-error'

export enum ContentType {
  JSON = 'application/json',
  MULTIPART = 'multipart/form-data',
  URLENCODED = 'application/x-www-form-urlencoded',
}

type RequestOption = {
  proxy?: boolean
  contentType?: ContentType
  authorization?: string
  tags?: string[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const VERSION = 'v1'
const PROXY = 'proxy'

const DEFAULT_ERROR_MESSAGE = '기술팀에 문의해주세요'

const ERROR_MESSAGES: { [key: number]: string } = {
  500: '기술팀에 문의해주세요',
}

export class ApiClient {
  private baseUrl: string

  constructor(url: string) {
    this.baseUrl = url
  }

  private async handleResponse<TResult>(response: Response): Promise<TResult> {
    const body = await response.json()
    const { status } = response

    if (status >= 400 && status < 500) {
      const { code, data, message } = body
      throw new HttpError({ code, data, message, status })
    }

    if (status >= 500) {
      throw new HttpError({
        code: body?.code ?? status,
        message: ERROR_MESSAGES[status] ?? DEFAULT_ERROR_MESSAGE,
        status,
      })
    }

    return (body as SuccessResponse<TResult>).data
  }

  private getUrl(endpoint: string, option?: RequestOption) {
    const version = option?.proxy ? PROXY : VERSION

    return `${this.baseUrl}/${version}${endpoint}`
  }

  private getRequestInit<TData = Record<string, unknown>>(
    body: TData,
    option?: RequestOption,
  ) {
    let requestBody: string | FormData
    const headers: HeadersInit = {}

    if (option?.authorization) {
      headers.Authorization = option.authorization
    }

    if (option?.contentType === ContentType.MULTIPART) {
      const formData = new FormData()

      Object.entries(body as Record<string, any>).forEach(([key, value]) => {
        formData.append(key, value)
      })

      requestBody = formData
    } else {
      requestBody = JSON.stringify(body)
      headers['Content-Type'] = option?.contentType ?? 'application/json'
    }

    return { requestBody, headers }
  }

  public async get<TResult = unknown, TParams = Record<string, any>>({
    endpoint,
    queryParams,
    option,
  }: {
    endpoint: string
    queryParams?: TParams
    option?: RequestOption
  }): Promise<TResult> {
    const url = new URL(this.getUrl(endpoint, option))

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (isNil(value)) return
        if (isArray(value)) {
          value.forEach(item => url.searchParams.append(key, item.toString()))
        } else {
          url.searchParams.append(key, (value as any).toString())
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': option?.contentType ?? 'application/json',
        ...(option?.authorization && { Authorization: option.authorization }),
      },
      ...(option?.tags && { next: { tags: option.tags } }),
    })

    return this.handleResponse<TResult>(response)
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>({
    endpoint,
    body,
    option,
  }: {
    endpoint: string
    body: TData
    option?: RequestOption
  }): Promise<TResult> {
    const { requestBody, headers } = this.getRequestInit(body, option)

    const response = await fetch(this.getUrl(endpoint, option), {
      method: 'POST',
      headers,
      body: requestBody,
    })

    return this.handleResponse<TResult>(response)
  }

  public async put<TResult = unknown, TData = Record<string, unknown>>({
    endpoint,
    body,
    option,
  }: {
    endpoint: string
    body: TData
    option?: RequestOption
  }): Promise<TResult> {
    const { requestBody, headers } = this.getRequestInit(body, option)

    const response = await fetch(this.getUrl(endpoint, option), {
      method: 'PUT',
      headers,
      body: requestBody,
    })

    return this.handleResponse<TResult>(response)
  }

  public async delete<TResult = unknown, TData = Record<string, unknown>>({
    endpoint,
    body,
    option,
  }: {
    endpoint: string
    body?: TData
    option?: RequestOption
  }): Promise<TResult> {
    const { requestBody, headers } = this.getRequestInit(body, option)

    const response = await fetch(this.getUrl(endpoint, option), {
      method: 'DELETE',
      headers,
      body: requestBody,
    })

    return this.handleResponse<TResult>(response)
  }
}

export const apiClient = new ApiClient(API_URL)
