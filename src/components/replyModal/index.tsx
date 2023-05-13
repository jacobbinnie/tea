import clsx from 'clsx'
import { AppUser, PublicPost } from 'interfaces'
import Image from 'next/image'
import {
  HeartIcon,
  MapPinIcon,
  XCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/solid'
import { useState } from 'react'

interface ReplyModalProps {
  handleCreateComment: (body: string) => boolean | undefined
  user: AppUser
  replyWindow: boolean
  toggleReplyWindow: () => void
  post: PublicPost
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  handleCreateComment,
  replyWindow,
  toggleReplyWindow,
  post,
  user,
}) => {
  const [loading, setLoading] = useState(false)
  const [newBody, setNewBody] = useState<string>()

  const handleUpdateNewBody = (body: string) => {
    if (newBody && newBody.length <= 100) {
      setNewBody(body)
    }
  }

  const handleCreateReplyUx = () => {
    setLoading(true)
    if (newBody) {
      const res = handleCreateComment(newBody)

      if (res) {
        toggleReplyWindow()
        setLoading(false)
        handleUpdateNewBody('')
      } else {
        setLoading(false)
        alert("Something went wrong, we couldn't create your post.")
      }
    }
  }

  const componentClasses = clsx(
    replyWindow
      ? 'bg-secondary opacity-100 h-full w-full flex fixed bottom-0 right-0 flex-col px-4 py-5 border-t-4 border-primary transition-all duration-500 items-center z-20'
      : 'bg-tertiary h-full w-0 py-5 opacity-0 flex fixed bottom-0 right-0 flex-col transition-all border-t-4 border-primary duration-500 items-center',
  )

  const countClasses = clsx(
    newBody && newBody.length > 89
      ? 'text-sm font-medium text-[red]'
      : 'text-sm font-medium text-quarterly',
  )

  return (
    <div className={componentClasses}>
      <div className="flex w-full">
        <button
          onClick={toggleReplyWindow}
          disabled={!replyWindow}
          className="cursor-pointer flex gap-1 px-3 py-1 rounded-xl z-10 bg-quarterly"
        >
          <ArrowUturnLeftIcon className="text-secondary w-4 ml-[-3px]" />
          <p className="text-sm font-extrabold text-secondary">Back</p>
        </button>
      </div>
    </div>
  )
}

export default ReplyModal
