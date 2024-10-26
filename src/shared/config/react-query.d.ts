import '@tanstack/react-query'

import { HttpError } from 'shared/api/http-error'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: HttpError
  }
}
