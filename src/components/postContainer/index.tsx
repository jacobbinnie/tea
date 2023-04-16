import React from 'react'
import { PublicPost } from '../../../interfaces'
import Post from '../post'

interface PostContainerProps {
  posts: PublicPost[] | undefined
}

export const PostContainer: React.FC<PostContainerProps> = ({ posts }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 bg-backdrop">
      {posts?.map(post => (
        <Post key={post.timestamp} post={post} />
      ))}
    </div>
  )
}

export default PostContainer
