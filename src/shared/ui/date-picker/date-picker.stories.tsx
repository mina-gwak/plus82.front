import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { DatePicker, type Props } from './date-picker'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof DatePicker> = {
  title: 'Component/DatePicker',
  component: DatePicker,
  decorators: [
    Story => (
      <div style={{ height: '400px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'DatePicker is an interactive element that allows users to select a date.',
  },
  argTypes: {
    name: {
      description: 'Set the name of the DatePicker.',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      description: 'Set the placeholder of the DatePicker.',
      table: {
        type: { summary: 'string' },
      },
      defaultValue: { summary: 'MM-DD-YYYY' },
    },
    error: {
      description: 'Indicate that there is an error in the DatePicker.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    disabled: {
      description: 'Disable the DatePicker.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    readOnly: {
      description: 'Set the DatePicker to read-only.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
      defaultValue: { summary: 'false' },
    },
    dateFormat: {
      description: 'Set the date format of the DatePicker.',
      table: {
        type: { summary: 'string' },
      },
    },
    excludeDates: {
      description:
        'Specifies specific dates to exclude from the calendar as an array. For example, you can exclude holiday and public holiday dates to prevent them from being selected.',
      table: {
        type: { summary: 'array' },
      },
    },
  },
  args: {
    name: 'name',
    placeholder: 'MM-DD-YYYY',
    error: false,
    disabled: false,
    readOnly: false,
    dateFormat: 'MM-dd-yyyy',
  },
} satisfies Meta<typeof DatePicker>

export default meta

const DateFieldStory = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>()

  return (
    <DatePicker
      {...props}
      onChange={date => setSelectedDate(date)}
      selected={selectedDate}
    />
  )
}

export const Default: Story = {
  render: DateFieldStory,
}
