import React from 'react'
import { PublicPost } from '../../interfaces'
import { CardContainer } from '../CardContainer'
import Loading from '../Loading'

interface NearbyPostsProps {
  nearbyPosts: PublicPost[]
  gettingNearbyPosts: boolean
}

export const NearbyPosts: React.FC<NearbyPostsProps> = ({
  nearbyPosts,
  gettingNearbyPosts,
}) => {
  if (gettingNearbyPosts) {
    return <Loading loadingMessage=" " />
  }

  return (
    <>
      <h2 className="text-lg text-center font-semibold text-tertiary">
        Posts Near You
      </h2>

      <div className="flex flex-col w-full">
        <CardContainer posts={nearbyPosts} />
      </div>
    </>
  )
}
export default NearbyPosts
