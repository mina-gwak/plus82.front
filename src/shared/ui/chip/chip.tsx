'use cilent'

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { useMemo } from 'react'

import { colors } from 'shared/config'

import { Icon, type IconProps } from '../icon'
import { ChipContext, useChipContext } from './context'
import * as css from './variants'
import type { ChipVariants } from './variants'

export type ChipProps = ChipVariants

const ChipRoot = ({
  size = 'medium',
  variant = 'lined',
  selected = false,
  disabled = false,
  children,
}: PropsWithChildren<ChipProps>) => {
  const value = useMemo(
    () => ({
      size,
      variant,
      selected,
      disabled,
    }),
    [size, variant, selected, disabled],
  )

  return (
    <ChipContext.Provider value={value}>
      <div
        className={css.chip({ size, variant, selected, disabled })}
        aria-disabled={disabled ?? false}
      >
        {children}
      </div>
    </ChipContext.Provider>
  )
}

type ChipIconProps = Pick<IconProps, 'name'>

const ChipIcon = ({ name }: ChipIconProps) => {
  const { size, variant, selected, disabled } = useChipContext()

  const iconSize = size === 'small' ? 'small' : 'medium'
  const iconColor = (() => {
    if (disabled) return colors.gray[300]
    if (variant === 'lined' && selected === false) return colors.gray[700]
    if (variant === 'lined' && selected === true) return colors.white
    if (variant === 'solid' && selected === false) return colors.gray[800]
    if (variant === 'solid' && selected === true) return colors.blue[800]

    return colors.gray[700]
  })()

  return <Icon name={name} color={iconColor} size={iconSize} />
}

const ChipLabel = ({ children }: PropsWithChildren) => {
  const { size, variant, selected, disabled } = useChipContext()

  return (
    <span className={css.label({ size, variant, selected, disabled })}>
      {children}
    </span>
  )
}

type ChipRemoveButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>

const ChipRemoveButton = (props: ChipRemoveButtonProps) => {
  const { size, variant, disabled } = useChipContext()

  const iconSize = size === 'small' ? 'small' : 'medium'
  const iconColor = (() => {
    if (disabled) return colors.gray[300]

    return variant === 'lined' ? colors.white : colors.gray[700]
  })()

  return (
    <button
      type="button"
      aria-label="remove chip button"
      disabled={disabled ?? false}
      {...props}
    >
      <Icon name="Close" color={iconColor} size={iconSize} />
    </button>
  )
}

export const Chip = Object.assign(ChipRoot, {
  Icon: ChipIcon,
  Label: ChipLabel,
  RemoveButton: ChipRemoveButton,
})

export default Chip
