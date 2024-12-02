'use client'

import { isArray, isEqual, isNil, isNull, isUndefined } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'
import type { KeyboardEvent, RefObject } from 'react'

import {
  convertToSentence,
  List,
  ListValue,
  useClickAway,
  useEscape,
} from 'shared/lib'
import { DropdownRootProps } from 'shared/ui/dropdown/dropdown'

import { FilterVariants } from './variants'

export type FilterValue = NonNullable<ListValue>

export type Props = FilterVariants &
  Pick<DropdownRootProps, 'displayLimit'> & {
    name: string
    defaultValue?: FilterValue[] | null
    value?: FilterValue[] | null
    disabled: boolean
    selectionLimit?: number
    onChange: (updatedValues: FilterValue[]) => void
    onClose?: () => void
    filterRef: RefObject<HTMLDivElement>
  }

export const useFilter = ({
  name,
  value: externalValue,
  defaultValue,
  disabled,
  onChange,
  onClose,
  selectionLimit,
  filterRef,
}: Props) => {
  const getDefaultCheckedValues = () => {
    if (isArray(defaultValue)) return defaultValue

    if (isNil(externalValue)) return []

    return externalValue
  }

  const [checkedValues, setCheckedValues] = useState<FilterValue[]>(
    getDefaultCheckedValues(),
  )

  const displayValue = {
    name: convertToSentence(name),
    count: checkedValues.length,
  }

  useEffect(() => {
    if (isUndefined(externalValue)) return

    const externalValues = isNull(externalValue) ? [] : externalValue

    if (!isEqual(externalValues, checkedValues)) {
      setCheckedValues(externalValues)
    }
  }, [externalValue, checkedValues])

  /* isFocused
      true : 사용자가 직접적으로 Select 필드를 활성화 & 드롭다운이 열리는 경우 (마우스 클릭, 엔터 등) / multiple & 선택 제한 개수를 다 채운 뒤 드롭다운이 강제로 닫히는 경우
      false : 필드 외부를 클릭해 포커스가 벗어나는 경우
  */
  // &:focus : Tab 키를 사용하는 경우와 같이 해당 필드로 focus가 이동하는 경우
  const [isFocused, setIsFocused] = useState(false)

  const focus = useCallback(() => setIsFocused(true), [])
  const removeFocus = useCallback(() => setIsFocused(false), [])

  const handleClose = () => {
    removeFocus()
    onClose?.()
  }

  const [isOpen, setIsOpen] = useClickAway({
    ref: filterRef,
    callback: handleClose,
  })

  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => {
    setIsOpen(false)
    handleClose()
  }, [setIsOpen])

  const handleEscapeKeyDown = useCallback(() => close(), [close])

  useEscape({ isOpen, onClose: handleEscapeKeyDown })

  const hasLimitExceeded = useCallback(
    (values: FilterValue[]) => {
      if (isNil(selectionLimit)) return false

      return values.length === selectionLimit
    },
    [selectionLimit],
  )

  const hasChecked = useCallback(
    (value: FilterValue) => checkedValues.includes(value),
    [checkedValues],
  )

  const isCheckedValuesEmpty = List(checkedValues).isEmpty()

  const canCheck = !hasLimitExceeded(checkedValues)

  const updateCheckedValuesState = useCallback(
    (updatedCheckedValues: FilterValue[]) => {
      setCheckedValues(updatedCheckedValues)
      onChange(updatedCheckedValues)
    },
    [onChange],
  )

  const updateCheckedValues = useCallback(
    (itemValue: FilterValue) => {
      let updatedCheckedValues: FilterValue[]

      if (hasChecked(itemValue)) {
        updatedCheckedValues = List(checkedValues)
          .remove(itemValue)
          .get() as FilterValue[]
      } else if (hasLimitExceeded(checkedValues))
        updatedCheckedValues = checkedValues
      else
        updatedCheckedValues = List(checkedValues)
          .add(itemValue)
          .get() as FilterValue[]

      updateCheckedValuesState(updatedCheckedValues)

      return updatedCheckedValues
    },
    [checkedValues, hasChecked, hasLimitExceeded, updateCheckedValuesState],
  )

  const updateIsOpen = () => {
    if (disabled) return

    if (isOpen) {
      close()
      handleClose()
    } else if (!hasLimitExceeded(checkedValues)) {
      open()
      focus()
    }
  }

  const handleTriggerClick = () => updateIsOpen()

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (!event.defaultPrevented) {
      if (event.key === 'Enter') {
        updateIsOpen()
      }
      if (event.key === 'Tab') {
        close()
        handleClose()
      }
    }
  }

  const contextValue = {
    name,
    close,
    hasChecked,
    hasLimitExceeded,
    updateCheckedValues,
  }

  return {
    isOpen,
    isFocused,
    isCheckedValuesEmpty,
    canCheck,
    checkedValues,
    displayValue,
    contextValue,
    handleTriggerClick,
    handleTriggerKeyDown,
  }
}
