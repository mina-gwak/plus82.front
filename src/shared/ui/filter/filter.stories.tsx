import type { Meta, StoryObj } from '@storybook/react'

import { Filter } from './filter'

const meta: Meta<typeof Filter> = {
  title: 'Component/Filter',
  component: Filter,
  decorators: [
    Story => (
      <div style={{ width: '21rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      'Filter is a component that allows you to select multiple options from a list.',
    docs: {
      description: {
        component:
          '- The following components can be used as Children. \n' +
          '- <Filter.Item> : You can write options to display in Select. \n',
      },
    },
  },
  argTypes: {
    name: {
      type: 'string',
      description: 'You can set the name of the field.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'You can set the disabled status.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    displayLimit: {
      type: 'number',
      description:
        'You can set the number of values that can be displayed in Dropdown.',
      table: {
        type: { summary: 'number' },
      },
    },
    selectionLimit: {
      type: 'number',
      description: 'You can set the number of values that can be selected.',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    name: 'filter',
    disabled: false,
  },
} satisfies Meta<typeof Filter>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: props => (
    <Filter {...props}>
      {Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`).map(
        value => (
          <Filter.Item key={value} value={value}>
            {value}
          </Filter.Item>
        ),
      )}
    </Filter>
  ),
}
