import React from 'react'
import { PublicPost } from '../../../interfaces'
import { PostContainer } from '../postContainer'
import Loading from '../loading'

interface MyPostsProps {
  myPosts: PublicPost[]
  gettingMyPosts: boolean
}

export const MyPosts: React.FC<MyPostsProps> = ({
  myPosts,
  gettingMyPosts,
}) => {
  if (gettingMyPosts) {
    return <Loading loadingMessage=" " />
  }

  if (myPosts.length > 0) {
    return (
      <>
        <h2 className="text-lg text-center font-semibold text-tertiary">
          My Posts
        </h2>
        <PostContainer posts={myPosts} />
      </>
    )
  } else {
    return <div>You have no posts</div>
  }
}

export default MyPosts
