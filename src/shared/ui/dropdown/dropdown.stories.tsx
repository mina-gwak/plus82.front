import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'
import { useLayoutEffect } from 'react'

import { cn, useDropdown } from 'shared/lib'

import { Dropdown, DropdownRootProps } from './dropdown'
import { wrapperOnlyForStory } from './variants'

const meta = {
  title: 'Component/Dropdown',
  component: Dropdown,
  parameters: {
    componentSubtitle:
      'Dropdown is a component that displays a list of options that the user can select.',
    docs: {
      description: {
        component:
          '- The following components can be used as Children \n' +
          '- <Dropdown.Group> : You can group options together in a dropdown. \n' +
          '- <Dropdown.Item> : You can create options to appear in the dropdown. \n',
      },
    },
  },
  argTypes: {
    displayLimit: {
      control: 'number',
      description:
        'Sets the number of items that can be displayed at once in the dropdown.',
      table: {
        type: { summary: 'number' },
      },
    },
    role: {
      control: 'text',
      description: 'Sets the ARIA role for the dropdown.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    displayLimit: 5,
    role: 'menu',
  },
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

type DropdownStoryPropsType = DropdownRootProps & {
  render: (
    props: Pick<
      ReturnType<typeof useDropdown>,
      'selectedValue' | 'updateSelectedValue'
    >,
  ) => ReactNode
}

const DropdownStory = ({ render, ...restProps }: DropdownStoryPropsType) => {
  const {
    isOpen,
    selectedValue,
    dropdownRef,
    open,
    updateSelectedValue,
    handleTriggerClick,
    handleTriggerKeyDown,
  } = useDropdown()

  useLayoutEffect(() => {
    open()
  }, [open])

  return (
    <div className={cn(wrapperOnlyForStory())} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        {selectedValue ?? 'Trigger'}
      </button>
      {isOpen && (
        <Dropdown {...restProps}>
          {render({ ...restProps, selectedValue, updateSelectedValue })}
        </Dropdown>
      )}
    </div>
  )
}

export const Default: Story = {
  render: args => (
    <DropdownStory
      {...args}
      render={() => (
        <>
          {Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`).map(
            value => (
              <Dropdown.Item
                key={value}
                value={value}
                onClick={() => console.log(value)}
              >
                {value}
              </Dropdown.Item>
            ),
          )}
        </>
      )}
    />
  ),
}

export const Selectable: Story = {
  render: args => (
    <DropdownStory
      {...args}
      render={({ selectedValue, updateSelectedValue }) => (
        <>
          {Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`).map(
            value => (
              <Dropdown.Item
                key={value}
                value={value}
                onClick={() => updateSelectedValue(value)}
                selected={value === selectedValue}
              >
                {value}
              </Dropdown.Item>
            ),
          )}
        </>
      )}
    />
  ),
}

export const Grouping: Story = {
  render: args => (
    <DropdownStory
      {...args}
      render={() => (
        <>
          <Dropdown.Group>
            <Dropdown.Item>Item 1</Dropdown.Item>
            <Dropdown.Item selected>Item 2</Dropdown.Item>
            <Dropdown.Item>Item 3</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Group>
            <Dropdown.Item>Item 3</Dropdown.Item>
            <Dropdown.Item>Item 4</Dropdown.Item>
            <Dropdown.Item>Item 6</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Group>
            <Dropdown.Item>Item 7</Dropdown.Item>
            <Dropdown.Item>Item 8</Dropdown.Item>
            <Dropdown.Item>Item 9</Dropdown.Item>
          </Dropdown.Group>
        </>
      )}
    />
  ),
}
