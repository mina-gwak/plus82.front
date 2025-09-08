'use client'

import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { Sidebar } from 'shared/ui'

import { CollapsibleMenuItem, SingleMenuItem } from './sidebar-item'
import { hasSubItems } from '../lib/type-guard'
import { MenuItemData } from '../model/type'

type Props = {
  items: MenuItemData[]
}

export const SettingSidebar = ({ items }: Props) => {
  const pathname = usePathname()

  const isActive = useCallback(
    (url: string) => {
      return pathname === url
    },
    [pathname],
  )

  return (
    <Sidebar
      collapsible="none"
      className="flex-shrink-0 border-l border-r border-gray-300"
    >
      <Sidebar.Content className="p-6">
        <Sidebar.Menu>
          {items.map(item =>
            hasSubItems(item) ? (
              <CollapsibleMenuItem
                key={item.title}
                item={item}
                isActive={isActive}
              />
            ) : (
              <SingleMenuItem
                key={item.title}
                item={item}
                active={isActive(item.url)}
              />
            ),
          )}
        </Sidebar.Menu>
      </Sidebar.Content>
    </Sidebar>
  )
}

export const SettingSidebarProvider = Sidebar.Provider
