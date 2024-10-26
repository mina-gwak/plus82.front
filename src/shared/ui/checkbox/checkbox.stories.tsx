import type { Meta, StoryObj } from '@storybook/react'

import { useCheckbox } from 'shared/lib'

import { Checkbox } from './checkbox'
import type { Props } from './checkbox'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof Checkbox> = {
  title: 'Component/Checkbox',
  component: Checkbox,
  decorators: [
    Story => (
      <div style={{ width: '32rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'Checkbox is an element that allows users to select multiple items.',
  },
  argTypes: {
    name: {
      description: 'Set the name of the Checkbox.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: 'Set the label of the Checkbox.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'Set the value of the Checkbox.',
      table: {
        type: { summary: 'string | number' },
      },
    },
    error: {
      description: 'Indicates that there is an error in the Checkbox.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    required: {
      description: 'Indicates that the Checkbox is required.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    checked: {
      description: 'Set the checked state of the Checkbox.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    readOnly: {
      description: 'Indicates that the Checkbox is read-only.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    disabled: {
      description: 'Indicates that the Checkbox is disabled.',
      table: {
        type: { summary: 'boolean' },
      },
      control: 'boolean',
    },
    indeterminate: {
      description:
        'If there is a hierarchy in the Checkbox, this option can be applied to the parent Checkbox. If none of the child items are checked, true; if all child items are checked, false; if none of the child items are checked, null.',
      table: {
        type: { summary: 'boolean | null' },
      },
      control: 'boolean',
    },
  },
  args: {
    label: '이름',
    name: 'name',
    value: '',
    error: false,
    required: false,
    disabled: false,
    readOnly: false,
    checked: false,
    indeterminate: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta

const singleCheckboxOption = ['checkbox']

const CheckboxStory = (props: Props) => {
  const { getCheckboxProps } = useCheckbox({
    name: 'checkbox',
    options: singleCheckboxOption,
  })

  return <Checkbox {...props} {...getCheckboxProps('checkbox')} />
}

export const Default: Story = {
  args: {
    label: 'Checkbox',
    error: false,
    required: false,
    disabled: false,
  },
  render: args => <CheckboxStory {...args} />,
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: args => <CheckboxStory {...args} />,
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
  render: args => <CheckboxStory {...args} />,
}

const groupCheckboxOptions = ['childA', 'childB']

const CheckboxGroupStory = () => {
  const { checkedValues, getIndeterminateCheckboxProps, getCheckboxProps } =
    useCheckbox({ name: 'child', options: groupCheckboxOptions })

  const handleButtonClick = () => console.log(checkedValues)

  return (
    <div className="flex flex-col gap-1">
      <Checkbox label="Parent" {...getIndeterminateCheckboxProps()} />
      <Checkbox label="Child A" {...getCheckboxProps('childA')} />
      <Checkbox label="Child B" {...getCheckboxProps('childB')} />
      <button type="button" onClick={handleButtonClick} className="w-fit">
        Check Values
      </button>
    </div>
  )
}

export const Group: Story = {
  args: {
    label: '이름',
    name: 'name',
    error: false,
    required: false,
    disabled: false,
  },
  render: () => <CheckboxGroupStory />,
}
