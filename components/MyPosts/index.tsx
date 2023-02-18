import React from 'react'
import { CardContainer } from '../CardContainer'

interface MyPostsProps {
  myPosts: PublicPost[]
}

export const MyPosts: React.FC<MyPostsProps> = ({ myPosts }) => {
  return (
    <>
      <h2 className="text-lg text-center font-semibold text-tertiary">
        My Posts
      </h2>
      <CardContainer posts={myPosts} />
    </>
  )
}
export default MyPosts
