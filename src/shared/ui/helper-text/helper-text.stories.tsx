import type { Meta, StoryObj } from '@storybook/react'

import { HelperText } from './helper-text'

const meta = {
  title: 'Component/HelperText',
  component: HelperText,
  parameters: {
    componentSubtitle:
      'HelperText is a component that provides additional information about a form field.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'The variant of the helper text',
    },
    hasIcon: {
      control: 'boolean',
      description: 'Whether the helper text has an icon',
    },
    children: {
      control: 'text',
      description: 'The content of the helper text',
    },
  },
  args: {
    variant: 'default',
    hasIcon: false,
    children: 'Helper text message',
  },
} satisfies Meta<typeof HelperText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Error: Story = {
  args: {
    variant: 'error',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
}

export const WithIcon: Story = {
  args: {
    hasIcon: true,
  },
}
