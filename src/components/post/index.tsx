import Image from 'next/image'
import React from 'react'
import { PublicPost } from '../../../interfaces'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/solid'

interface PostProps {
  post: PublicPost
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className=" bg-secondary items-start px-4 py-6 min-w-full break-inside-avoid transition-all duration-500">
      <div className="flex flex-col gap-5">
        <div className="flex w-full justify-between items-center">
          <p className="text-xs text-gray-100">2 MINS AGO</p>
          <div className="flex gap-2">
            <div className="bg-backdrop px-3 rounded">
              <ChevronUpIcon className="w-5 text-tertiary" />
            </div>
            <div className="bg-backdrop px-3 rounded">
              <ChevronDownIcon className="w-5 text-tertiary" />
            </div>
          </div>
        </div>

        <p className="text-lg text-tertiary font-medium">
          Where is the best place to get italian? We are from the states and
          would love recommendations.
        </p>

        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <p className="text-xs text-gray-100">Jacob</p>
            <HeartIcon className="w-3 text-gray-100" />
            <p className="text-xs text-gray-100">73</p>
          </div>
          <div className="text-xs bg-primary py-1 px-2 rounded text-tertiary">
            Comment
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
