import { createContext, useContext } from 'react'
import type { UseControllerReturn } from 'react-hook-form'

import { useCheckbox } from 'shared/lib'

type CheckboxState = ReturnType<typeof useCheckbox> & {
  controller: UseControllerReturn
}

export const CheckboxContext = createContext<CheckboxState | null>(null)

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext)

  if (!context) {
    throw new Error(
      'useCheckbox should be used within CheckboxContext.Provider',
    )
  }

  return context
}
