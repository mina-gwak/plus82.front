import BookMarkOff from './bookmark-off.svg'
import BookMarkOn from './bookmark-on.svg'
import CheckIndeterminate from './check-indeterminate.svg'
import Check from './check.svg'
import ChevronDown from './chevron-down.svg'
import ChevronLeft from './chevron-left.svg'
import ChevronRight from './chevron-right.svg'
import ChevronUp from './chevron-up.svg'
import Clear from './clear.svg'
import Close from './close.svg'
import Date from './date.svg'
import EyesOff from './eyes-off.svg'
import EyesOn from './eyes-on.svg'
import Language from './language.svg'
import LocationFilled from './location-filled.svg'
import Money from './money.svg'
import Search from './search.svg'

export const IconComponent = {
  BookMarkOff,
  BookMarkOn,
  Check,
  CheckIndeterminate,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clear,
  Close,
  Date,
  EyesOff,
  EyesOn,
  Language,
  LocationFilled,
  Money,
  Search,
} as const

export type IconType = keyof typeof IconComponent
