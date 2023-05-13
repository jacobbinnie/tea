import { HeartIcon } from '@heroicons/react/24/solid'
import { PublicPost } from 'interfaces'
import { useSincePosted } from 'src/utils'

interface ReplyProps {
  post: PublicPost
}

export const Reply: React.FC<ReplyProps> = ({ post }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div className="flex w-full gap-2 items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-quarterly">
              {post.user.name}
            </p>
            <p>•</p>
          </div>
          <p className="text-sm font-medium text-quarterly">
            {useSincePosted(post.timestamp)}
          </p>
        </div>

        <p className="text-sm font-medium text-tertiary break-words">
          {post.body}
        </p>
      </div>
    </div>
  )
}

export default Reply
