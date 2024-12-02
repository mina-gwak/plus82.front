import type { Meta, StoryObj } from '@storybook/react'

import { Chip } from './chip'

const meta: Meta<typeof Chip> = {
  title: 'Component/Chip',
  component: Chip,
  parameters: {
    componentSubtitle:
      'Chip is used to represent tags, selected items, etc. Chips can be interactive with users.',
    docs: {
      description: {
        component:
          '- You can use the following components as Children. \n' +
          '- <Chip.Icon> : A component that can be used to display an Icon inside the Chip. \n' +
          '- <Chip.Label> : A component that displays the contents of the Chip. \n' +
          '- <Chip.RemoveButton> : A component that shows a button that can remove the Chip when used to display selected items.',
      },
    },
  },
  args: {
    size: 'medium',
    variant: 'lined',
    selected: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Set the size of the Chip.',
      table: {
        type: { summary: 'small | medium | large' },
      },
    },
    variant: {
      control: 'select',
      options: ['lined', 'solid'],
      description: 'Set the variant of the Chip.',
      table: {
        type: { summary: 'lined | solid' },
      },
    },
    selected: {
      description: 'Set the selected state of the Chip.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Set the Chip to a disabled state.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'lined',
    selected: false,
    disabled: false,
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Icon name="BookMarkOn" />
      <Chip.Label>Default</Chip.Label>
      <Chip.RemoveButton />
    </Chip>
  ),
}

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Label>Small</Chip.Label>
    </Chip>
  ),
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Label>Medium</Chip.Label>
    </Chip>
  ),
}

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Label>Large</Chip.Label>
    </Chip>
  ),
}

export const Lined: Story = {
  args: {
    variant: 'lined',
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Icon name="BookMarkOn" />
      <Chip.Label>Lined</Chip.Label>
    </Chip>
  ),
}

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Icon name="BookMarkOn" />
      <Chip.Label>Solid</Chip.Label>
    </Chip>
  ),
}

export const WithIcon: Story = {
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Icon name="BookMarkOn" />
      <Chip.Label>With icon</Chip.Label>
    </Chip>
  ),
}

export const WithRemoveButton: Story = {
  args: {
    selected: true,
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Label>With remove button</Chip.Label>
      <Chip.RemoveButton />
    </Chip>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ size, variant, selected, disabled }) => (
    <Chip size={size} variant={variant} selected={selected} disabled={disabled}>
      <Chip.Icon name="BookMarkOn" />
      <Chip.Label>Disabled</Chip.Label>
      <Chip.RemoveButton />
    </Chip>
  ),
}
