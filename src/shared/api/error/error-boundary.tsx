import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { PropsWithChildren, ReactNode, Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

type Props = {
  errorFallback: (props: FallbackProps) => ReactNode
  suspenseFallback: ReactNode
}

export const QueryErrorBoundary = ({
  errorFallback,
  suspenseFallback,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={errorFallback}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
