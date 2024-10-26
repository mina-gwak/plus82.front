import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Calendar, Props } from './calendar'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof Calendar> = {
  title: 'Component/Calendar',
  component: Calendar,
  decorators: [
    Story => (
      <div style={{ height: '350px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'Calendar is a component that provides date selection and navigation functionality.',
  },
  argTypes: {
    selected: {
      control: { disable: true },
      description: 'The selected date value.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: { disable: true },
      description: 'Specifies the handler to call when the date changes.',
      table: {
        type: { summary: 'function' },
      },
    },
    minDate: {
      control: { disable: true },
      description: 'Sets the minimum date that the user can select.',
      table: {
        type: { summary: 'string' },
      },
    },
    maxDate: {
      control: { disable: true },
      description: 'Sets the maximum date that the user can select.',
      table: {
        type: { summary: 'string' },
      },
    },
    excludeDates: {
      control: { disable: true },
      description:
        'Specifies specific dates to exclude from the calendar as an array. For example, you can exclude holiday and public holiday dates to prevent them from being selected.',
      table: {
        type: { summary: 'array' },
      },
    },
    customInput: {
      control: { disable: true },
      description: 'Provides a custom user-defined input element.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta

const CalendarStory = ({
  selected = null,
  minDate,
  maxDate,
  excludeDates,
  ...restProps
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | Date | null>(
    selected,
  )

  return (
    <Calendar
      {...restProps}
      onChange={date => setSelectedDate(date)}
      selected={selectedDate}
      minDate={minDate}
      maxDate={maxDate}
      excludeDates={excludeDates}
      inline
    />
  )
}

export const Default: Story = {
  args: {
    selected: undefined,
  },
  render: CalendarStory,
}
