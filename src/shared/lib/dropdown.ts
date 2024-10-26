'use client'

import type { KeyboardEvent, RefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useClickAway } from './click-away'
import { useEscape } from './escape'
import { isNilOrEmptyString } from './helper'

type DropdownValue = string | number | null

type Props = {
  value?: DropdownValue
}

type ReturnType = {
  isOpen: boolean
  selectedValue: DropdownValue
  dropdownRef: RefObject<HTMLDivElement>
  open: () => void
  close: () => void
  toggleIsOpen: () => void
  updateSelectedValue: (value: DropdownValue) => void
  handleTriggerClick: () => void
  handleTriggerKeyDown: (event: KeyboardEvent) => void
}

export const useDropdown = ({
  value: externalValue,
}: Props = {}): ReturnType => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedValue, setSelectedValue] = useState<DropdownValue>(
    isNilOrEmptyString(externalValue) ? null : externalValue,
  )

  const [isOpen, setIsOpen] = useClickAway({ ref: dropdownRef })

  const open = useCallback(() => setIsOpen(true), [setIsOpen])
  const close = useCallback(() => setIsOpen(false), [setIsOpen])
  const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen)

  const handleEscapeKeyDown = useCallback(() => setIsOpen(false), [setIsOpen])

  useEscape({ isOpen, onClose: handleEscapeKeyDown })

  const updateSelectedValue = (selectedValueToBeUpdated: DropdownValue) =>
    setSelectedValue(selectedValueToBeUpdated)

  const handleTriggerClick = () => toggleIsOpen()

  const handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (!event.defaultPrevented) {
      if (event.key === 'Enter') {
        toggleIsOpen()
      }
    }
  }

  useEffect(() => {
    setSelectedValue(externalValue ?? null)
  }, [externalValue])

  return {
    isOpen,
    selectedValue,
    dropdownRef,
    open,
    close,
    toggleIsOpen,
    updateSelectedValue,
    handleTriggerClick,
    handleTriggerKeyDown,
  }
}
