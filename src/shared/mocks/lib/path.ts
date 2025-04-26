import { isString } from 'lodash-es'

const BASE_URL = `http://localhost:3000/api/v1`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type URLFunction = (...args: any[]) => string

const getFunctionParamNames = (fn: URLFunction) => {
  const fnStr = fn.toString()
  const arrowMatch = fnStr.match(/\(?[^]*?\)?\s*=>/)
  if (arrowMatch)
    return arrowMatch[0]
      .replace(/[()\s]/gi, '')
      .replace('=>', '')
      .split(',')
  const match = fnStr.match(/\([^]*?\)/)

  return match ? match[0].replace(/[()\s]/gi, '').split(',') : []
}

export const convertURL = (path: string | URLFunction): string => {
  if (isString(path)) return new URL(`${BASE_URL}${path}`).toString()

  const params = getFunctionParamNames(path).map(param => `:${param}`)

  return new URL(`${BASE_URL}${path(...params)}`).toString()
}
