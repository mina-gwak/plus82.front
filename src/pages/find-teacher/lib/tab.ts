'use client'

import { usePathname, useRouter } from 'next/navigation'

export enum TabValue {
  SHOW_RESUME = 'resume',
  SHOW_HISTORY = 'history',
}

export const useTab = () => {
  const router = useRouter()

  const pathname = usePathname()
  const tab = pathname?.includes('history')
    ? TabValue.SHOW_HISTORY
    : TabValue.SHOW_RESUME

  const handleTabChange = (value: string) => {
    if (value === tab) return

    router.replace(
      tab === TabValue.SHOW_RESUME
        ? '/business/find-teacher/history'
        : '/business/find-teacher/resume',
    )
  }

  return {
    tab,
    handleTabChange,
  }
}
