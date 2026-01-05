import { MouseEvent, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Country, CountryWithFlag, useCountries } from 'entities/country'
import { colors } from 'shared/config'
import { fieldCss, Form } from 'shared/form'
import { useDebounce } from 'shared/lib'
import { Chip, Icon, Label } from 'shared/ui'

import { convertFormValuesToFilter } from '../model/converter'
import { FindTeacherFilter } from '../model/filter'
import { defaultValues, FormValues } from '../model/form-values'

type Props = {
  onChange: (values: FindTeacherFilter) => void
}

export const SidePanel = ({ onChange }: Props) => {
  const form = useForm<FormValues>({
    defaultValues,
  })

  const values = useWatch<FormValues>({
    control: form.control,
  })

  const { debouncedCallback } = useDebounce(onChange, 500)

  const { data: countries } = useCountries()

  const getCountry = (id: number) => {
    return countries?.find(country => country.id === id) as Country
  }

  const handleRemoveButtonClick =
    (key: keyof FormValues, valueToBeRemoved: unknown) =>
    (event: MouseEvent) => {
      event.stopPropagation()

      const values = form.getValues(key)
      form.setValue(
        key,
        values?.filter((value: unknown) => value !== valueToBeRemoved) as
          | string[]
          | number[]
          | null,
      )
    }

  useEffect(() => {
    debouncedCallback(convertFormValuesToFilter(values as FormValues))
  }, [values])

  return (
    <div className="h-fit w-[260px] shrink-0 rounded-lg border border-gray-300 px-4 py-6">
      <h1 className="title-large mb-3 font-bold text-gray-900">선생님 찾기</h1>

      <Form {...form}>
        <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-3' })}>
          <Label>성별</Label>
          <div className="flex gap-[34px]">
            <Form.CheckboxGroup name="genderType" options={['FEMALE', 'MALE']}>
              <Form.Checkbox label="여자" value="FEMALE" />
              <Form.Checkbox label="남자" value="MALE" />
            </Form.CheckboxGroup>
          </div>
        </div>

        <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-3' })}>
          <Label>국적</Label>
          <Form.Select
            name="countryIdList"
            placeholder="국적"
            selectionLimit={10}
            render={values => {
              if (countries) {
                return values.map(value => (
                  <Chip key={value} size="small" variant="solid">
                    <Chip.Label>
                      {getCountry(value as number)?.countryNameEn}
                    </Chip.Label>
                    <Chip.RemoveButton
                      onClick={handleRemoveButtonClick(
                        'countryIdList',
                        value as number,
                      )}
                    />
                  </Chip>
                ))
              }

              return null
            }}
            multiple
            useRemoveButton={false}
          >
            {countries?.map(country => (
              <Form.SelectItem key={country.id} value={country.id}>
                <CountryWithFlag {...country} />
              </Form.SelectItem>
            ))}
          </Form.Select>
        </div>

        <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-3' })}>
          <Label>비자</Label>
          <Form.Select
            name="visaTypeList"
            placeholder="비자"
            selectionLimit={2}
            render={values => {
              if (countries) {
                return values.map(value => {
                  const displayValue = value === 'E2' ? 'E-2' : '기타'

                  return (
                    <Chip key={displayValue} size="small" variant="solid">
                      <Chip.Label>{displayValue}</Chip.Label>
                      <Chip.RemoveButton
                        onClick={handleRemoveButtonClick(
                          'visaTypeList',
                          value as string,
                        )}
                      />
                    </Chip>
                  )
                })
              }

              return null
            }}
            multiple
            useRemoveButton={false}
          >
            <Form.SelectItem value="E2">E-2</Form.SelectItem>
            <Form.SelectItem value="OTHERS">기타</Form.SelectItem>
          </Form.Select>
        </div>

        <div className={fieldCss.fieldWrapper({ className: 'not-last:mb-3' })}>
          <Label>대상 학생</Label>
          <Form.Select
            name="studentType"
            placeholder="대상 학생"
            selectionLimit={5}
            render={values => {
              if (countries) {
                return values.map(value => (
                  <Chip key={value} size="small" variant="solid">
                    <Chip.Label>
                      {(() => {
                        switch (value) {
                          case 'Kindergarten':
                            return '유치원'
                          case 'Elementary':
                            return '초등학생'
                          case 'MiddleSchool':
                            return '중학생'
                          case 'HighSchool':
                            return '고등학생'
                          case 'Adult':
                            return '성인'
                        }
                      })()}
                    </Chip.Label>
                    <Chip.RemoveButton
                      onClick={handleRemoveButtonClick(
                        'studentType',
                        value as string,
                      )}
                    />
                  </Chip>
                ))
              }

              return null
            }}
            multiple
            useRemoveButton={false}
          >
            <Form.SelectItem value="Kindergarten">유치원</Form.SelectItem>
            <Form.SelectItem value="Elementary">초등학생</Form.SelectItem>
            <Form.SelectItem value="MiddleSchool">중학생</Form.SelectItem>
            <Form.SelectItem value="HighSchool">고등학생</Form.SelectItem>
            <Form.SelectItem value="Adult">성인</Form.SelectItem>
          </Form.Select>
        </div>
        <div
          className={fieldCss.fieldWrapper({
            className: 'mb-5 gap-2',
          })}
        >
          <div className="flex items-center justify-between">
            <Label>나이</Label>
            <span className="body-large font-medium text-gray-900">
              {(() => {
                const [minAge, maxAge] = values.age ?? [0, 50]
                if (minAge === 0 && maxAge === 50) {
                  return '전체'
                }

                return `${minAge}세~${maxAge}세`
              })()}
            </span>
          </div>
          <Form.Slider
            name="age"
            min={0}
            max={50}
            step={1}
            minStepsBetweenThumbs={4}
          />
        </div>

        <button
          className="mx-auto flex w-fit items-center gap-1"
          onClick={() => form.reset()}
        >
          <span className="body-large text-gray-700">설정 초기화</span>
          <Icon name="Reset" size="small" color={colors.gray['700']} />
        </button>
      </Form>
    </div>
  )
}
