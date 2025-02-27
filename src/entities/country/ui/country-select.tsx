import { Country, CountryWithFlag } from 'entities/country'
import { Form, type FormSelectProps } from 'shared/form'

import { useCountries } from '../api/use-countries'

export const CountrySelect = ({
  placeholder,
  ...restProps
}: FormSelectProps) => {
  const { data: countries } = useCountries()

  const getCountry = (id: number) => {
    return countries?.find(country => country.id === id) as Country
  }

  return (
    <Form.Select
      placeholder={placeholder ?? 'Choose your nationality'}
      render={([id]) => {
        if (countries) {
          return <CountryWithFlag {...getCountry(id as number)} />
        }

        return null
      }}
      {...restProps}
    >
      {countries?.map(country => (
        <Form.SelectItem key={country.id} value={country.id}>
          <CountryWithFlag {...country} />
        </Form.SelectItem>
      ))}
    </Form.Select>
  )
}
