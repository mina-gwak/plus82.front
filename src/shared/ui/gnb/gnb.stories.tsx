import type { Meta, StoryObj } from '@storybook/react'

import { GNB } from './gnb'

const meta = {
  title: 'Component/GNB',
  component: GNB,
  decorators: [
    Story => (
      <div style={{ width: '80vw' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GNB>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
