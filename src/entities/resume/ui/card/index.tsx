import { forwardRef, PropsWithChildren } from 'react'

import { colors } from 'shared/config'
import { cn } from 'shared/lib'
import { Chip, Icon } from 'shared/ui'

import * as css from './variants'

type Props = {
  size?: 'small' | 'medium'
  className?: string
}

const CardRoot = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ size = 'small', className, children }, ref) => {
    return (
      <div className={cn(css.container({ size }), className)} ref={ref}>
        {children}
      </div>
    )
  },
)
CardRoot.displayName = 'Card'

const PlatformBadge = () => {
  return (
    <Chip size="small" variant="lined">
      <Chip.Label>+82 Created</Chip.Label>
    </Chip>
  )
}

const RepresentativeBadge = () => {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
      <Icon name="StarFill" size="small" color={colors.blue[800]} />
    </div>
  )
}

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-2 flex h-[30px] items-center justify-between">
      {children}
    </div>
  )
}

const Title = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={cn('flex-grow', className)}>
      <h4 className="title-small line-clamp-2 break-all text-gray-900">
        {children}
      </h4>
    </div>
  )
}

const Footer = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardRoot, {
  Header,
  Title,
  Footer,
  PlatformBadge,
  RepresentativeBadge,
})
