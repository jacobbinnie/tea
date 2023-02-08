/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import { DbUser, UserPost } from '../../interfaces'

interface CardProps {
  post: UserPost
  dbUser: DbUser | null
}

export const Card: React.FC<CardProps> = ({ post, dbUser }) => {
  return (
    <div className="flex bg-tertiary shadow-lg rounded-lg  ">
      <div className="flex items-start px-4 py-6 justify-between">
        {dbUser && (
          <Image
            className="w-5 h-5 rounded-full object-cover mr-4 shadow "
            src={dbUser.image}
            alt="avatar"
            width={10}
            height={10}
          />
        )}
        <div className="">
          <div className="flex items-center">
            <h2 className="text-md font-semibold text-secondary -mt-1">
              {post.body}
            </h2>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex mr-2 text-gray-300 text-sm">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>12</span>
            </div>
            <div className="flex mr-2 text-gray-300 text-sm">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span>8</span>
            </div>
            <div className="flex mr-2 text-gray-300 text-sm">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-1"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span>share</span>
            </div>
            <small className="text-sm text-gray-300">22h ago</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
