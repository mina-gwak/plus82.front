import ArrowBack from './arrow-back.svg'
import Bell from './bell.svg'
import BookMarkOff from './bookmark-off.svg'
import BookMarkOn from './bookmark-on.svg'
import Business from './business.svg'
import CheckIndeterminate from './check-indeterminate.svg'
import CheckOutline from './check-outline.svg'
import Check from './check.svg'
import ChevronDown from './chevron-down.svg'
import ChevronLeft from './chevron-left.svg'
import ChevronRight from './chevron-right.svg'
import ChevronUp from './chevron-up.svg'
import Clear from './clear.svg'
import Close from './close.svg'
import Comment from './comment.svg'
import Copy from './copy.svg'
import Date from './date.svg'
import Delete from './delete.svg'
import DocumentSearch from './document-search.svg'
import Dot from './dot.svg'
import Download from './download.svg'
import Earth from './earth.svg'
import ExclamationMark from './exclamation-mark.svg'
import EyesOff from './eyes-off.svg'
import EyesOn from './eyes-on.svg'
import Filter from './filter.svg'
import HeartFilled from './heart-filled.svg'
import Heart from './heart.svg'
import Image from './image.svg'
import Language from './language.svg'
import LocationFilled from './location-filled.svg'
import Message from './message.svg'
import Money from './money.svg'
import Pen from './pen.svg'
import Plus from './plus.svg'
import Queen from './queen.svg'
import Reset from './reset.svg'
import Search from './search.svg'
import Share from './share.svg'
import StarFill from './star-fill.svg'
import Upload from './upload.svg'
import User from './user.svg'

export const IconComponent = {
  ArrowBack,
  Bell,
  BookMarkOff,
  BookMarkOn,
  Business,
  Check,
  CheckIndeterminate,
  CheckOutline,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clear,
  Close,
  Comment,
  Copy,
  Date,
  Delete,
  DocumentSearch,
  Dot,
  Download,
  Earth,
  ExclamationMark,
  EyesOff,
  EyesOn,
  Filter,
  HeartFilled,
  Heart,
  Image,
  Language,
  LocationFilled,
  Message,
  Money,
  Pen,
  Plus,
  Queen,
  Reset,
  Search,
  Share,
  StarFill,
  Upload,
  User,
} as const

export type IconType = keyof typeof IconComponent
