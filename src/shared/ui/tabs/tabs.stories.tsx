import type { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'

import * as Tabs from './tabs'

const TabsStory = (props: ComponentProps<typeof Tabs.List>) => {
  return (
    <div className="flex w-[500px] justify-center">
      <Tabs.Root defaultValue="A">
        <Tabs.List {...props}>
          <Tabs.Trigger value="A">Tab A</Tabs.Trigger>
          <Tabs.Trigger value="B">Tab B</Tabs.Trigger>
          <Tabs.Trigger value="C">Tab C</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="A">Tab A</Tabs.Content>
        <Tabs.Content value="B">Tab B</Tabs.Content>
        <Tabs.Content value="C">Tab C</Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

const meta = {
  title: 'Component/Tabs',
  component: Tabs.List,
  parameters: {
    componentSubtitle:
      'Tabs allow users to navigate between different sections of content.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['box', 'underline'],
      description: 'Set the variant of the Tabs.',
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Set the size of the Tabs.',
    },
    width: {
      control: 'select',
      options: ['full', 'fit'],
      description: 'Set the width of the Tabs.',
    },
  },
  args: {
    variant: 'box',
    size: 'small',
    width: 'fit',
  },
  render: TabsStory,
} satisfies Meta<typeof Tabs.List>

export default meta

type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Underline: Story = {
  args: {
    variant: 'underline',
    size: 'small',
  },
}

export const UnderlineLarge: Story = {
  args: {
    variant: 'underline',
    size: 'large',
  },
}
