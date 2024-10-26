import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsProps } from './tabs'

const meta = {
  title: 'Component/Tabs',
  component: Tabs,
  parameters: {
    componentSubtitle:
      'Tabs allow users to navigate between different sections of content.',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Set the default value of the Tabs.',
    },
    value: {
      control: 'text',
      description: 'Set the value of the Tabs.',
    },
    onChange: {
      description:
        'Callback function that is triggered when the value changes.',
      table: {
        type: { summary: 'function' },
      },
    },
  },
  args: {
    defaultValue: 'one',
    value: '',
    onChange: () => {},
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const TabsStory = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <Tabs.Trigger value="A">Tab A</Tabs.Trigger>
      <Tabs.Trigger value="B">Tab B</Tabs.Trigger>
      <Tabs.Trigger value="C">Tab C</Tabs.Trigger>
    </Tabs>
  )
}

export const Default: Story = {
  render: TabsStory,
}
