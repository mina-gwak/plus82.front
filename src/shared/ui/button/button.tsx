'use client'

import Link from 'next/link'
import {
  type ComponentProps,
  type ElementType,
  ForwardedRef,
  forwardRef,
  useMemo,
} from 'react'

import { cn } from 'shared/lib'
import { button, ButtonVariants } from 'shared/ui/button/variants'

import { Icon } from '../icon'
import { IconType } from '../icon/assets'

import { ButtonContext, useButtonContext } from './context'

type ButtonProps = ButtonVariants & {
  as?: 'button' | 'a'
}

type Props<E extends ElementType> = ButtonProps &
  Omit<ComponentProps<E>, keyof ButtonProps>

export const ButtonRoot = forwardRef(
  <E extends ElementType>(
    {
      as,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      className,
      ...restProps
    }: Props<E>,
    ref: ForwardedRef<ComponentProps<E>>,
  ) => {
    const $Element = as || 'button'

    const value = useMemo(
      () => ({
        size: size as 'small' | 'medium' | 'large',
      }),
      [size],
    )

    if (as === 'a') {
      return (
        <ButtonContext.Provider value={value}>
          <Link href={restProps?.href} passHref legacyBehavior>
            <$Element
              ref={ref}
              className={cn(button({ variant, size, fullWidth, className }))}
              {...restProps}
            />
          </Link>
        </ButtonContext.Provider>
      )
    }

    return (
      <ButtonContext.Provider value={value}>
        <$Element
          ref={ref}
          className={cn(button({ variant, size, fullWidth, className }))}
          {...restProps}
        />
      </ButtonContext.Provider>
    )
  },
)
ButtonRoot.displayName = 'Button'

type ButtonIconProps = {
  name: IconType
}

const ButtonIcon = ({ name }: ButtonIconProps) => {
  const { size } = useButtonContext()

  return <Icon name={name} size={size} color="currentColor" />
}

export const Button = Object.assign(ButtonRoot, {
  Icon: ButtonIcon,
})
