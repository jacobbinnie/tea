/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
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
    <div className="rounded-md shadow-lg items-start px-4 py-6 min-w-full break-inside-avoid border-gray-100 border-[1px] hover:border-tertiary transition-all duration-500">
      <div className="flex items-center">
        <h2 className="text-sm font-semibold text-tertiary">{post.body}</h2>
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-6">
        <div className="text-xs flex items-center gap-2">
          {post.image && (
            <Image
              className="w-6 h-6 rounded-full object-cover border"
              src={post.image}
              alt="avatar"
              width={20}
              height={20}
            />
          )}
          Jacob
        </div>
        <div className="flex gap-6 items-center">
          <div className="bg-primary text-tertiary text-bold px-3 py-1 rounded text-xs cursor-pointer hover:opacity-80 shadow-md transition-all duration-300">
            Reply
          </div>

          <div className="flex text-gray-100 text-sm cursor-pointer hover:text-tertiary transition-all duration-300">
            <ThumbsUp />
          </div>
          <div className="flex text-gray-100 text-sm cursor-pointer hover:text-tertiary transition-all duration-300">
            <ThumbsDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
