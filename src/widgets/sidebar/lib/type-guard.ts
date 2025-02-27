import { CollapsibleMenuItemData, MenuItemData } from '../model/type'

export const hasSubItems = (
  item: MenuItemData,
): item is CollapsibleMenuItemData =>
  'subItems' in item && item.subItems.length > 0
