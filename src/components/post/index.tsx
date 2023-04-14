import Image from 'next/image'
import React from 'react'
import { PublicPost } from '../../../interfaces'
import ThumbsUp from '../../../assets/icons/thumbs-up.svg'
import ThumbsDown from '../../../assets/icons/thumbs-down.svg'

interface PostProps {
  post: PublicPost
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="rounded-md shadow-lg bg-primary items-start px-4 py-6 min-w-full break-inside-avoid transition-all duration-500">
      <div className="flex items-center">
        <h2 className="text-sm font-semibold text-secondary">{post.body}</h2>
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="text-xs flex items-center gap-2">
          {post.image && (
            <Image
              className="w-6 h-6 rounded-full object-cover border-2 border-primary"
              src={post.image}
              alt="avatar"
              width={20}
              height={20}
            />
          )}
          <div className="text-secondary font-semibold text-bold italic text-xs transition-all duration-300">
            Jacob
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="bg-secondary text-primary font-semibold text-bold italic px-3 py-1 rounded text-xs cursor-pointer hover:text-gray-200 shadow-md transition-all duration-300">
            Reply
          </div>

          <div className="flex text-secondary text-sm cursor-pointer hover:text-gray-200 transition-all duration-300">
            <ThumbsUp />
          </div>
          <div className="flex text-secondary text-sm cursor-pointer hover:text-gray-200 transition-all duration-300">
            <ThumbsDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
