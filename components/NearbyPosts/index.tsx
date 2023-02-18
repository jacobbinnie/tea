import React from 'react'
import { PublicPost } from '../../interfaces'
import { CardContainer } from '../CardContainer'

interface NearbyPostsProps {
  nearbyPosts: PublicPost[]
}

export const NearbyPosts: React.FC<NearbyPostsProps> = ({ nearbyPosts }) => {
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
