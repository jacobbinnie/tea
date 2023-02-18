import React from 'react'
import { PublicPost } from '../../interfaces'
import { CardContainer } from '../CardContainer'
import Loading from '../Loading'

interface ProfileProps {
  myPosts: PublicPost[]
  gettingMyPosts: boolean
}

export const Profile: React.FC<ProfileProps> = ({
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
        <CardContainer posts={myPosts} />
      </>
    )
  } else {
    return <div>You have no posts</div>
  }
}

export default Profile
