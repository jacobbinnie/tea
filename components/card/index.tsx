/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { DbUser, UserPost } from '../../interfaces'
import ThumbsUp from '../../assets/icons/thumbs-up.svg'
import ThumbsDown from '../../assets/icons/thumbs-down.svg'

interface CardProps {
  post: UserPost
  dbUser: DbUser | null
}

export const Card: React.FC<CardProps> = ({ post, dbUser }) => {
  return (
    <div className=" bg-tertiary rounded-md shadow-lg items-start px-4 py-6 w-full break-inside-avoid">
      <div className="flex items-center">
        <h2 className="text-sm font-semibold text-secondary mt-1">
          {post.body}
        </h2>
      </div>

      <div className="flex flex-row items-center justify-between w-full mt-4">
        {dbUser && (
          <Image
            className="w-5 h-5 rounded-full object-cover"
            src={dbUser.image}
            alt="avatar"
            width={10}
            height={10}
          />
        )}
        <div className="flex gap-3">
          <div className="flex text-gray-300 text-sm">
            <ThumbsUp />
          </div>
          <div className="flex text-gray-300 text-sm">
            <ThumbsDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
