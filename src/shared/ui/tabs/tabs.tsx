'use client'

import { isUndefined } from 'lodash-es'
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  MouseEvent,
} from 'react'

import { cn } from 'shared/lib'

import { TabsContext, useTabsContext } from './context'
import * as css from './variants'

export type TabsProps = {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const TabsRoot = ({
  defaultValue = '',
  value,
  onChange,
  className,
  children,
}: PropsWithChildren<TabsProps>) => {
  const [activatedTab, setActivatedTab] = useState(defaultValue)

  const handleTabChange = useCallback(
    (updatedValue: string) => {
      setActivatedTab(updatedValue)
      onChange?.(updatedValue)
    },
    [onChange],
  )

  useEffect(() => {
    if (isUndefined(value)) return
    setActivatedTab(value)
  }, [value])

  const contextValues = useMemo(
    () => ({
      activatedTab,
      handleTabChange,
    }),
    [activatedTab, handleTabChange],
  )

  return (
    <div className={cn(css.tabs({ className }))}>
      <TabsContext.Provider value={contextValues}>
        {children}
      </TabsContext.Provider>
    </div>
  )
}

type TabTriggerProps = {
  className?: string
  value: string
  onChange?: string
}

const Trigger = ({
  value,
  className,
  children,
}: PropsWithChildren<TabTriggerProps>) => {
  const { activatedTab, handleTabChange } = useTabsContext()

  const isActive = activatedTab === value

  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()
    handleTabChange(value)
  }

  return (
    <button
      className={cn(css.trigger({ active: isActive, className }))}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export const Tabs = Object.assign(TabsRoot, {
  Trigger,
})
