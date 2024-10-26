import type { Meta, StoryObj } from '@storybook/react'

import { IconComponent } from './assets'
import { colors, Icon } from './icon'

const meta = {
  title: 'Component/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(IconComponent),
      description: 'The variant of the button',
      table: {
        type: { summary: Object.keys(IconComponent).join(' | ') },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xLarge'],
      description: 'The size of the button',
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Whether the button is disabled',
      table: {
        type: { summary: colors.join(' | ') },
      },
    },
  },
  args: {
    name: 'BookMarkOff',
    size: 'large',
    color: '#000000',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
