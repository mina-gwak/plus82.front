import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import { toast } from 'react-toastify'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (file: File) => void
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

export const ImageUploadInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, ...props }, ref) => {
    const isAllowedType = (type: string) =>
      ['image/jpeg', 'image/jpg', 'image/png'].includes(type)

    const isAllowedSize = (size: number) => size <= MAX_FILE_SIZE

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (!file) return

      if (!isAllowedType(file.type)) {
        toast.error('Invalid file type')
        event.target.value = ''

        return
      }

      if (!isAllowedSize(file.size)) {
        toast.error('File size must be less than 5MB')
        event.target.value = ''

        return
      }

      onChange(file)
    }

    return (
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
        {...props}
      />
    )
  },
)
ImageUploadInput.displayName = 'ImageUploadInput'
