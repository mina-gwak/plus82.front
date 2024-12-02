import BookMarkOff from './bookmark-off.svg'
import BookMarkOn from './bookmark-on.svg'
import CheckIndeterminate from './check-indeterminate.svg'
import CheckOutline from './check-outline.svg'
import Check from './check.svg'
import ChevronDown from './chevron-down.svg'
import ChevronLeft from './chevron-left.svg'
import ChevronRight from './chevron-right.svg'
import ChevronUp from './chevron-up.svg'
import Clear from './clear.svg'
import Close from './close.svg'
import Date from './date.svg'
import Delete from './delete.svg'
import Dot from './dot.svg'
import Earth from './earth.svg'
import ExclamationMark from './exclamation-mark.svg'
import EyesOff from './eyes-off.svg'
import EyesOn from './eyes-on.svg'
import Filter from './filter.svg'
import Language from './language.svg'
import LocationFilled from './location-filled.svg'
import Message from './message.svg'
import Money from './money.svg'
import Plus from './plus.svg'
import Reset from './reset.svg'
import Search from './search.svg'
import Upload from './upload.svg'
import User from './user.svg'

export const IconComponent = {
  BookMarkOff,
  BookMarkOn,
  Check,
  CheckIndeterminate,
  CheckOutline,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clear,
  Close,
  Date,
  Delete,
  Dot,
  Earth,
  ExclamationMark,
  EyesOff,
  EyesOn,
  Filter,
  Language,
  LocationFilled,
  Message,
  Money,
  Plus,
  Reset,
  Search,
  Upload,
  User,
} as const

export type IconType = keyof typeof IconComponent
