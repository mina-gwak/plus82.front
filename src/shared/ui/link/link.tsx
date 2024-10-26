import NextLink, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

import { cn } from 'shared/lib'

import * as css from './variants'
import { LinkVariants } from './variants'

type Props = LinkProps &
  LinkVariants & {
    className?: string
    children: ReactNode
  }

export const Link = ({
  variant = 'primary',
  disabled,
  className,
  children,
  ...restProps
}: Props) => {
  return (
    <NextLink
      tabIndex={disabled ? -1 : 0}
      {...restProps}
      className={cn(css.link({ variant, disabled, className }))}
    >
      {children}
    </NextLink>
  )
}
