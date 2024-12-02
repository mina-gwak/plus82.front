'use client'

import { createContext, useContext } from 'react'

import type { ChipVariants } from 'shared/ui/chip/variants'

type ChipState = ChipVariants

export const ChipContext = createContext<ChipState | null>(null)

export const useChipContext = () => {
  const context = useContext(ChipContext)

  if (!context) {
    throw new Error('This component must be used within Chip component')
  }

  return context
}
