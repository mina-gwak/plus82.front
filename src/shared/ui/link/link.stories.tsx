import type { Meta, StoryObj } from '@storybook/react'

import { Link } from './link'

const meta = {
  title: 'Component/Link',
  component: Link,
  parameters: {
    componentSubtitle:
      'Link is a component that provides a clickable link to navigate to another page.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The size of the button',
    },
    href: {
      control: 'text',
      description: 'The URL the link points to',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
  args: {
    variant: 'primary',
    href: '/',
    children: 'Link',
    disabled: false,
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
