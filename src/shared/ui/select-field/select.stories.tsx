import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'Component/Select',
  component: Select,
  decorators: [
    Story => (
      <div style={{ width: '21rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'SelectField is one of the form elements that allows users to select an option from a list.',
    docs: {
      description: {
        component:
          '- The following components can be used as Children. \n' +
          '- <Select.Item> : You can write options to display in Select. \n',
      },
    },
  },
  argTypes: {
    name: {
      type: 'string',
      description: 'You can set the name of the field.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'You can set the size of the field.',
    },
    error: {
      control: 'boolean',
      description: 'You can set the error status.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    multiple: {
      control: 'boolean',
      description:
        'You can set whether to allow multiple options to be selected.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'You can set the disabled status.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'You can set the read-only status.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      description: 'You can set whether the field is required.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      type: 'string',
      description: 'You can set the text to display when there is no value.',
      table: {
        type: { summary: 'string' },
      },
    },
    selectionLimit: {
      type: 'number',
      description:
        'If multiple values can be selected, you can set the number of values that can be selected.',
      table: {
        type: { summary: 'number' },
      },
    },
    displayValue: {
      description:
        'You can set the value to display in the field using the selected value.',
      table: {
        type: { summary: 'function' },
      },
    },
    nullable: {
      control: 'boolean',
      description: 'You can set whether to allow the field to be empty.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    render: {
      description:
        'You can set the custom rendering function for the selected values.',
      table: {
        type: { summary: 'object' },
      },
    },
  },
  args: {
    name: '',
    size: 'large',
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    multiple: false,
    nullable: false,
    placeholder: 'Placeholder',
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'select',
    required: false,
    disabled: false,
    readOnly: false,
    error: false,
    multiple: false,
    placeholder: 'Placeholder',
  },
  render: props => (
    <Select {...props}>
      {Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`).map(
        value => (
          <Select.Item key={value} value={value}>
            {value}
          </Select.Item>
        ),
      )}
    </Select>
  ),
}
