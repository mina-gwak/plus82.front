import { colors } from 'shared/config'
import { useDropdown } from 'shared/lib'

import { Dropdown } from '../dropdown'
import { Icon } from '../icon'

export const NotificationButton = () => {
  const { isOpen, toggleIsOpen, dropdownRef } = useDropdown()

  const handleClick = () => {
    toggleIsOpen()
  }

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center justify-center"
    >
      <button onClick={handleClick}>
        <Icon name="Bell" size="large" color={colors.gray[900]} />
      </button>
      {isOpen && (
        <Dropdown
          className="w-[360px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]"
          scrollable={false}
          align="right"
        >
          <Dropdown.Item>
            <div className="flex items-center justify-start gap-1">
              <Icon
                name="ExclamationMark"
                size="large"
                color={colors.gray[500]}
                className="relative -top-px"
              />
              <p className="body-large text-gray-500">
                You have no notifications yet
              </p>
            </div>
          </Dropdown.Item>
        </Dropdown>
      )}
    </div>
  )
}
