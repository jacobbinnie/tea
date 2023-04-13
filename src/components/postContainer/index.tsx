import React from 'react'
import { PublicPost } from '../../../interfaces'

interface PostContainerProps {
  posts: PublicPost[] | undefined
}

export const PostContainer: React.FC<PostContainerProps> = ({ posts }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {posts?.map(post => (
        <div key={post.body} className="w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full">
              <h2 className="text-lg text-center font-semibold text-tertiary">
                {post.body}
              </h2>
              <p className="text-sm text-center text-tertiary">{post.user}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostContainer
