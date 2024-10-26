import type { KeyboardEventHandler, MouseEvent } from 'react'

import { cn } from 'shared/lib'

import type { SwitchVariants } from './variants'
import * as css from './variants'

type Props = SwitchVariants & {
  checked?: boolean
  label?: string
  className?: string
  onClick?: () => void
}

export const Switch = ({
  checked = false,
  disabled = false,
  label,
  labelPlacement = 'end',
  className,
  onClick,
}: Props) => {
  const handleSwitchClick = (event: MouseEvent) => {
    event.preventDefault()
    onClick?.()
  }

  const handleSwitchKeyDown: KeyboardEventHandler<HTMLElement> = event => {
    if (!event.defaultPrevented) {
      if (event.key === 'Enter') {
        onClick?.()
      }
    }
  }

  return (
    <label
      // 이 요소의 하위 항목에 인풋이 존재하고 키보드 작동이 가능
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="switch"
      aria-checked={checked}
      onClick={handleSwitchClick}
      onKeyDown={handleSwitchKeyDown}
      className={cn(css.switchWrapper({ labelPlacement, disabled, className }))}
    >
      <input type="checkbox" checked={checked} onChange={() => {}} hidden />
      <div>
        <div
          tabIndex={disabled ? -1 : 0}
          className={cn(css.switchComponent({ checked }))}
        >
          <span className={cn(css.thumb({ checked }))} />
        </div>
      </div>
      {label && <span className={cn(css.label())}>{label}</span>}
    </label>
  )
}
