import type { Meta, StoryObj } from '@storybook/react'

import { Slot } from 'shared/lib'

import { TextField } from './text-field'

const meta = {
  title: 'Component/TextField',
  component: TextField,
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'TextField is an interactive element that displays the user input.',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'The type of the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'The class name of the text field',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of the text field',
      table: {
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the text field should take up the full width',
      table: {
        type: { summary: 'boolean' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the text field has an error',
      table: {
        type: { summary: 'boolean' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the text field is read-only',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the text field is disabled',
      table: {
        type: { summary: 'boolean' },
      },
    },
    maxLength: {
      control: 'number',
      description: 'The maximum length of the text field',
      table: {
        type: { summary: 'number' },
      },
    },
    autoComplete: {
      control: 'text',
      description: 'The autocomplete attribute of the text field',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    type: 'text',
    placeholder: 'placeholder',
    fullWidth: false,
    error: false,
    readOnly: false,
    disabled: false,
    maxLength: 255,
    autoComplete: 'off',
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Error: Story = {
  args: {
    error: true,
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// TODO: 아이콘으로 교체
export const WithSlot: Story = {
  args: {
    children: (
      <>
        <Slot name="left">
          <p>Left</p>
        </Slot>
        <Slot name="right">
          <p>Right</p>
        </Slot>
      </>
    ),
  },
}
