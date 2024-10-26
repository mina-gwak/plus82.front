import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Switch } from './switch'

const meta = {
  title: 'Component/Switch',
  component: Switch,
  parameters: {
    componentSubtitle:
      'Switch is an interactive element that allows users to turn a specific setting on and off.',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Set the state of the Switch.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the Switch.',
    },
    label: {
      control: 'text',
      description: 'Set the label of the Switch.',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Set the label position of the Switch.',
    },
  },
  args: {
    label: '',
    checked: false,
    disabled: false,
    labelPlacement: 'end',
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

const SwitchStory = ({ checked: checkedProp = false, ...restProps }) => {
  const [checked, setChecked] = useState(checkedProp)

  const handleToggleClick = () => setChecked(prevChecked => !prevChecked)

  useEffect(() => {
    setChecked(checkedProp)
  }, [checkedProp])

  return <Switch {...restProps} checked={checked} onClick={handleToggleClick} />
}

export const Default: Story = {
  render: SwitchStory,
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: SwitchStory,
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: SwitchStory,
}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
  render: SwitchStory,
}
