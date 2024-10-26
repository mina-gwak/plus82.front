import type { Meta, StoryObj } from '@storybook/react'

import { useRadio } from 'shared/lib'

import { Radio, type Props } from './radio'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof Radio> = {
  title: 'Component/Radio',
  component: Radio,
  parameters: {
    componentSubtitle:
      'Radio is a form element that allows the user to select one option from a list of options.',
  },
  argTypes: {
    label: {
      description:
        'You can set the text that represents the option of the Radio.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: 'You can set the name of the Radio.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'You can set the value of the Radio.',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      description: 'Indicates that there is an error in the Radio.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the Radio is disabled.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    readOnly: {
      description: 'Whether the Radio is read-only.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    checked: {
      description: 'Whether the Radio is checked.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
  },
  args: {
    label: 'Radio',
    name: 'radio',
    value: 'true',
    error: false,
    disabled: false,
    readOnly: false,
    checked: false,
  },
} satisfies Meta<typeof Radio>

export default meta

const RadioStory = ({
  name,
  label,
  value,
  error,
  disabled,
  readOnly,
}: Props) => {
  const { isChecked, updateCheckedValue } = useRadio()

  return (
    <Radio
      label={label}
      value={value}
      name={name}
      checked={isChecked(value)}
      onChange={() => {
        updateCheckedValue(value)
      }}
      error={error}
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}

const RadioGroupStory = ({ name, error, disabled, readOnly }: Props) => {
  const { isChecked, updateCheckedValue } = useRadio()

  return (
    <>
      <Radio
        label="Label A"
        value="true"
        name={name}
        checked={isChecked('true')}
        onChange={() => {
          updateCheckedValue('true')
        }}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
      />
      <div className="mx-2" />
      <Radio
        label="Label B"
        value="false"
        name={name}
        checked={isChecked('false')}
        onChange={() => {
          updateCheckedValue('false')
        }}
        error={error}
        disabled={disabled}
        readOnly={readOnly}
      />
    </>
  )
}

export const Default: Story = {
  args: {
    label: 'Radio',
    name: 'radio',
    value: 'true',
    error: false,
    disabled: false,
    readOnly: false,
  },
  render: ({ name, label, value, error, disabled, readOnly }) =>
    RadioStory({
      name,
      label,
      value,
      error,
      disabled,
      readOnly,
    }),
}

export const RadioGroup: Story = {
  args: {
    name: 'radioGroup',
    error: false,
    disabled: false,
    readOnly: false,
  },
  render: ({ name, value, error, disabled, readOnly }) =>
    RadioGroupStory({ name, value, error, disabled, readOnly }),
}
