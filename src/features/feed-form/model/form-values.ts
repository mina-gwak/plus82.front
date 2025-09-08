export type FormValues = {
  content: string
  image: {
    imageId: number | null
    image: File | null
    url: string | null
  }
  feedVisibility: 'PUBLIC' | 'PRIVATE'
}

export const defaultValues: FormValues = {
  content: '',
  image: {
    imageId: null,
    image: null,
    url: null,
  },
  feedVisibility: 'PUBLIC',
}
