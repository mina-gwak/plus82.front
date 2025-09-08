export type Comment = {
  id: number
  comment: string
  createdAt: string
  likeCount: number
  userId: number
  userName: string
  isLiked: boolean
  profileImagePath: string | null
}

export type Feed = {
  id: number
  content: string
  createdAt: string
  creatorId: number
  creatorName: string
  creatorProfileImagePath: string | null
  imagePath: string | null
  commentCount: number
  likeCount: number
  isLiked: boolean
  isCommented: boolean
}

export type FeedDetail = Omit<Feed, 'imagePath'> & {
  feedVisibility: 'PUBLIC' | 'PRIVATE'
  comments: Comment[]
  image: {
    id: number
    path: string
  } | null
}

export type FeedLike = {
  id: number
  createdAt: string
  userId: number
  name: string
  profileImagePath: string
}
