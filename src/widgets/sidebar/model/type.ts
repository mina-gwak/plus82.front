export type SingleMenuItemData = {
  title: string
  url: string
}

export type CollapsibleMenuItemData = {
  title: string
  subItems: { title: string; url: string }[]
}

export type MenuItemData = SingleMenuItemData | CollapsibleMenuItemData
