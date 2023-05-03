import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { PublicPost } from '../../../interfaces'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useSincePosted } from 'src/utils'
import { useAuth } from 'providers/authProvider'
import { votePost } from '../../../firebase'

interface PostProps {
  post: PublicPost
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { user } = useAuth()

  const [voting, setVoting] = useState(false)

  const handleVotePost = async (voteValue: 1 | -1) => {
    if (user && user?.uid) {
      setVoting(true)
      await votePost(user?.uid, post.postId, voteValue)
      setVoting(false)
    }
  }

  return (
    <div className=" bg-secondary items-start px-4 py-6 min-w-full max-w-full break-inside-avoid transition-all duration-500">
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-medium text-quarterly">
            {useSincePosted(post.timestamp)}
          </p>

          <div className="flex gap-3">
            <div className="px-3 rounded">
              <ChevronUpIcon
                className="w-5 text-quarterly"
                onClick={() => {
                  !voting && handleVotePost(1)
                }}
              />
            </div>
            <div className="px-3 rounded">
              <ChevronDownIcon
                className="w-5 text-quarterly"
                onClick={() => !voting && handleVotePost(-1)}
              />
            </div>
            <div className="pl-4 rounded">
              <p className="text-sm font-medium text-quarterly">
                {post.voteCount}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xl text-tertiary font-extrabold break-words">
          {post.body}
        </p>

        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <p className="text-sm font-medium text-quarterly">
              {post.user.name}
            </p>
            <HeartIcon className="w-3 font-medium text-quarterly" />
            <p className="text-sm font-medium text-quarterly">
              {post.user.karma}
            </p>
          </div>
          <div className="text-sm font-extrabold bg-primary py-2 px-3 rounded-lg text-secondary">
            Comment
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
