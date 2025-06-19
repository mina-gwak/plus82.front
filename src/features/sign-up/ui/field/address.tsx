import { useTranslations } from 'next-intl'
import { useState } from 'react'
import DaumPostcode, { type Address as AddressType } from 'react-daum-postcode'
import { useFormContext } from 'react-hook-form'

import { fieldCss, Form } from 'shared/form'
import { Button, Label, Modal } from 'shared/ui'

import { useGeocoding } from '../../lib/use-geocoding'
import { convertToLocationType } from '../../lib/util'
import {
  address as addressRule,
  detailedAddress as detailedAddressRule,
} from '../../model/rules'

export const Address = () => {
  const t = useTranslations()

  const { geocode } = useGeocoding()

  const [isOpen, setIsOpen] = useState(false)

  const form = useFormContext()

  const handleButtonClick = () => {
    setIsOpen(true)
  }

  const handleCompleteSearchingCode = (data: AddressType) => {
    if (form.formState.errors.address) {
      form.clearErrors('address')
    }

    form.setValue('address', data.address)
    form.setValue('locationType', convertToLocationType(data.sido))

    geocode(data.address, ({ lat, lng }) => {
      form.setValue('lat', lat)
      form.setValue('lng', lng)
    })

    setIsOpen(false)
  }

  return (
    <div className={fieldCss.fieldWrapper()}>
      <Label required>{t('field.address.label')}</Label>
      <div className="flex gap-2">
        <Form.Control name="address" rules={addressRule}>
          <Form.TextField readOnly className="bg-gray-100" />
        </Form.Control>
        <Modal open={isOpen} onOpenChange={setIsOpen}>
          <Button
            variant="lined"
            size="large"
            className="w-[120px] shrink-0"
            onClick={handleButtonClick}
          >
            주소 검색
          </Button>
          <Modal.Content className="h-[600px] w-[450px]">
            <DaumPostcode
              style={{ height: '500px' }}
              onComplete={handleCompleteSearchingCode}
            />
          </Modal.Content>
        </Modal>
      </div>
      <Form.Control name="detailedAddress" rules={detailedAddressRule}>
        <Form.TextField placeholder={t('field.address.placeholder')} />
        <Form.ErrorMessage />
      </Form.Control>
    </div>
  )
}
