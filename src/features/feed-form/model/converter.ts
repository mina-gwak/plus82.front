import { FeedDetail } from 'entities/feed'

import { FormValues } from './form-values'

export const convertFormValuesToAddFeedValues = (data: FormValues) => {
  return {
    content: data.content,
    ...(data.image.image && { image: data.image.image }),
    feedVisibility: data.feedVisibility,
  }
}

export const convertFeedToFormValues = (data: FeedDetail) => {
  return {
    content: data.content,
    image: {
      imageId: data.image?.id ?? null,
      image: null,
      url: data.image?.path ?? null,
    },
    feedVisibility: data.feedVisibility,
  }
}

export const convertFormValuesToUpdateFeedValues = (data: FormValues) => {
  return {
    content: data.content,
    ...(data.image.image && { newImage: data.image.image }),
    ...(data.image.imageId && { oldImageId: data.image.imageId }),
    feedVisibility: data.feedVisibility,
  }
}
