import { HTMLAttributes } from 'react'

import { cn } from 'shared/lib'

import * as css from './variants'

type Props = HTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

export const Label = ({
  id,
  className,
  required,
  children,
  ...restProps
}: Props) => {
  return (
    <label htmlFor={id} className={cn(css.label({ className }))} {...restProps}>
      {required && <span className={css.asterisk()}>*</span>}
      {children}
    </label>
  )
}
