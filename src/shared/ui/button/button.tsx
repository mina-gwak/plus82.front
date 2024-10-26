import Link from 'next/link'
import { ComponentProps, ElementType } from 'react'

import { cn } from 'shared/lib'
import { button, ButtonVariants } from 'shared/ui/button/variants'

type ButtonProps = ButtonVariants & {
  as?: 'button' | 'a'
}

type Props<E extends ElementType> = ButtonProps &
  Omit<ComponentProps<E>, keyof ButtonProps>

export const Button = <E extends ElementType>({
  as,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className,
  ...restProps
}: Props<E>) => {
  const $Element = as || 'button'

  if (as === 'a') {
    return (
      <Link href={restProps?.href} passHref legacyBehavior>
        <$Element
          className={cn(button({ variant, size, fullWidth, className }))}
          {...restProps}
        />
      </Link>
    )
  }

  return (
    <$Element
      className={cn(button({ variant, size, fullWidth, className }))}
      {...restProps}
    />
  )
}
