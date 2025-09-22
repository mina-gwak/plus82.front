'use client'

import { isNil } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CountrySelect } from 'entities/country'
import { Resume, ResumeDTO } from 'entities/resume'
import { ImageUploadInput } from 'features/upload-image'
import { isServerError, ServerError, useServerErrorHandler } from 'shared/api'
import { colors } from 'shared/config'
import { fieldCss, Form } from 'shared/form'
import { isNilOrEmptyString } from 'shared/lib'
import { Heading, Layout, Image, Icon, Label, Button } from 'shared/ui'

import {
  convertToFormValues,
  convertToResumeDTO,
  type ResumeFormValues,
} from '../model/form-values'
import * as rules from '../model/rules'

type Props = {
  userProfileImage?: string | null
  resume?: Resume
  submit: (data: ResumeDTO) => Promise<ServerError | undefined>
}

export const ResumeForm = ({ userProfileImage, resume, submit }: Props) => {
  const router = useRouter()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    resume?.profileImagePath ?? userProfileImage ?? null,
  )

  const form = useForm<ResumeFormValues>({
    values: convertToFormValues(resume),
    reValidateMode: 'onSubmit',
  })

  const { handleServerError } = useServerErrorHandler(form)

  const hasVisa = useWatch({ control: form.control, name: 'hasVisa' })

  const isVisaTypeDisabled = String(hasVisa) === 'false'

  const resetVisaType = (hasVisa: boolean) => {
    if (!hasVisa) {
      form.setValue('visaType', null)
      form.clearErrors('visaType')
    }
  }

  const addImagePreview = (file: File): Promise<string> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise(resolve => {
      reader.onload = () => {
        setImagePreview(reader.result as string)
        resolve(reader.result as string)
      }
    })
  }

  const handleFileChange = async (file: File) => {
    await addImagePreview(file)
    form.setValue('profileImage', file)
  }

  const studentTypeOptions = [
    'Kindergarten',
    'Elementary',
    'MiddleSchool',
    'HighSchool',
    'Adult',
  ]

  const handleCreateResumeSuccess = () => {
    router.push('/setting/resume')
    toast.success('Resume created successfully')
  }

  const handleUpdateResumeSuccess = () => {
    router.push('/setting/resume')
    toast.success('Resume updated successfully')
  }

  const submitForm = async (data: ResumeFormValues) => {
    const dto = convertToResumeDTO(data)

    const isUpdating = !isNil(resume?.id)

    const response = await submit({
      ...dto,
      ...(isUpdating && { resumeId: resume.id }),
    })

    if (isServerError(response)) {
      handleServerError(response)
    } else {
      if (isUpdating) {
        handleUpdateResumeSuccess()
      } else {
        handleCreateResumeSuccess()
      }
    }
  }

  return (
    <Form {...form} className="relative">
      <Layout wide className="h-[calc(100dvh-161px)]">
        <input
          {...form.register('title', {
            required: true,
          })}
          type="text"
          placeholder="Please enter your resume title"
          aria-invalid={!isNil(form.formState.errors.title)}
          className="display-small before:display-small mb-10 block w-full py-2 text-gray-900 before:text-gray-500 before:content-[attr(data-placeholder)] empty:before:inline-block aria-[invalid=true]:border-b aria-[invalid=true]:border-b-error not-empty:before:hidden"
        />
        <section className="mb-10">
          <Heading size="small" underline={false}>
            <span className="title-small text-error">*</span>Personal
            Introduction
          </Heading>
          <Form.TextArea
            name="personalIntroduction"
            placeholder="Please write a brief self-introduction in 5 lines or less"
            className="h-[152px]"
            required
            fullWidth
          />
        </section>
        <section className="pb-10">
          <Heading size="small" className="mb-8">
            Personal Information
          </Heading>
          <div className="flex gap-24">
            <label
              className="relative h-fit cursor-pointer"
              htmlFor="profile-image"
            >
              <Image
                useCDN={isNilOrEmptyString(fileInputRef.current?.value)}
                src={imagePreview ?? ''}
                alt=""
                className="h-[110px] w-[110px] rounded-full"
                fallback={
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gray-300">
                    <Icon
                      name="User"
                      size="custom"
                      className="h-[100px] w-[100px]"
                      color={colors.gray[700]}
                    />
                  </div>
                }
              />
              <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white">
                <Icon name="Plus" size="large" color={colors.gray[700]} />
              </div>
              <ImageUploadInput
                id="profile-image"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
            <div className="flex-grow gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'not-last:mb-8',
                  })}
                >
                  <Label required>First Name</Label>
                  <Form.Control name="firstName" rules={rules.firstName}>
                    <Form.TextField
                      placeholder="Enter your first name"
                      fullWidth
                    />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
                <div className={fieldCss.fieldWrapper({ className: 'mb-8' })}>
                  <Label required>Last Name</Label>
                  <Form.Control name="lastName" rules={rules.lastName}>
                    <Form.TextField
                      placeholder="Enter your last name"
                      fullWidth
                    />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
              </div>

              <div
                className={fieldCss.fieldWrapper({
                  className: 'not-last:mb-8',
                })}
              >
                <Label required>Email</Label>
                <Form.Control name="email" rules={rules.email}>
                  <Form.TextField placeholder="example@email.com" fullWidth />
                  <Form.ErrorMessage />
                </Form.Control>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'not-last:mb-8',
                  })}
                >
                  <Label required>Nationality</Label>
                  <Form.Control name="countryId" rules={rules.country}>
                    <CountrySelect />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
                <div className={fieldCss.fieldWrapper({ className: 'mb-8' })}>
                  <Label required>Current Country of Residence</Label>
                  <Form.Control
                    name="residenceCountryId"
                    rules={rules.currentCountry}
                  >
                    <CountrySelect placeholder="Choose your current country of residence" />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'not-last:mb-8',
                  })}
                >
                  <Label required>Degree</Label>
                  <Form.Control name="degree" rules={rules.degree}>
                    <Form.TextField placeholder="Enter your degree" fullWidth />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
                <div className={fieldCss.fieldWrapper({ className: 'mb-8' })}>
                  <Label>Major</Label>
                  <Form.Control name="major">
                    <Form.TextField placeholder="Enter your major" fullWidth />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'mb-8',
                  })}
                >
                  <Label required>Birth</Label>
                  <Form.Control name="birthDate" rules={rules.birthDate}>
                    <Form.DatePicker
                      placeholder="Choose your birth"
                      fullWidth
                    />
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'mb-8',
                  })}
                >
                  <Label required>Gender</Label>
                  <Form.Control name="genderType" rules={rules.gender}>
                    <Form.RadioGroup className={fieldCss.radioFieldWrapper()}>
                      <Form.Radio label="Female" value="FEMALE" />
                      <Form.Radio label="Male" value="MALE" />
                    </Form.RadioGroup>
                  </Form.Control>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'mb-8',
                  })}
                >
                  <Label required>Do you have a Visa?</Label>
                  <Form.Control name="hasVisa" rules={rules.hasVisa}>
                    <Form.RadioGroup className={fieldCss.radioFieldWrapper()}>
                      <Form.Radio label="Yes" value="true" />
                      <Form.Radio
                        label="No"
                        value="false"
                        onChange={() => resetVisaType(false)}
                      />
                    </Form.RadioGroup>
                  </Form.Control>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className={fieldCss.fieldWrapper({
                    className: 'mb-8',
                  })}
                >
                  <Label required>Visa Type</Label>
                  <Form.Control
                    name="visaType"
                    rules={rules.visaType}
                    disabled={isVisaTypeDisabled}
                  >
                    <Form.Select
                      placeholder="Choose your visa type"
                      render={value => {
                        if (value.includes('E2')) return 'E-2'

                        return value
                      }}
                    >
                      <Form.SelectItem value="E2">E-2</Form.SelectItem>
                      <Form.SelectItem value="OTHERS">Others</Form.SelectItem>
                    </Form.Select>
                    <Form.ErrorMessage />
                  </Form.Control>
                </div>
              </div>

              <div
                className={fieldCss.fieldWrapper({
                  className: 'not-last:mb-8',
                })}
              >
                <Label required>Student Type</Label>
                <div className="flex gap-[30px]">
                  <Form.CheckboxGroup
                    name="studentType"
                    rules={rules.studentType}
                    options={studentTypeOptions}
                  >
                    <Form.Checkbox label="Kindergarten" value="Kindergarten" />
                    <Form.Checkbox label="Elementary" value="Elementary" />
                    <Form.Checkbox label="Middle School" value="MiddleSchool" />
                    <Form.Checkbox label="High School" value="HighSchool" />
                    <Form.Checkbox label="Adult" value="Adult" />
                  </Form.CheckboxGroup>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <footer className="sticky bottom-0 left-0 h-24 w-full border-t border-gray-300 bg-white">
        <div className="mx-auto h-fit w-fit">
          <div className="mx-[40px] my-6 flex w-[1060px] place-items-center justify-end gap-10">
            <Form.CheckboxGroup
              name="isRepresentative"
              options={['true', 'false']}
            >
              <Form.Checkbox
                label="Selected as a representative resume"
                value="true"
              />
            </Form.CheckboxGroup>
            <Button
              size="large"
              className="w-[180px]"
              onClick={form.handleSubmit(submitForm)}
            >
              Register
            </Button>
          </div>
        </div>
      </footer>
    </Form>
  )
}
