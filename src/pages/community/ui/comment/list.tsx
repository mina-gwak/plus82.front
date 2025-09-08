import { Comment } from 'entities/feed'

import { CommentItem } from './item'

export type Props = {
  feedId: number
  comments: Comment[]
  isPublic: boolean
}

export const CommentList = ({ feedId, comments, isPublic }: Props) => {
  if (comments.length === 0) {
    return null
  }

  return (
    <ul className="mt-5 space-y-5">
      {comments.map(comment => (
        <li key={comment.id} className="flex gap-3">
          <CommentItem
            key={comment.id}
            feedId={feedId}
            {...comment}
            isPublic={isPublic}
          />
        </li>
      ))}
    </ul>
  )
}
