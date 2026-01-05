'use client'

import type { ChangeEvent, ComponentPropsWithoutRef, FocusEvent } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { get, useController, useFormContext } from 'react-hook-form'

import { Slider } from 'shared/ui'

import { CommonFieldProps, commonRules } from '../../lib'

type Props<T extends FieldValues> = CommonFieldProps<
  ComponentPropsWithoutRef<typeof Slider>,
  T
> & {
  resetErrorOnBlur?: boolean
  required?: boolean
  onChange?: (values: number[]) => void
}

export const FormSlider = <T extends FieldValues>({
  name = '' as Path<T>,
  rules,
  resetErrorOnBlur = true,
  required,
  min,
  max,
  ...restProps
}: Props<T>) => {
  const { control, clearErrors } = useFormContext<T>()

  const { onChange, onBlur } = restProps

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: commonRules(rules, required),
  })

  const error = get(errors, name)

  const handleChange = (values: number[]) => {
    field.onChange(values)
    onChange?.(values)
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (resetErrorOnBlur && error) clearErrors(name)

    field.onBlur()
    onBlur?.(event)
  }

  return (
    <Slider
      {...restProps}
      value={field.value}
      min={min}
      max={max}
      onValueChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
