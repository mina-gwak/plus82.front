'use client'

import { isEmpty } from 'lodash-es'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'

import { colors } from 'shared/config'
import { Slot } from 'shared/lib'
import {
  type CalendarProps,
  Calendar,
  Icon,
  TextField,
  type TextFieldProps,
} from 'shared/ui'

import { commonRules, type CommonFieldProps } from '../../lib'

type FormCalendarProps = Omit<
  CalendarProps,
  'name' | 'selected' | 'onChange' | 'popperPlacement'
> &
  Partial<Pick<CalendarProps, 'onChange'>>
type FormDateFieldProps = Omit<TextFieldProps, 'value' | 'onChange'>

type Props<T extends FieldValues> = FormCalendarProps &
  CommonFieldProps<FormDateFieldProps, T>

export const FormDatePicker = <T extends FieldValues>({
  name = '' as Path<T>,
  rules,
  disabled,
  defaultValue,
  placeholder,
  onChange,
  required,
  fullWidth,
  ...restProps
}: Props<T>) => {
  const { control, clearErrors } = useFormContext<T>()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      disabled={disabled}
      render={({ field, fieldState }) => {
        const { value, ref, ...restFieldProps } = field

        return (
          <Calendar
            {...restProps}
            {...restFieldProps}
            placeholderText={placeholder}
            selected={value}
            onChange={(date, event) => {
              field.onChange(date, event)
              onChange?.(date, event)
              clearErrors(field.name)
            }}
            popperPlacement="bottom-center"
            customInput={
              <TextField
                error={!isEmpty(fieldState.error)}
                fullWidth={fullWidth}
                ref={ref}
              >
                <Slot name="left">
                  <Icon
                    name="Date"
                    size="large"
                    color={colors.gray['500']}
                    className="relative -top-px"
                  />
                </Slot>
              </TextField>
            }
          />
        )
      }}
      rules={commonRules(rules, required)}
    />
  )
}
