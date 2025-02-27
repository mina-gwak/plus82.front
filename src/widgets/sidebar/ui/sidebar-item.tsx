import Link from 'next/link'

import { Collapsible, Sidebar } from 'shared/ui'

import { CollapsibleMenuItemData, SingleMenuItemData } from '../model/type'

export const SingleMenuItem = ({
  item,
  active,
}: {
  item: SingleMenuItemData
  active: boolean
}) => (
  <Sidebar.MenuItem key={item.title}>
    <Sidebar.MenuButton asChild isActive={active}>
      <Link href={item.url}>
        <span>{item.title}</span>
      </Link>
    </Sidebar.MenuButton>
  </Sidebar.MenuItem>
)

export const CollapsibleMenuItem = ({
  item,
  isActive,
}: {
  item: CollapsibleMenuItemData
  isActive: (url: string) => boolean
}) => {
  const hasActiveItem = item.subItems.some(subItem => isActive(subItem.url))

  return (
    <Collapsible defaultOpen={hasActiveItem} className="group/collapsible">
      <Sidebar.MenuItem>
        <Collapsible.Trigger asChild>
          <Sidebar.MenuButton>
            <span>{item.title}</span>
          </Sidebar.MenuButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Sidebar.MenuSub>
            {item.subItems.map(subItem => (
              <Sidebar.MenuSubItem key={subItem.title}>
                <Sidebar.MenuButton isActive={isActive(subItem.url)}>
                  <Link href={subItem.url}>
                    <span>{subItem.title}</span>
                  </Link>
                </Sidebar.MenuButton>
              </Sidebar.MenuSubItem>
            ))}
          </Sidebar.MenuSub>
        </Collapsible.Content>
      </Sidebar.MenuItem>
    </Collapsible>
  )
}
