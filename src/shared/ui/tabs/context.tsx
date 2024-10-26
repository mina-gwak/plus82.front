import { createContext, useContext } from 'react'

type TabsState = {
  activatedTab?: string
  handleTabChange: (updatedTabValue: string) => void
}

export const TabsContext = createContext<TabsState | null>(null)

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('This component must be used within Tabs component')
  }

  return context
}
