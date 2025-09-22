import { PropsWithChildren } from 'react'

import { cn } from 'shared/lib'

import * as css from './variants'
import { LayoutVariants } from './variants'

type Props = LayoutVariants & {
  className?: string
}

export const Layout = ({
  wide = false,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className="h-[calc(100dvh-65px)] overflow-y-auto">
      <div className={cn(css.outerWrapper({ wide }))}>
        <div className={cn(css.innerWrapper({ wide, className }))}>
          {children}
        </div>
      </div>
    </div>
  )
}
