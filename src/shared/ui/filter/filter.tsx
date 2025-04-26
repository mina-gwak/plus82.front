'use client'

import { PropsWithChildren, useEffect, useRef } from 'react'

import { colors } from 'shared/config'
import { cn } from 'shared/lib'

import { Checkbox } from '../checkbox'
import { Dropdown, DropdownItemProps } from '../dropdown/dropdown'
import { Icon } from '../icon'
import { FilterProvider, useFilterContext } from './context'
import {
  useFilter,
  type Props as UseFilterProps,
  type FilterValue,
} from './use-filter'
import * as css from './variants'

export type FilterRootProps = Omit<UseFilterProps, 'filterRef' | 'disabled'> & {
  disabled?: boolean
  className?: string
  onBlur?: () => void
  onClose?: () => void
}

const FilterRoot = ({
  name,
  selectionLimit,
  displayLimit,
  disabled = false,
  children,
  defaultValue,
  value,
  onChange = () => {},
  onClose,
  onBlur,
  className,
}: PropsWithChildren<FilterRootProps>) => {
  const filterRef = useRef<HTMLDivElement>(null)

  const {
    isOpen,
    isFocused,
    canCheck,
    displayValue,
    contextValue,
    handleTriggerClick,
    handleTriggerKeyDown,
  } = useFilter({
    name,
    value,
    defaultValue,
    disabled,
    onChange,
    onClose,
    selectionLimit,
    filterRef,
  })

  const dropdownId = `${name}-filter`

  return (
    <div
      className={cn(
        css.wrapper({
          disabled,
          className,
        }),
      )}
      ref={filterRef}
    >
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-haspopup="listbox"
        className={cn(
          css.checked({
            disabled,
            isFocused,
            canCheck,
          }),
        )}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        onBlur={onBlur}
      >
        <div className="flex gap-1">
          <span>{displayValue.name}</span>{' '}
          {displayValue.count > 0 && (
            <span className="font-bold text-blue-800">
              {displayValue.count}
            </span>
          )}
        </div>
        <Icon
          name="ChevronDown"
          size="medium"
          color={colors.gray['700']}
          className={cn(css.arrowIcon({ isOpen }))}
        />
      </div>
      {isOpen && (
        <FilterProvider value={contextValue}>
          <Dropdown
            id={dropdownId}
            role="listbox"
            displayLimit={displayLimit}
            className="w-max min-w-full"
          >
            {children}
          </Dropdown>
        </FilterProvider>
      )}
    </div>
  )
}

type FilterItemProps = Pick<DropdownItemProps, 'selected'> & {
  value: FilterValue
}

const FilterItem = ({
  value,
  children,
  ...restProps
}: PropsWithChildren<FilterItemProps>) => {
  const { name, close, hasChecked, hasLimitExceeded, updateCheckedValues } =
    useFilterContext()

  const scrollRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
  }, [])

  const handleFilterChange = () => {
    const updatedCheckedValues = updateCheckedValues(value)
    if (hasLimitExceeded(updatedCheckedValues)) close()
  }

  return (
    <Dropdown.Item
      ref={hasChecked(value) ? scrollRef : null}
      role="option"
      onClick={handleFilterChange}
      {...restProps}
    >
      <div className="flex justify-start gap-2">
        <Checkbox
          name={name}
          value={value}
          checked={hasChecked(value)}
          onChange={handleFilterChange}
        />
        {children}
      </div>
    </Dropdown.Item>
  )
}

export const Filter = Object.assign(FilterRoot, {
  Item: FilterItem,
})
