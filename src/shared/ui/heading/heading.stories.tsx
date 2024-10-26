import type { Meta, StoryObj } from '@storybook/react'

import { Heading } from './heading'

const meta = {
  title: 'Component/Heading',
  component: Heading,
  decorators: [
    Story => (
      <div style={{ width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      description: 'The size of the Heading',
      control: 'select',
      options: ['small', 'medium'],
    },
    as: {
      description: 'The semantic element of the Heading',
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: {
      description: 'The content of the Heading',
      control: 'text',
    },
  },
  args: {
    size: 'small',
    as: 'h1',
    children: 'Heading',
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}
