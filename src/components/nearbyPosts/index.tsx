import React from 'react'
import { PublicPost } from '../../../interfaces'
import Loading from '../loading'
import PostContainer from '../postContainer'
import { MapPinIcon } from '@heroicons/react/24/solid'

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
      <div className="flex flex-col w-full gap-3">
        <div className="flex gap-1 px-4 animate-pulse">
          <MapPinIcon className="text-quarterly w-5 animate-pulse" />
          <p className="text-xl font-semibold text-quarterly">tower bridge</p>
        </div>

        <PostContainer posts={nearbyPosts} />
      </div>
    </>
  )
}
export default NearbyPosts
