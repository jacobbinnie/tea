import React, { useEffect, useState } from 'react'
import { DbUser, UserPost } from '../../interfaces'
import Card from '../card'

interface CardContainerProps {
  dbUser: DbUser | null
  userPosts: UserPost[] | undefined
}

export const UserPostsContainer: React.FC<CardContainerProps> = ({
  dbUser,
  userPosts,
}) => {
  const [mappedPosts, setMappedPosts] = useState<JSX.Element[] | undefined>()
  const [layout, setLayout] = useState<JSX.Element | undefined>()

  const mapPosts = () => {
    if (userPosts) {
      const dataMapping = Object.keys(userPosts).map(item => (
        <Card key={item} post={userPosts[item]} dbUser={dbUser} />
      ))
      setMappedPosts(dataMapping)
    }
  }

  const layoutBuilder = () => {
    if (mappedPosts && userPosts) {
      const columnCount = Object.keys(userPosts).length

      return (
        <div
          // eslint-disable-next-line max-len
          className={
            columnCount === 1
              ? `sm:columns-1 gap-4 space-y-4`
              : columnCount < 3
              ? `sm:columns-1 md:columns-2 gap-4 space-y-4`
              : columnCount < 4
              ? `sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4`
              : columnCount < 5
              ? `sm:columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4`
              : `sm:columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4`
          }
        >
          {mappedPosts}
        </div>
      )
    }
  }

  useEffect(() => {
    mapPosts()
  }, [userPosts])

  useEffect(() => {
    if (mappedPosts) {
      setLayout(layoutBuilder)
    }
  }, [mappedPosts])

  if (layout) {
    return layout
  }
  return <h5>You have no posts</h5>
}
