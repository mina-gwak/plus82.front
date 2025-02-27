import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './button'

const meta = {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'tonal', 'lined', 'text'],
      description: 'The variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should be full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Tonal: Story = {
  args: {
    variant: 'tonal',
  },
}

export const Lined: Story = {
  args: {
    variant: 'lined',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Button.Icon name="Plus" />
        Button
      </>
    ),
  },
}
