'use client'

import { isEmpty } from 'lodash-es'
import { PropsWithChildren, useEffect, useMemo } from 'react'
import type { RegisterOptions } from 'react-hook-form'
import { useController, useFormContext } from 'react-hook-form'

import { GetCheckboxProps, useCheckbox, UseCheckboxProps } from 'shared/lib'
import { Checkbox, CheckboxValue } from 'shared/ui'

import { CheckboxContext, useCheckboxContext } from './context'
import { commonRules } from '../../lib'

type FormCheckboxGroupProps = UseCheckboxProps & {
  rules?: RegisterOptions
  required?: boolean
}

const FormCheckboxGroup = ({
  name = '',
  options,
  rules,
  children,
  required,
}: PropsWithChildren<FormCheckboxGroupProps>) => {
  const checkboxState = useCheckbox({ name, options })

  const { control } = useFormContext()

  const controller = useController({
    name,
    control,
    rules: commonRules(rules, required),
  })

  const value = useMemo(
    () => ({
      ...checkboxState,
      controller,
    }),
    [checkboxState, controller],
  )

  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  )
}

type FormCheckboxProps = {
  label?: string
  value?: CheckboxValue
  indeterminate?: boolean
  className?: string
}

const FormCheckboxItem = ({
  label,
  value,
  indeterminate = false,
  className,
}: FormCheckboxProps) => {
  const { clearErrors } = useFormContext()
  const {
    controller,
    updateCheckedValue,
    getCheckboxProps,
    getIndeterminateCheckboxProps,
  } = useCheckboxContext()

  const {
    field,
    fieldState: { error },
  } = controller

  let checkboxProps: GetCheckboxProps

  if (indeterminate) {
    checkboxProps = getIndeterminateCheckboxProps()
  } else {
    checkboxProps = getCheckboxProps(value ?? '')
  }

  const isFieldChecked = field.value?.includes(checkboxProps.value) ?? false

  const handleCheckboxChange = () => {
    checkboxProps.onChange(updatedCheckedValues => {
      field.onChange(updatedCheckedValues)
      clearErrors(field.name)
    })
  }

  useEffect(() => {
    if (checkboxProps.checked === isFieldChecked) return
    if (value) updateCheckedValue(value)
  }, [isFieldChecked])

  return (
    <Checkbox
      label={label}
      {...checkboxProps}
      error={!isEmpty(error)}
      onChange={handleCheckboxChange}
      value={field.value}
      className={className}
    />
  )
}

export const FormCheckbox = Object.assign(FormCheckboxItem, {
  Group: FormCheckboxGroup,
})
