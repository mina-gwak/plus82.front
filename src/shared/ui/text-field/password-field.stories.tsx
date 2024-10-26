import type { Meta, StoryObj } from '@storybook/react'

import { PasswordField } from './password-field'

const meta = {
  title: 'Component/PasswordField',
  component: PasswordField,
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'PasswordField is an interactive element that displays the user input.',
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
    showToggle: {
      control: 'boolean',
      description: 'Whether to show the password visibility toggle',
      table: {
        type: { summary: 'boolean' },
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
    showToggle: true,
  },
} satisfies Meta<typeof PasswordField>

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

export const NoToggle: Story = {
  args: {
    showToggle: false,
  },
}
