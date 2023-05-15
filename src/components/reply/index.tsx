import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { PublicPost } from 'interfaces'
import { useSincePosted } from 'src/utils'

interface ReplyProps {
  post: PublicPost
  reply: boolean
}

export const Reply: React.FC<ReplyProps> = ({ post, reply }) => {
  const replyClasses = clsx(
    reply
      ? 'text-sm font-extrabold text-tertiary break-words'
      : 'text-xl font-extrabold text-tertiary break-words',
  )

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
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

          {reply && (
            <div className="flex gap-3">
              <p className="text-sm font-medium text-quarterly">17</p>
              <HeartIcon className="w-4 font-medium text-quarterly" />
            </div>
          )}
        </div>

        <p className={replyClasses}>{post.body}</p>
      </div>
      <div className="w-full h-[1px] bg-quarterly my-5 opacity-10" />
    </div>
  )
}

export default Reply
